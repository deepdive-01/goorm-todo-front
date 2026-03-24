import { useState } from 'react';
import { isSameDay, isSameMonth, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import LeftArrow from '../left-arrow.svg?react';
import RightArrow from '../right-arrow.svg?react';
import Text from '@/components/Text';

type EventCategory = 'focus' | 'quick' | 'plan' | 'drop';

export type DayEvent = {
  date: Date;
  categories: EventCategory[];
};

type CalendarProps = {
  events?: DayEvent[];
  onDayClick?: (date: Date) => void;
};

const DAYS_KO = ['일', '월', '화', '수', '목', '금', '토'];

const categoryColors: Record<EventCategory, string> = {
  focus: 'bg-primary',
  quick: 'bg-quick',
  plan:  'bg-plan',
  drop:  'bg-drop',
};

function getCalendarDays(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0);
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

const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();

const DUMMY_EVENTS: DayEvent[] = [
  { date: new Date(y, m, 1),  categories: ['focus', 'plan', 'quick'] },
  { date: new Date(y, m, 2),  categories: ['focus', 'quick'] },
  { date: new Date(y, m, 3),  categories: ['drop'] },
  { date: new Date(y, m, 7),  categories: ['quick', 'plan'] },
  { date: new Date(y, m, 8),  categories: ['focus'] },
  { date: new Date(y, m, 11), categories: ['plan', 'quick'] },
  { date: new Date(y, m, 13), categories: ['focus', 'plan'] },
  { date: new Date(y, m, 15), categories: ['focus', 'plan', 'quick'] },
  { date: new Date(y, m, 17), categories: ['drop'] },
  { date: new Date(y, m, 20), categories: ['focus', 'plan'] },
  { date: new Date(y, m, 24), categories: ['quick', 'plan'] },
  { date: new Date(y, m, 26), categories: ['focus', 'quick'] },
  { date: new Date(y, m, 30), categories: ['focus', 'quick'] },
];

export default function Calendar({ events = DUMMY_EVENTS, onDayClick }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selected, setSelected] = useState<Date>(today);

  const year  = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const days  = getCalendarDays(year, month);

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const getCategories = (date: Date): EventCategory[] =>
    events.find((e) => isSameDay(e.date, date))?.categories ?? [];

  const handleDayClick = (date: Date) => {
    setSelected(date);
    onDayClick?.(date);
  };

  return (
    <div className="w-full bg-white rounded-[32px] p-8">

      {/* 헤더 */}
      <div className="flex items-center justify-between mb-5">
        <Text variant="heading">
          {format(currentMonth, 'yyyy년 M월', { locale: ko })}
        </Text>

        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="w-8 h-8 flex items-center justify-center active:scale-90 transition-transform"
            aria-label="이전 달"
          >
            <LeftArrow />
          </button>
          <button
            onClick={nextMonth}
            className="w-8 h-8 flex items-center justify-center active:scale-90 transition-transform"
            aria-label="다음 달"
          >
            <RightArrow />
          </button>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7">
        {DAYS_KO.map((d) => (
          <Text
            key={d}
            variant="label"
            className="text-center text-black py-2"
            >
              {d}
            </Text>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7">
        {days.map((date, idx) => {
          const isCurrentMonth = isSameMonth(date, currentMonth);
          const isSelected     = isSameDay(date, selected);
          const categories     = getCategories(date);

          return (
            <button
              key={idx}
              onClick={() => handleDayClick(date)}
                className="flex flex-col items-center justify-center h-[36px] gap-[2px] rounded-[4px] cursor-pointer active:bg-primary-light active:scale-90 transition-all"
            >
              <div
                className={`w-[28px] h-[28px] flex items-center justify-center rounded-full transition-colors ${
                  isSelected
                    ? 'bg-primary-light'
                    : ''
                }`}
              >
                <Text
                  className={
                    isSelected
                    ? 'text-black'
                    : isCurrentMonth
                    ? 'text-black'
                    : 'text-gray-text'
                  }
                  >
                {date.getDate()}
                </Text>
              </div>

              <div className="flex items-center gap-[2px]">
                {categories.slice(0, 3).map((cat, i) => (
                  <div
                    key={i}
                    className={`w-[4px] h-[4px] rounded-full ${categoryColors[cat]}`}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}