import Text from '@/components/Text';
import SmileIcon from '@/assets/smile-icon.svg?react';

export default function AddFriendCard() {
  const handleFindFriend = () => {
    console.log('친구 찾기');
  };

  return (
    <div className="w-[327px] h-[307px] border border-dashed border-primary rounded-[32px] flex flex-col items-center justify-center gap-6 px-6">
      {/* 아이콘 - 52x52 */}
      <SmileIcon className="w-[52px] h-[52px]" />

      {/* 텍스트 그룹 */}
      <div className="flex flex-col items-center gap-2">
        {/* 제목 */}
        <Text variant="title" className="text-black">
          친구를 추가해보세요!
        </Text>

        {/* 설명 */}
        <Text variant="body" className="text-black text-center">
          친구와 할 일을 함께할 수 있습니다.
        </Text>
      </div>

      {/* 버튼 */}
      <button 
        onClick={handleFindFriend}
        className="w-[134.5px] h-[43px] bg-primary rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
      >
        <Text variant="body" className="text-white font-semibold">
          친구 찾기
        </Text>
      </button>
    </div>
  );
}