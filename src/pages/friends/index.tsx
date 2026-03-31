import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Text from '@/components/Text';
import FriendItem from '@/components/FriendItem';
import AddFriendCard from './components/AddFriendCard';
import RightArrow from './right-arrow.svg?react';
import { getFriends, type FriendListItem } from '@/api/friend';
import FriendRequestModal from '@/pages/friendstodo/components/FriendRequestModal';

export default function FriendsPage() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState<FriendListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 모달 열림 상태 관리
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // 친구 목록 조회 함수
  const fetchFriends = async () => {
    try {
      setIsLoading(true);
      const res = await getFriends();
      setFriends(res.data ?? []);
    } catch (err) {
      console.error('친구 목록 로딩 실패:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-93.75 min-h-screen flex flex-col bg-gray-ui">
        <Header />

        <main className="px-6 pb-24 flex flex-col gap-6 w-full flex-1 overflow-y-auto no-scrollbar">
          {/* 친구 요청 확인 섹션*/}
          <div
            className="flex items-center justify-between py-4 bg-white px-6 -mx-6 cursor-pointer active:bg-gray-50 transition-colors"
            onClick={() => setIsRequestModalOpen(true)}
          >
            <Text variant="heading" className="text-black">
              친구 요청 확인
            </Text>
            <RightArrow />
          </div>

          {/* 친구 목록 섹션 */}
          <section className="flex flex-col gap-4">
            <Text variant="heading" className="text-black">
              친구 목록
            </Text>

            <div className="flex flex-col gap-3">
              {isLoading ? (
                <p className="text-center text-gray-text py-4">로딩 중...</p>
              ) : friends.length === 0 ? (
                <p className="text-center text-gray-text py-10">아직 친구가 없어요 👤</p>
              ) : (
                friends.map((friend) => (
                  <div
                    key={friend.friend_id} // friend_id 사용
                    onClick={() =>
                      navigate('/friendstodo', {
                        state: {
                          friendId: friend.friend_id,
                          name: friend.request_nickname,
                        },
                      })
                    }
                    className="cursor-pointer"
                  >
                    <FriendItem
                      name={friend.request_nickname} // request_nickname 사용
                      buttonType="none"
                    />
                  </div>
                ))
              )}
            </div>
          </section>

          {/* 친구 추가 카드 */}
          <AddFriendCard onRefresh={fetchFriends} />
        </main>

        <Footer />

        {/* 친구 요청 확인 모달 */}
        {isRequestModalOpen && (
          <FriendRequestModal
            onClose={() => setIsRequestModalOpen(false)}
            onRefreshFriends={fetchFriends} // 수락 시 목록 동기화
          />
        )}
      </div>
    </div>
  );
}
