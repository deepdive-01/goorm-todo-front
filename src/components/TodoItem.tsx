import Text from './Text';

type Category = 'focus' | 'quick' | 'plan' | 'drop' | 'later';

type TodoItemProps = {
  // id: number; // 1. 에러 TS6133 해결: 사용하지 않는 id 제거
  text: string;
  category: Category;
  isCompleted: boolean;
  onToggle: () => void;
  onClick?: () => void; // 2. 에러 TS2741 해결: 필수에서 선택 사항으로 변경 (? 추가)
};

export default function TodoItem({
  // id, // 1. 여기서도 제거
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
      // onClick이 전달되었을 때만 실행되도록 안전하게 처리
      onClick={() => onClick?.()}
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
