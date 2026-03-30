import { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Header from '@/components/Header';
import SectionHeader from '@/components/SectionHeader';
import TodoItem from '@/components/TodoItem';
import Calendar, { type DayEvent } from '../../components/Calendar';
import TodayProgress from './components/TodayProgress';
import AddTaskModal from '@/components/AddtaskModal';
import DeleteModal from '@/components/DeleteModal';
import PlusIcon from './plus.svg?react';
import Footer from '@/components/Footer';

const DUMMY_EVENTS: DayEvent[] = [
  { date: new Date(), categories: ['focus', 'quick'] },
];

const DUMMY_TASKS = [
  { id: '1', text: '아침 정원 명상',           category: 'focus'  as const },
  { id: '2', text: '유기농 차 블렌드 찾아오기', category: 'quick'  as const },
];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate]           = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen]             = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTaskId, setDeletingTaskId]       = useState<string | null>(null);

  const dateLabel = format(selectedDate, 'M월 d일 EEEE', { locale: ko });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-93.75 min-h-screen flex flex-col bg-gray-ui">
        <Header />

        {/* 스크롤 영역 */}
        <main className="px-6 pb-8 flex flex-col gap-6 w-full flex-1">
          <section className="w-full flex flex-col gap-6">
            <Calendar
              events={DUMMY_EVENTS}
              onDayClick={(date) => setSelectedDate(date)}
            />
            <TodayProgress />
          </section>

          <section className="w-full flex flex-col gap-6">
            <SectionHeader
              title="이날의 할 일"
              rightLabel={dateLabel}
            />
            {DUMMY_TASKS.map((task) => (
              <div
                key={task.id}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setDeletingTaskId(task.id);
                  setIsDeleteModalOpen(true);
                }}
              >
                <TodoItem text={task.text} category={task.category} />
              </div>
            ))}
          </section>
        </main>
        <Footer />
        {/* FAB */}
        <div className="sticky bottom-24 flex justify-end px-6 pointer-events-none -mt-14">
          <button
            onClick={() => setIsModalOpen(true)}
            className="pointer-events-auto w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg active:scale-90 transition-transform z-40"
            aria-label="할 일 추가"
          >
            <PlusIcon />
          </button>
        </div>

      </div>

      {isModalOpen && (
        <AddTaskModal
          date={selectedDate}
          onSave={(data) => {
            console.log(data);
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          onConfirm={() => {
            console.log('삭제:', deletingTaskId);
            setIsDeleteModalOpen(false);
            setDeletingTaskId(null);
          }}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingTaskId(null);
          }}
        />
      )}
    </div>
  );
}