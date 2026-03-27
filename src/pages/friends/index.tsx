import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Text from '@/components/Text';
import Button from '@/components/Button';
//import FriendItem from "@/components/FriendItem"
import AddFriendCard from './components/AddFriendCard';
import RightArrow from './right-arrow.svg?react';

const DUMMY_FRIENDS = [
  { id: '1', name: '김지수' },
  { id: '2', name: '이민우' },
];

export default function FriendsPage() {
  const handleAddFriend = (id: string) => {
    console.log('친구 추가:', id);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-93.75 bg-gray-ui">
        <Header />
        {/* 친구 요청 확인 */}
          <div className="flex items-center justify-between py-4 bg-white rounded-lg px-4">
            <Text variant="heading" className="text-black">친구 요청 확인</Text>
            <RightArrow />
          </div>
        <main className="px-6 py-8 flex flex-col gap-6">
          {/* 친구 목록 */}
          <Text variant="heading" className="text-black">친구 목록</Text>

          {/* 친구 리스트
          <div className="flex flex-col gap-3">
            {DUMMY_FRIENDS.map(friend => (
              <FriendItem
                key={friend.id}
                name={friend.name}
                buttonType="none"
              />
            ))}
          </div> */}

          {/* 친구 추가 카드 */}
          <AddFriendCard />
        </main>
        <Footer />
      </div>
    </div>
  );
}