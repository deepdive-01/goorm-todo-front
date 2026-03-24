import TodoItem from '@/components/TodoItem';

export default function TodayPage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-93.75 bg-gray-ui">
        <TodoItem />
      </div>
    </div>
  );
}
