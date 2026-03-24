import { useState } from 'react';
import TodayProgress from './components/TodayProgress';

export default function CalendarPage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-93.75 bg-gray-ui">
        {/* Progress */}
        <TodayProgress/>
      </div>
    </div>
  );
}