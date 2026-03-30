import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Text from '@/components/Text';
import FriendItem from '@/components/FriendItem';
import AddFriendCard from './components/AddFriendCard';
import RightArrow from './right-arrow.svg?react';
import { useNavigate } from 'react-router-dom';

const DUMMY_FRIENDS = [
  { id: '1', name: '김지수' },
  { id: '2', name: '이민우' },
];

export default function FriendsPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-93.75 min-h-screen flex flex-col bg-gray-ui">
        <Header />
        {/* 스크롤 영역 */}
        <main className="px-6 pb-8 flex flex-col gap-6 w-full flex-1">

          {/* 친구 요청 확인 */}
        <div className="flex items-center justify-between py-4 bg-white px-6 -mx-6">
          <Text variant="heading" className="text-black">친구 요청 확인</Text>
          <RightArrow />
        </div>

          {/* 친구 목록 */}
          <Text variant="heading" className="text-black">친구 목록</Text>
          <div className="flex flex-col gap-3">
            {DUMMY_FRIENDS.map(friend => (
              <div
                key={friend.id}
                onClick={() => navigate('/friendstodo', { state: { name: friend.name } })}
              >
                <FriendItem name={friend.name} buttonType="none" />
              </div>
            ))}
          </div>

          {/* 친구 추가 카드 */}
          <AddFriendCard />

        </main>
          <Footer />
      </div>
    </div>
  );
}