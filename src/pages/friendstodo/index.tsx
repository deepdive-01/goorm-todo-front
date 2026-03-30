import { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Text from '@/components/Text';
import Calendar, { type DayEvent } from '@/components/Calendar';
import TodoItem from '@/components/TodoItem';
import FriendTodoSection from './components/FriendTodoSection';

const DUMMY_EVENTS: DayEvent[] = [
  { date: new Date(), categories: ['focus', 'quick'] },
];

const DUMMY_TASKS = [
  { id: '1', text: '아침 정원 명상',           category: 'focus'  as const },
  { id: '2', text: '유기농 차 블렌드 찾아보기', category: 'quick'  as const },
];

export default function FriendTodoPage() {
  const { state } = useLocation();
  const navigate  = useNavigate();
  const friendName = state?.name ?? '친구';

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const dateLabel = format(selectedDate, 'M월 d일 EEEE', { locale: ko });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-93.75 min-h-screen flex flex-col bg-gray-ui">

        {/* 헤더 고정 */}
        <div className="sticky top-0 z-10 bg-gray-ui">
          <Header />
        </div>

        {/* 친구 정보 섹션 */}
        <FriendTodoSection
          friendName={`${friendName}의 할 일`}
          onBack={() => navigate('/friends')}
        />

        {/* 스크롤 영역 */}
        <main className="px-6 py-8 flex flex-col gap-8 w-full flex-1">

          {/* 달력 섹션 */}
          <section className="w-full flex flex-col gap-4">
            <Calendar
              events={DUMMY_EVENTS}
              onDayClick={(date) => setSelectedDate(date)}
            />
          </section>

          {/* 할 일 목록 - 클릭 방지 */}
          <section className="w-full flex flex-col gap-4 pointer-events-none">
            <Text variant="body" className="text-black font-semibold">
              {dateLabel}
            </Text>
            <div className="flex flex-col gap-3">
              {DUMMY_TASKS.map((task) => (
                <TodoItem key={task.id} text={task.text} category={task.category} />
              ))}
            </div>
          </section>

        </main>

        {/* 푸터 고정 */}
        <div className="sticky bottom-0 z-10">
          <Footer />
        </div>

      </div>
    </div>
  );
}