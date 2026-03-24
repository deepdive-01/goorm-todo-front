import { useState } from 'react';
import TodayProgress from './components/TodayProgress';
import Calendar from './components/Calendar';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[375px] bg-gray-ui p-4 flex flex-col gap-12">
        <Calendar
          onDayClick={(date) => setSelectedDate(date)}
        />

        {/* Progress */}
        <TodayProgress/>
      </div>
    </div>
  );
}