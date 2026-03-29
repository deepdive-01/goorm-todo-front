import Text from '@/components/Text';
import AvatarIcon from '@/assets/avatar-icon.svg?react';

type FriendTodoSectionProps = {
  friendName: string;
  onBack?: () => void;
};

export default function FriendTodoSection({ friendName, onBack }: FriendTodoSectionProps) {
  return (
    <div className="w-full h-12 bg-white rounded-lg px-4 flex items-center gap-3">
      {/* 뒤로가기 버튼 */}
      <button onClick={onBack} className="w-6 h-6 flex items-center justify-center text-black text-xl">
        ←
      </button>

      {/* 아바타 */}
      <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center overflow-hidden">
        <AvatarIcon className="w-full h-full" />
      </div>

      {/* 친구 이름 */}
      <Text variant="body" className="text-black font-semibold">
        {friendName}
      </Text>
    </div>
  );
}