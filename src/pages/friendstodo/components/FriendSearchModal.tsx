import { useState, useEffect } from 'react';
import Text from '@/components/Text';
import FriendItem from '@/components/FriendItem';
import { searchUsers, type UserSearchResponse } from '@/api/friend';

type FriendSearchModalProps = {
  onClose: () => void;
  onAdd: (id: number) => void;
};

export default function FriendSearchModal({ onClose, onAdd }: FriendSearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UserSearchResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 검색 로직 (입력값이 바뀔 때마다 호출하거나, 필요 시 버튼 클릭으로 변경 가능)
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 0) {
        try {
          setIsLoading(true);
          const res = await searchUsers(query);
          setResults(res.data || []);
        } catch (err) {
          console.error(err);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 500); // 0.5초 디바운싱 (타이핑 멈추면 검색)

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative w-full max-w-[343px] h-[448px] bg-white rounded-3xl flex flex-col gap-4 px-6 pt-8 pb-6 overflow-hidden shadow-2xl">
        <Text variant="heading" className="text-center">
          친구 찾기
        </Text>

        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색할 닉네임을 입력하세요"
          className="w-full h-[51px] px-5 bg-gray-ui rounded-[32px] text-black text-[16px] placeholder:text-gray-text outline-none"
        />

        <div className="flex flex-col gap-4 mt-2 overflow-y-auto no-scrollbar flex-1">
          {isLoading ? (
            <p className="text-center text-gray-text py-10 text-sm">검색 중...</p>
          ) : results.length > 0 ? (
            results.map((user) => (
              <FriendItem
                key={user.user_id}
                name={`${user.nickname} (@${user.username})`}
                buttonType="add"
                onAddClick={() => onAdd(user.user_id)} // 실제 DB의 user_id 전달
              />
            ))
          ) : query.length > 0 ? (
            <p className="text-center text-gray-text py-10 text-sm">검색 결과가 없습니다.</p>
          ) : (
            <p className="text-center text-gray-text py-10 text-sm">
              친구의 닉네임을 검색해보세요! 🔍
            </p>
          )}
        </div>

        <button onClick={onClose} className="text-gray-text text-sm">
          닫기
        </button>
      </div>
    </div>
  );
}
