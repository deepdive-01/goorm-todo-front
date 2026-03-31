import { useEffect, useState } from 'react';
import TodoItem from '@/components/TodoItem';
import Header from '@/components/Header';
import SectionHeader from '@/components/SectionHeader';
import Footer from '@/components/Footer';
import QuoteIcon from './quote-icon.svg?react';
import Text from '@/components/Text';
import AddTaskModal from '@/components/AddtaskModal';
import { getRandomQuote } from '@/api/quote';
import {
  getTodos,
  createTodo,
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

  const handleToggle = async (todo: Todo) => {
    try {
      await updateTodoStatus(todo.id, !todo.isCompleted);

      setTodos((prev) =>
        prev.map((item) =>
          item.id === todo.id ? { ...item, isCompleted: !item.isCompleted } : item,
        ),
      );

      setSelectedTodo((prev) =>
        prev && prev.id === todo.id ? { ...prev, isCompleted: !prev.isCompleted } : prev,
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
    if (taskDateType === 'specific') {
      await createTodo({
        title: text,
        dateType: 'specific',
        specificDate: today,
        category: mapCategoryToApi(category),
        memo,
      });
    } else {
      await createTodo({
        title: text,
        dateType: 'someday',
        category: mapCategoryToApi(category),
        memo,
      });
    }

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

    await fetchTodos();
  };

  const todayTodos = todos.filter((todo) => todo.dateType === 'specific');
  const somedayTodos = todos.filter((todo) => todo.dateType === 'someday');

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-93.75 bg-gray-ui min-h-screen flex flex-col">
          <Header />
          <main className="px-6 py-8 flex flex-1 flex-col gap-12 w-full">
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
                    <TodoItem
                      key={todo.id}
                      id={todo.id}
                      text={todo.title}
                      category={mapCategoryToUi(todo.category)}
                      isCompleted={todo.isCompleted}
                      onToggle={() => handleToggle(todo)}
                      onClick={() => openEditModal(todo)}
                    />
                  ))}
                </ul>
              ) : (
                <Text>오늘의 할 일이 없어요.</Text>
              )}
            </section>

            <section className="w-full flex flex-col gap-4 py-12 border border-primary border-dashed items-center rounded-4xl">
              <QuoteIcon />
              <div className="w-full px-4 pb-4">
                <Text variant="title" className="text-center">
                  {isQuoteLoading ? '명언을 불러오는 중...' : quote.content}
                </Text>
              </div>
              <div className="w-12 h-px bg-primary"></div>
            </section>

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
                    <TodoItem
                      key={todo.id}
                      id={todo.id}
                      text={todo.title}
                      category="later"
                      isCompleted={todo.isCompleted}
                      onToggle={() => handleToggle(todo)}
                      onClick={() => openEditModal(todo)}
                    />
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
    </>
  );
}
