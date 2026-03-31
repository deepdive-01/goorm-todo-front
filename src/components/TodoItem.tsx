import Text from './Text';

type Category = 'focus' | 'quick' | 'plan' | 'drop' | 'later';

type TodoItemProps = {
  id: number;
  text: string;
  category: Category;
  isCompleted: boolean;
  onToggle: () => void;
  onClick: () => void;
};

export default function TodoItem({
  id,
  text,
  category,
  isCompleted,
  onToggle,
  onClick,
}: TodoItemProps) {
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
    <li
      className="w-full rounded-[32px] p-6 flex gap-5 bg-white shadow-sm items-center list-none cursor-pointer"
      onClick={onClick}
    >
      <button
        type="button"
        disabled={category === 'later'}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`w-5.5 h-5.5 border-2 rounded-full transition-colors ${categoryBorderMap[category]} ${isCompleted ? categoryBgMap[category] : ''}`}
      />
      <Text className={isCompleted ? 'text-gray-text line-through' : 'text-black'}>{text}</Text>
    </li>
  );
}
