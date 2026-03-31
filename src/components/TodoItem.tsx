import Text from './Text';

type Category = 'focus' | 'quick' | 'plan' | 'drop' | 'later';

type TodoItemProps = {
  id: number;
  text: string;
  category: Category;
  isCompleted: boolean; // 부모로부터 상태를 받음
  onToggle: () => void; // 클릭 시 실행할 함수
};

export default function TodoItem({ id, text, category, isCompleted, onToggle }: TodoItemProps) {
  const categoryBorderMap = {
    focus: 'border-primary',
    quick: 'border-quick',
    plan: 'border-plan',
    drop: 'border-drop',
    later: 'border-primary-light',
  };

  const categoryBgMap = {
    focus: 'bg-primary',
    quick: 'bg-quick',
    plan: 'bg-plan',
    drop: 'bg-drop',
    later: '',
  };

  return (
    <li className="w-full rounded-[32px] p-6 flex gap-5 bg-white shadow-sm items-center list-none">
      <button
        type="button"
        disabled={category === 'later'}
        onClick={onToggle} // 부모의 함수 호출
        className={`w-5.5 h-5.5 border-2 rounded-full transition-colors ${categoryBorderMap[category]} ${isCompleted ? categoryBgMap[category] : ''}`}
      />
      <Text className={isCompleted ? 'text-gray-text line-through' : 'text-black'}>{text}</Text>
    </li>
  );
}
