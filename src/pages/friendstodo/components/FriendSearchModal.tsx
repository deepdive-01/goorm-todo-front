import { useState } from 'react';
import Text from '@/components/Text';
import FriendItem from '@/components/FriendItem';

const DUMMY_USERS = [
  { id: '1', name: '김서연', status: 'none'      },
  { id: '2', name: '이준호', status: 'requested' },
  { id: '3', name: '박민지', status: 'none'      },
];

type FriendSearchModalProps = {
  onClose: () => void;
  onAdd: (id: string) => void;
};

export default function FriendSearchModal({ onClose, onAdd }: FriendSearchModalProps) {
  const [query, setQuery] = useState('');

  const filtered = DUMMY_USERS.filter((u) => u.name.includes(query));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={onClose} />

      {/* Card */}
      <div className="relative w-full max-w-[343px] h-[448px] bg-white rounded-3xl flex flex-col gap-4 px-6 pt-8 pb-6 overflow-hidden">

        {/* 제목 */}
        <Text variant="heading" className="text-center">친구 찾기</Text>

        {/* 검색 인풋 */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="이름 또는 아이디로 검색"
          className="w-full h-[51px] px-5 bg-gray-ui rounded-[32px] text-black text-[16px] placeholder:text-gray-text outline-none"
        />

        {/* 검색 결과 */}
        <div className="flex flex-col gap-4">
          {filtered.map((user) => (
            <FriendItem
              key={user.id}
              name={user.name}
              buttonType={user.status === 'requested' ? 'requested' : 'add'}
              onAddClick={() => onAdd(user.id)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}