import TodoItem from '@/components/TodoItem';
import Header from '@/components/Header';

export default function TodayPage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-93.75 bg-gray-ui">
        <Header />
        <TodoItem />
      </div>
    </div>
  );
}
