import { useState } from 'react';
import { isSameDay, isSameMonth, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Text from '@/components/Text';
import LeftArrow from '../../src/pages/calendar/left-arrow.svg?react';
import RightArrow from '../../src/pages/calendar/left-arrow.svg?react';

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
  { date: new Date(y, m, 3), categories: ['drop'] },
  { date: new Date(y, m, 7), categories: ['quick', 'plan'] },
  { date: new Date(y, m, 8), categories: ['focus'] },
  { date: new Date(y, m, 11), categories: ['plan', 'quick'] },
  { date: new Date(y, m, 13), categories: ['focus', 'plan'] },
  { date: new Date(y, m, 15), categories: ['focus', 'plan', 'quick'] },
  { date: new Date(y, m, 17), categories: ['drop'] },
  { date: new Date(y, m, 20), categories: ['focus', 'plan'] },
  { date: new Date(y, m, 24), categories: ['quick', 'plan'] },
  { date: new Date(y, m, 26), categories: ['focus', 'quick'] },
  { date: new Date(y, m, 30), categories: ['focus', 'quick'] },
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
      <div className="flex items-center justify-between mb-4">
        <Text variant="heading" className="text-black">
          {format(currentMonth, 'yyyy년 M월', { locale: ko })}
        </Text>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="w-6 h-6 flex items-center justify-center active:scale-90 transition-transform"
            aria-label="이전 달"
          >
            <LeftArrow className="text-primary w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="w-6 h-6 flex items-center justify-center active:scale-90 transition-transform"
            aria-label="다음 달"
          >
            <RightArrow className="text-primary w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 달력 본체 */}
      <div className="bg-white rounded-[32px] p-8">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 mb-3">
          {DAYS_KO.map((d) => (
            <div key={d} className="flex items-center justify-center">
              <Text variant="label" className="text-black">
                {d}
              </Text>
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7">
          {days.map((date, idx) => {
            const isCurrentMonth = isSameMonth(date, currentMonth);
            const isSelected = isSameDay(date, selected);
            const categories = getCategories(date);

            return (
              <button
                key={idx}
                onClick={() => handleDayClick(date)}
                className="relative flex flex-col items-center justify-start pt-1 h-[48px] rounded-lg cursor-pointer hover:bg-gray-ui active:bg-primary-light transition-all"
              >
                {/* 날짜 숫자 - 고정 위치 */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                    isSelected ? 'bg-primary-light' : ''
                  }`}
                >
                  <Text
                    variant="body"
                    className={
                      isSelected
                        ? 'text-black font-semibold'
                        : isCurrentMonth
                        ? 'text-black'
                        : 'text-gray-text'
                    }
                  >
                    {date.getDate()}
                  </Text>
                </div>

                {/* 이벤트 도트 - 절대 위치로 하단 고정 */}
                {categories.length > 0 && (
                  <div className="absolute bottom-1 flex items-center gap-[3px]">
                    {categories.slice(0, 3).map((cat, i) => (
                      <div
                        key={i}
                        className={`w-[5px] h-[5px] rounded-full ${categoryColors[cat]}`}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}