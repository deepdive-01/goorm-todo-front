import { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Header from '@/components/Header';
import SectionHeader from '@/components/SectionHeader';
import TodoItem from '@/components/TodoItem';
import Calendar, { type DayEvent } from '../../components/Calendar';
import TodayProgress from './components/TodayProgress';

import DeleteModal from '@/components/DeleteModal';

const DUMMY_EVENTS: DayEvent[] = [
  { date: new Date(), categories: ['focus', 'quick'] },
];

const DUMMY_TASKS = [
  { id: '1', text: '아침 정원 명상',           category: 'focus'  as const },
  { id: '2', text: '유기농 차 블렌드 찾아오기', category: 'quick'  as const },
];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate]       = useState<Date>(new Date());
  const [isAddModalOpen, setIsAddModalOpen]   = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const dateLabel = format(selectedDate, 'M월 d일 EEEE', { locale: ko });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-93.75 bg-gray-ui">
        <Header />
        <main className="px-6 py-8 flex flex-col gap-12 w-full">

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
              <TodoItem key={task.id} text={task.text} category={task.category} />
            ))}
          </section>

          {/* 임시 테스트 버튼 */}
          <section className="flex flex-col gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full py-3 rounded-full bg-primary text-white"
            >
              추가 모달 테스트
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="w-full py-3 rounded-full bg-quick text-white"
            >
              삭제 모달 테스트
            </button>
          </section>

        </main>
      </div>


      {/* 삭제 모달 */}
      {isDeleteModalOpen && (
        <DeleteModal
          onConfirm={() => {
            console.log('삭제 확인');
            setIsDeleteModalOpen(false);
          }}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}