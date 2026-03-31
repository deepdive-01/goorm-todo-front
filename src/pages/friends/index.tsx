import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Text from '@/components/Text';
import FriendItem from '@/components/FriendItem';
import AddFriendCard from './components/AddFriendCard';
import RightArrow from './right-arrow.svg?react';
import { getFriends, deleteFriend, type FriendListItem } from '@/api/friend'; //
import FriendRequestModal from '@/pages/friendstodo/components/FriendRequestModal';
import DeleteModal from './components/DeleteFriendModal'; // 할 일 삭제 모달을 친구 삭제용으로 재사용

export default function FriendsPage() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState<FriendListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 모달 상태 관리
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<{ id: number; name: string } | null>(null);

  // 친구 목록 조회 함수
  const fetchFriends = async () => {
    try {
      setIsLoading(true);
      const res = await getFriends();
      // API 명세에 따라 res.data가 배열임을 확인
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

  // 우클릭 핸들러 (친구 삭제 모달 띄우기)
  const handleContextMenu = (e: React.MouseEvent, id: number, name: string) => {
    e.preventDefault(); // 브라우저 기본 메뉴 방지
    setSelectedFriend({ id, name });
    setIsDeleteModalOpen(true);
  };

  // 친구 삭제 실행 함수
  const handleDeleteConfirm = async () => {
    if (!selectedFriend) return;

    try {
      await deleteFriend(selectedFriend.id); //
      setFriends((prev) => prev.filter((f) => f.friend_id !== selectedFriend.id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error('친구 삭제 실패:', err);
      alert('친구 삭제에 실패했습니다.');
    } finally {
      setSelectedFriend(null);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-93.75 min-h-screen flex flex-col bg-gray-ui">
        <Header />

        <main className="px-6 pb-24 flex flex-col gap-6 w-full flex-1 overflow-y-auto no-scrollbar">
          {/* 친구 요청 확인 섹션 */}
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
              {friends.map((friend) => {
                // 1. 콘솔 로그 결과에 따라 'nickname' 필드를 사용합니다.
                const displayName = friend.nickname || '이름 없음';

                return (
                  <div
                    key={friend.friend_id}
                    onClick={() =>
                      navigate('/friendstodo', {
                        state: {
                          friendId: friend.friend_id,
                          name: displayName, // won이 전달됩니다.
                        },
                      })
                    }
                    onContextMenu={(e) => handleContextMenu(e, friend.friend_id, displayName)}
                    className="cursor-pointer"
                  >
                    <FriendItem
                      name={displayName} // 이제 'won'이 정상적으로 뜹니다!
                      buttonType="none"
                    />
                  </div>
                );
              })}
            </div>
          </section>

          {/* 친구 추가 카드 (검색 모달 포함) */}
          <AddFriendCard onRefresh={fetchFriends} />
        </main>

        <Footer />

        {/* 1. 받은 친구 요청 모달 */}
        {isRequestModalOpen && (
          <FriendRequestModal
            onClose={() => setIsRequestModalOpen(false)}
            onRefreshFriends={fetchFriends}
          />
        )}

        {/* 2. 친구 삭제 확인 모달 */}
        {isDeleteModalOpen && (
          <DeleteModal
            onConfirm={handleDeleteConfirm}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedFriend(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
