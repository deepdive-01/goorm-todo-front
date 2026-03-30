import Text from '@/components/Text';
import Button from '@/components/Button';
import SmileIcon from '@/assets/smile-icon.svg?react';

export default function AddFriendCard() {
  const handleFindFriend = () => {
    console.log('친구 찾기');
  };

  return (
    <div className="w-full h-[307px] border border-dashed border-primary rounded-[32px] flex flex-col items-center justify-center gap-6 px-6">
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
        <Button variant="primary" onClick={handleFindFriend}>
          친구 찾기
        </Button>
      </div>
    </div>
  );
}