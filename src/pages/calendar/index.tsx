import { useState } from 'react';
import TodayProgress from './components/TodayProgress';

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="relative w-full max-w-[327px] min-h-screen flex flex-col gap-4 pb-24">
        {/* Progress */}
        <TodayProgress/>
      </div>
    </div>
  );
}