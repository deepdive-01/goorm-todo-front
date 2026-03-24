import { useState } from 'react';
import { type Task } from './components/TaskModal';
import TodayProgress from './components/TodayProgress';
// import CalendarCard from './CalendarCard';
// import TaskList from './TaskList';
// import BottomNav from './BottomNav';

const toKey = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

export default function CalendarPage() {
  const now = new Date();
  const [tasks] = useState<Task[]>([
    {
      // 임시로 더미데이터
      id: '1',
      name: '아침 정원 명상',
      category: 'green',
      memo: '',
      completed: false,
      date: toKey(now.getFullYear(), now.getMonth(), now.getDate()),
    },
    {
      id: '2',
      name: '유기농 차 블렌드 찾아오기',
      category: 'pink',
      memo: '',
      completed: true,
      date: toKey(now.getFullYear(), now.getMonth(), now.getDate()),
    },
  ]);

  const todayKey = toKey(now.getFullYear(), now.getMonth(), now.getDate());
  const todayTasks = tasks.filter(t => t.date === todayKey);
  const completedTasks = todayTasks.filter(t => t.completed);

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="relative w-full max-w-[390px] min-h-screen flex flex-col gap-4 pb-24">

        {/* Header */}
        {/* <AppHeader /> */}

        {/* Calendar */}
        {/* <CalendarCard /> */}

        {/* Progress */}
        <TodayProgress
          total={todayTasks.length}
          completed={completedTasks.length}
        />

        {/* Task List */}
        {/* <TaskList /> */}

        {/* Bottom Nav */}
        {/* <BottomNav /> */}

      </div>
    </div>
  );
}