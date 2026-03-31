import { useState, useEffect } from 'react';
import Text from '@/components/Text';
import FriendItem from '@/components/FriendItem';
import { getReceivedRequests, updateFriendStatus, type ReceivedFriendRequest } from '@/api/friend';

type FriendRequestModalProps = {
  onClose: () => void;
  onRefreshFriends: () => void; // 친구 목록 새로고침용
};

export default function FriendRequestModal({ onClose, onRefreshFriends }: FriendRequestModalProps) {
  const [requests, setRequests] = useState<ReceivedFriendRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. 받은 요청 목록 가져오기
  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const res = await getReceivedRequests();
      setRequests(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // 2. 수락/거절 처리
  const handleAction = async (requestId: number, status: 'ACCEPTED' | 'REJECTED') => {
    try {
      // 이미지 명세 2번에 따라 PATCH /api/v1/friends/request/{friendId} 호출
      // 여기서requestId는 명세상의 friend_id 혹은 request_id 상황에 맞춰 사용
      await updateFriendStatus(requestId, status);

      alert(status === 'ACCEPTED' ? '친구 요청을 수락했습니다.' : '요청을 거절했습니다.');

      // 목록 새로고침
      fetchRequests();
      if (status === 'ACCEPTED') onRefreshFriends(); // 수락 시 메인 친구 목록도 갱신
    } catch (err) {
      alert('처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-[343px] min-h-[300px] bg-white rounded-[40px] px-8 pt-8 pb-8 flex flex-col gap-6 shadow-2xl">
        <Text variant="heading" className="text-center">
          친구 요청
        </Text>

        <div className="flex flex-col gap-4 overflow-y-auto max-h-[400px] no-scrollbar">
          {isLoading ? (
            <p className="text-center text-gray-text py-10">로딩 중...</p>
          ) : requests.length === 0 ? (
            <p className="text-center text-gray-text py-10">받은 요청이 없습니다. 📭</p>
          ) : (
            requests.map((req) => (
              <FriendItem
                key={req.request_id}
                name={req.request_nickname}
                buttonType="actions"
                // 명세에 따라 적절한 ID(friend_id 또는 request_id) 전달
                onAcceptClick={() => handleAction(req.friend_id, 'ACCEPTED')}
                onRemoveClick={() => handleAction(req.friend_id, 'REJECTED')}
              />
            ))
          )}
        </div>

        <button onClick={onClose} className="text-gray-text text-sm mt-2">
          닫기
        </button>
      </div>
    </div>
  );
}
