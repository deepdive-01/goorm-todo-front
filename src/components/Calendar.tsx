import { useState } from 'react';
import { isSameDay, isSameMonth, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Text from '@/components/Text';
import LeftArrow from '../pages/calendar/left-arrow.svg?react';
import RightArrow from '../pages/calendar/right-arrow.svg?react';

type EventCategory = 'focus' | 'quick' | 'plan' | 'drop';

export type DayEvent = {
  date: Date;
  categories: EventCategory[];
};

type CalendarProps = {
  events?: DayEvent[];
  onDayClick?: (date: Date) => void;
  selectedDate?: Date;
};

const DAYS_KO = ['일', '월', '화', '수', '목', '금', '토'];

const categoryColors: Record<EventCategory, string> = {
  focus: 'bg-primary',
  quick: 'bg-quick',
  plan: 'bg-plan',
  drop: 'bg-drop',
};

const CATEGORY_ORDER: EventCategory[] = ['focus', 'quick', 'plan', 'drop'];

function getCalendarDays(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];

  for (let i = 0; i < firstDay.getDay(); i++) {
    days.unshift(new Date(year, month, -i));
  }
  days.reverse();

  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  const remaining = days.length % 7 === 0 ? 0 : 7 - (days.length % 7);
  for (let d = 1; d <= remaining; d++) {
    days.push(new Date(year, month + 1, d));
  }

  return days;
}

function sortCategories(categories: EventCategory[]): EventCategory[] {
  return [...categories].sort((a, b) => {
    return CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b);
  });
}

const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();

const DUMMY_EVENTS: DayEvent[] = [
  { date: new Date(y, m, 1), categories: ['focus', 'plan', 'quick'] },
  { date: new Date(y, m, 2), categories: ['focus', 'quick'] },
  { date: new Date(y, m, 20), categories: ['focus', 'quick', 'plan', 'drop'] },
  { date: new Date(y, m, 25), categories: ['focus', 'quick'] },
];

export default function Calendar({
  events = DUMMY_EVENTS,
  onDayClick,
  selectedDate,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selected, setSelected] = useState<Date>(selectedDate || today);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const days = getCalendarDays(year, month);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const getCategories = (date: Date): EventCategory[] => {
    const categories = events.find((e) => isSameDay(e.date, date))?.categories ?? [];
    return sortCategories(categories);
  };

  const handleDayClick = (date: Date) => {
    setSelected(date);
    onDayClick?.(date);
  };

  return (
    <div className="w-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4 px-2">
        <Text variant="heading" className="text-black">
          {format(currentMonth, 'yyyy년 M월', { locale: ko })}
        </Text>

        <div className="flex items-center gap-1">
          <button onClick={handlePrevMonth} className="p-1 active:scale-90 transition-transform">
            <LeftArrow className="text-primary w-5 h-5" />
          </button>
          <button onClick={handleNextMonth} className="p-1 active:scale-90 transition-transform">
            <RightArrow className="text-primary w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 달력 본체 */}
      <div className="bg-white rounded-[32px] p-6 shadow-sm">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS_KO.map((d) => (
            <div key={d} className="flex items-center justify-center">
              <Text variant="label" className="text-gray-text">
                {d}
              </Text>
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-y-1 justify-items-center">
          {days.map((date, idx) => {
            const isCurrentMonth = isSameMonth(date, currentMonth);
            const isSelected = isSameDay(date, selected);
            const categories = getCategories(date);

            return (
              <button
                key={idx}
                onClick={() => handleDayClick(date)}
                className="flex flex-col items-center justify-center h-[36]px gap-[2px] rounded-[4px] cursor-pointer active:bg-primary-light transition-all"
              >
                {/* 선택 시 나타나는 정사각형 배경 */}
                <div
                  className={`relative w-[37.57px] h-[36px] rounded-[8px] transition-colors ${
                    isSelected
                      ? 'bg-primary-light'
                      : ''
                  }`}
                >
                  {/* 날짜 숫자 */}
                  <Text
                    variant="body"
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none ${
                      isCurrentMonth ? 'text-black' : 'text-gray-text'
                    }`}
                  >
                    {date.getDate()}
                  </Text>

                  {/* 하단 카테고리 도트 */}
                  {categories.length > 0 && (
                    <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 flex items-center gap-[2px]">
                      {categories.slice(0, 4).map((cat, i) => (
                        <div
                          key={i}
                          className={`w-[4px] h-[4px] rounded-full ${categoryColors[cat]}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}