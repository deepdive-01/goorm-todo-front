import { useState } from 'react';
import Text from './Text';

type Category = 'focus' | 'quick' | 'plan' | 'drop' | 'later';

type TodoItemProps = {
  text: string;
  category: Category;
};

export default function TodoItem({ text, category }: TodoItemProps) {
  const [checked, setChecked] = useState(false);

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
    <li className="w-full rounded-4xl p-6 flex gap-5 bg-white shadow-sm items-center">
      <button
        disabled={category === 'later'}
        onClick={() => setChecked((prev) => !prev)}
        className={`w-5.5 h-5.5 border-2 rounded-full ${categoryBorderMap[category]} ${checked ? categoryBgMap[category] : ''}`}
      ></button>
      <Text className={checked ? 'text-gray-text line-through' : ''}>{text}</Text>
    </li>
  );
}
