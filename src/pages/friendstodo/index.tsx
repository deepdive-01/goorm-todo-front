import { useState, useEffect, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Text from '@/components/Text';
import Calendar, { type DayEvent, type EventCategory } from '@/components/Calendar';
import TodoItem from '@/components/TodoItem';
import FriendTodoSection from './components/FriendTodoSection';
import { getFriendCalendar, type FriendCalendarResponse } from '@/api/friend';

export default function FriendTodoPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // FriendsPage에서 navigate로 넘겨준 데이터
  const friendName = state?.name ?? '친구';
  const friendId = state?.friendId;

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [friendData, setFriendData] = useState<FriendCalendarResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const dateLabel = format(selectedDate, 'M월 d일 EEEE', { locale: ko });
  const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');

  // 1. 친구 캘린더 데이터 조회
  useEffect(() => {
    if (!friendId) return;

    const fetchFriendTodo = async () => {
      try {
        setIsLoading(true);
        // 현재 선택된 날짜의 연-월을 쿼리 파라미터로 전달
        const monthParam = format(selectedDate, 'yyyy-MM');
        const res = await getFriendCalendar(friendId, monthParam);
        setFriendData(res.data);
      } catch (err) {
        console.error('친구 캘린더 로드 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriendTodo();
  }, [friendId, selectedDate]); // 날짜가 바뀌어 월이 변경될 때도 다시 조회

  // 2. 캘린더에 표시할 이벤트 점(dot) 가공
  const events: DayEvent[] = useMemo(() => {
    if (!friendData?.todos) return [];

    const eventMap: Record<string, EventCategory[]> = {};

    friendData.todos.forEach((todo) => {
      const dateKey = todo.date; // 명세상 'date' 필드
      if (dateKey) {
        if (!eventMap[dateKey]) eventMap[dateKey] = [];
        // 카테고리 정보가 없을 경우 기본값 'focus' 처리
        eventMap[dateKey].push('focus');
      }
    });

    return Object.entries(eventMap).map(([dateStr, categories]) => ({
      date: parseISO(dateStr),
      categories: Array.from(new Set(categories)), // 중복 제거
    }));
  }, [friendData]);

  // 3. 선택한 날짜의 할 일만 필터링
  const filteredTasks = useMemo(() => {
    return friendData?.todos.filter((todo) => todo.date === selectedDateStr) || [];
  }, [friendData, selectedDateStr]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-93.75 min-h-screen flex flex-col bg-gray-ui overflow-hidden">
        <div className="sticky top-0 z-10 bg-gray-ui">
          <Header />
        </div>

        <FriendTodoSection
          friendName={`${friendName}의 할 일`}
          onBack={() => navigate('/friends')}
        />

        {/* 스크롤 영역: 컴포넌트 크기 수축 방지를 위해 no-scrollbar 적용 */}
        <main className="px-6 py-8 flex flex-col gap-8 w-full flex-1 overflow-y-auto no-scrollbar pb-24">
          {/* 달력 섹션 */}
          <section className="w-full flex flex-col gap-4 flex-shrink-0">
            <Calendar
              events={events}
              onDayClick={(date) => setSelectedDate(date)}
              selectedDate={selectedDate}
            />
          </section>

          {/* 할 일 목록 - 친구의 것이므로 클릭/수정 방지 */}
          <section className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Text variant="body" className="text-black font-semibold">
                {dateLabel}
              </Text>
            </div>

            <div className="flex flex-col gap-3 pointer-events-none opacity-90">
              {isLoading ? (
                <p className="text-center py-10 text-gray-text">로딩 중...</p>
              ) : filteredTasks.length === 0 ? (
                <p className="text-center py-10 text-gray-text">할 일이 없습니다. 🌿</p>
              ) : (
                filteredTasks.map((task) => (
                  <TodoItem
                    key={task.todo_id}
                    id={task.todo_id}
                    text={task.title}
                    category="focus" // 친구 데이터에 카테고리가 없을 경우 대비 기본값
                    isCompleted={task.is_completed} // 명세의 is_completed 적용
                    onToggle={() => {}} // 읽기 전용이므로 빈 함수
                  />
                ))
              )}
            </div>
          </section>
        </main>

        <div className="sticky bottom-0 z-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}
