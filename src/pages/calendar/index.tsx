import { useState, useEffect, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import Header from '@/components/Header';
import SectionHeader from '@/components/SectionHeader';
import TodoItem from '@/components/TodoItem';
import Calendar, { type DayEvent, type EventCategory } from '@/components/Calendar';
import TodayProgress from './components/TodayProgress';
import AddTaskModal from '@/components/AddtaskModal';
import DeleteModal from '@/components/DeleteModal';
import PlusIcon from './plus.svg?react';
import Footer from '@/components/Footer';
import {
  getTodos,
  deleteTodo,
  updateTodo,
  updateTodoStatus,
  type TodoItem as TodoItemType,
} from '@/api/todo';
import type { CategoryColor } from '@/pages/calendar/components/CategorySelector';

const mapCategoryToUi = (category: TodoItemType['category']): CategoryColor => {
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

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskModalMode, setTaskModalMode] = useState<'create' | 'edit'>('create');
  const [selectedTodo, setSelectedTodo] = useState<TodoItemType | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);
  const [tasks, setTasks] = useState<TodoItemType[]>([]);

  const dateLabel = format(selectedDate, 'M월 d일 EEEE', { locale: ko });
  const dateParam = format(selectedDate, 'yyyy-MM-dd');

  const filteredTasks = tasks.filter((task) => task.specificDate === dateParam);
  const totalCount = filteredTasks.length;
  const completedCount = filteredTasks.filter((task) => task.isCompleted).length;

  const events: DayEvent[] = useMemo(() => {
    const eventMap: Record<string, EventCategory[]> = {};

    tasks.forEach((task) => {
      const dateKey = task.specificDate;
      if (dateKey) {
        if (!eventMap[dateKey]) eventMap[dateKey] = [];
        eventMap[dateKey].push(task.category.toLowerCase() as EventCategory);
      }
    });

    return Object.entries(eventMap).map(([dateStr, categories]) => ({
      date: parseISO(dateStr),
      categories,
    }));
  }, [tasks]);

  const fetchTodos = async () => {
    try {
      const res = await getTodos(dateParam);
      setTasks(res.data ?? []);
    } catch (err) {
      console.error(err);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [selectedDate]);

  const openCreateModal = () => {
    setTaskModalMode('create');
    setSelectedTodo(null);
    setIsTaskModalOpen(true);
  };

  const openEditModal = (todo: TodoItemType) => {
    setTaskModalMode('edit');
    setSelectedTodo(todo);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setSelectedTodo(null);
  };

  const handleToggleTodo = async (todoId: number, currentStatus: boolean) => {
    try {
      await updateTodoStatus(todoId, !currentStatus);
      fetchTodos();
    } catch (err) {
      alert('상태 변경 실패');
    }
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
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="relative w-93.75 h-full flex flex-col bg-gray-ui overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar flex flex-col gap-6">
          <section className="flex-shrink-0 pt-4 flex flex-col gap-6">
            <Calendar
              events={events}
              onDayClick={(date) => setSelectedDate(date)}
              selectedDate={selectedDate}
            />
            <TodayProgress total={totalCount} completed={completedCount} />
          </section>

          <section className="flex flex-col gap-6">
            <SectionHeader title="이날의 할 일" rightLabel={dateLabel} />

            <div className="flex flex-col gap-3">
              {filteredTasks.length === 0 ? (
                <p className="text-center text-gray-text py-10">할 일이 없어요</p>
              ) : (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setDeletingTaskId(task.id);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <TodoItem
                      id={task.id}
                      text={task.title}
                      category={task.category.toLowerCase() as any}
                      isCompleted={task.isCompleted}
                      onClick={() => openEditModal(task)}
                      onToggle={() => handleToggleTodo(task.id, task.isCompleted)}
                    />
                  </div>
                ))
              )}
            </div>
          </section>
        </main>

        <Footer />

        <div className="absolute bottom-24 right-6 z-40">
          <button
            onClick={openCreateModal}
            className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      {isTaskModalOpen && (
        <AddTaskModal
          mode="specific"
          date={selectedDate}
          initialValues={
            selectedTodo
              ? {
                  text: selectedTodo.title,
                  category: mapCategoryToUi(selectedTodo.category),
                  memo: selectedTodo.memo ?? '',
                }
              : undefined
          }
          submitLabel={taskModalMode === 'create' ? '저장' : '수정'}
          onSubmit={taskModalMode === 'edit' ? handleEditSubmit : undefined}
          onSave={() => {
            closeTaskModal();
            fetchTodos();
          }}
          onClose={closeTaskModal}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal onConfirm={handleDeleteConfirm} onClose={() => setIsDeleteModalOpen(false)} />
      )}
    </div>
  );
}
