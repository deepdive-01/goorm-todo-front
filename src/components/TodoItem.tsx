import { useState } from 'react';
import Text from './Text';

export default function TodoItem() {
  const [checked, setChecked] = useState(false);

  return (
    <li className="w-full rounded-4xl p-6 flex gap-5 bg-white shadow-sm items-center">
      <button
        onClick={() => setChecked((prev) => !prev)}
        className={`w-5.5 h-5.5 border-plan border-2 rounded-full ${checked ? 'bg-plan' : ''}`}
      ></button>
      <Text className={checked ? 'text-gray-text line-through' : ''}>아침 차 마시며 독서하기</Text>
    </li>
  );
}
