import { useEffect, useState } from 'react';
import TodoItem from '@/components/TodoItem';
import Header from '@/components/Header';
import SectionHeader from '@/components/SectionHeader';
import Footer from '@/components/Footer';
import QuoteIcon from './quote-icon.svg?react';
import Text from '@/components/Text';
import AddTaskModal from '@/components/AddtaskModal';
import DeleteModal from '@/components/DeleteModal';
import { getRandomQuote } from '@/api/quote';
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  updateTodoStatus,
  type TodoItem as Todo,
} from '@/api/todo';
import type { CategoryColor } from '@/pages/calendar/components/CategorySelector';

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const mapCategoryToUi = (category: Todo['category']): CategoryColor => {
  switch (category) {
    case 'FOCUS':
      return 'focus';
    case 'QUICK':
      return 'quick';
    case 'PLAN':
      return 'plan';
    case 'DROP':
      return 'drop';
    default:
      return 'plan';
  }
};

const mapCategoryToApi = (category: CategoryColor) => {
  switch (category) {
    case 'focus':
      return 'FOCUS';
    case 'quick':
      return 'QUICK';
    case 'plan':
      return 'PLAN';
    case 'drop':
      return 'DROP';
    default:
      return 'PLAN';
  }
};

export default function TodayPage() {
  const [quote, setQuote] = useState({
    content: '',
    author: '',
  });

  const [isQuoteLoading, setIsQuoteLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodoLoading, setIsTodoLoading] = useState(true);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskModalMode, setTaskModalMode] = useState<'create' | 'edit'>('create');
  const [taskDateType, setTaskDateType] = useState<'specific' | 'someday'>('specific');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);

  const today = formatDate(new Date());

  const fetchTodos = async () => {
    try {
      setIsTodoLoading(true);
      const result = await getTodos(today);
      setTodos(result.data);
    } catch (error) {
      console.error('할일 목록 조회 실패:', error);
    } finally {
      setIsTodoLoading(false);
    }
  };

  const openCreateModal = (mode: 'specific' | 'someday') => {
    setTaskModalMode('create');
    setTaskDateType(mode);
    setSelectedTodo(null);
    setIsTaskModalOpen(true);
  };

  const openEditModal = (todo: Todo) => {
    setTaskModalMode('edit');
    setTaskDateType(todo.dateType === 'someday' ? 'someday' : 'specific');
    setSelectedTodo(todo);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setSelectedTodo(null);
  };

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const result = await getRandomQuote();
        setQuote({
          content: result.data.content,
          author: result.data.author,
        });
      } catch (error) {
        console.error(error);
        setQuote({
          content: '성공의 비결은 실패에도 불구하고 열정을 잃지 않는 것이다.',
          author: '윈스턴 처칠',
        });
      } finally {
        setIsQuoteLoading(false);
      }
    };
    fetchQuote();
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  // TodoItem에서 id를 받지 않으므로, 호출 시 todo 객체에서 id를 직접 사용합니다.
  const handleToggle = async (todoId: number, currentStatus: boolean) => {
    try {
      await updateTodoStatus(todoId, !currentStatus);
      setTodos((prev) =>
        prev.map((item) => (item.id === todoId ? { ...item, isCompleted: !currentStatus } : item)),
      );
    } catch (error) {
      console.error('할일 상태 업데이트 실패:', error);
    }
  };

  const handleCreateSubmit = async ({
    text,
    category,
    memo,
  }: {
    text: string;
    category: CategoryColor;
    memo: string;
  }) => {
    const data =
      taskDateType === 'specific'
        ? {
            title: text,
            dateType: 'specific' as const,
            specificDate: today,
            category: mapCategoryToApi(category),
            memo,
          }
        : { title: text, dateType: 'someday' as const, category: mapCategoryToApi(category), memo };

    await createTodo(data);
    await fetchTodos();
  };

  const handleEditSubmit = async ({
    text,
    category,
    memo,
  }: {
    text: string;
    category: CategoryColor;
    memo: string;
  }) => {
    if (!selectedTodo) return;
    await updateTodo(selectedTodo.id, {
      title: text,
      category: mapCategoryToApi(category),
      memo,
    });
    closeTaskModal();
    await fetchTodos();
  };

  const handleDeleteConfirm = async () => {
    if (deletingTaskId === null) return;
    try {
      await deleteTodo(deletingTaskId);
      setIsDeleteModalOpen(false);
      setDeletingTaskId(null);
      await fetchTodos();
    } catch (error) {
      console.error('할일 삭제 실패:', error);
    }
  };

  const todayTodos = todos.filter(
    (todo) => todo.dateType === 'specific' && todo.specificDate === today,
  );
  const somedayTodos = todos.filter((todo) => todo.dateType === 'someday');

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-93.75 bg-gray-ui min-h-screen flex flex-col">
          <Header />
          <main className="px-6 py-8 flex flex-1 flex-col gap-12 w-full overflow-y-auto no-scrollbar">
            {/* 오늘의 할 일 섹션 */}
            <section className="w-full flex flex-col gap-6">
              <SectionHeader
                title="오늘의 할 일"
                rightLabel="새로 추가"
                onRightPress={() => openCreateModal('specific')}
              />
              {isTodoLoading ? (
                <Text>불러오는 중...</Text>
              ) : todayTodos.length > 0 ? (
                <ul className="w-full flex flex-col gap-6">
                  {todayTodos.map((todo) => (
                    <div
                      key={todo.id}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setDeletingTaskId(todo.id);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <TodoItem
                        // id={todo.id} -> 에러 원인 제거
                        text={todo.title}
                        category={mapCategoryToUi(todo.category)}
                        isCompleted={todo.isCompleted}
                        onToggle={() => handleToggle(todo.id, todo.isCompleted)}
                        onClick={() => openEditModal(todo)}
                      />
                    </div>
                  ))}
                </ul>
              ) : (
                <Text>오늘의 할 일이 없어요.</Text>
              )}
            </section>

            {/* 명언 섹션 */}
            <section className="w-full flex flex-col gap-4 py-12 border border-primary border-dashed items-center rounded-4xl">
              <QuoteIcon />
              <div className="w-full px-4 pb-4 text-center">
                <Text variant="title">
                  {isQuoteLoading ? '명언을 불러오는 중...' : quote.content}
                </Text>
              </div>
              <div className="w-12 h-px bg-primary"></div>
            </section>

            {/* 언젠가 할 일 섹션 */}
            <section className="w-full flex flex-col gap-6">
              <SectionHeader
                title="언젠가 할 일"
                rightLabel="새로 추가"
                onRightPress={() => openCreateModal('someday')}
              />
              {isTodoLoading ? (
                <Text>불러오는 중...</Text>
              ) : somedayTodos.length > 0 ? (
                <ul className="flex flex-col gap-4">
                  {somedayTodos.map((todo) => (
                    <div
                      key={todo.id}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setDeletingTaskId(todo.id);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <TodoItem
                        // id={todo.id} -> 에러 원인 제거
                        text={todo.title}
                        category="later"
                        isCompleted={todo.isCompleted}
                        onToggle={() => handleToggle(todo.id, todo.isCompleted)}
                        onClick={() => openEditModal(todo)}
                      />
                    </div>
                  ))}
                </ul>
              ) : (
                <Text>언젠가 할 일이 없어요.</Text>
              )}
            </section>
          </main>
          <Footer />
        </div>
      </div>

      {isTaskModalOpen && (
        <AddTaskModal
          mode={taskDateType}
          date={new Date()}
          initialValues={
            selectedTodo
              ? {
                  text: selectedTodo.title,
                  category:
                    selectedTodo.dateType === 'someday'
                      ? 'plan'
                      : mapCategoryToUi(selectedTodo.category),
                  memo: selectedTodo.memo ?? '',
                }
              : undefined
          }
          submitLabel={taskModalMode === 'create' ? '저장' : '수정'}
          onSubmit={taskModalMode === 'create' ? handleCreateSubmit : handleEditSubmit}
          onClose={closeTaskModal}
          onSave={async () => {
            await fetchTodos();
          }}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          onConfirm={handleDeleteConfirm}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingTaskId(null);
          }}
        />
      )}
    </>
  );
}
