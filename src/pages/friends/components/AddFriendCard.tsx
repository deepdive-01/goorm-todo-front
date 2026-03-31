import { useState } from 'react';
import Text from '@/components/Text';
import Button from '@/components/Button';
import SmileIcon from '@/assets/smile-icon.svg?react';
import FriendSearchModal from '../../friendstodo/components/FriendSearchModal'; // 모달 임포트
import { sendFriendRequest } from '@/api/friend';

interface AddFriendCardProps {
  onRefresh?: () => void;
}

export default function AddFriendCard({ onRefresh }: AddFriendCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 친구 요청 실행 함수
  const handleAddFriend = async (id: number) => {
    try {
      // 이미지 명세에 따라 receive_id를 담아 요청
      await sendFriendRequest(id);
      alert('친구 요청을 보냈습니다! 🎉');
      if (onRefresh) onRefresh();
      setIsModalOpen(false); // 성공 시 모달 닫기
    } catch (err) {
      console.error(err);
      alert('이미 요청했거나 존재하지 않는 사용자입니다.');
    }
  };

  return (
    <>
      <div className="w-full h-[307px] border border-dashed border-primary rounded-[32px] flex flex-col items-center justify-center gap-6 px-6 bg-white">
        <SmileIcon className="w-[52px] h-[52px]" />

        <div className="flex flex-col items-center gap-2">
          <Text variant="title" className="text-black">
            친구를 추가해보세요!
          </Text>
          <Text variant="body" className="text-black text-center">
            친구의 할 일을 확인할 수 있습니다.
          </Text>
        </div>

        <div className="w-[134.5px]">
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            친구 찾기
          </Button>
        </div>
      </div>

      {/* 모달 렌더링 */}
      {isModalOpen && (
        <FriendSearchModal
          onClose={() => setIsModalOpen(false)}
          onAdd={(id) => handleAddFriend(Number(id))}
        />
      )}
    </>
  );
}
