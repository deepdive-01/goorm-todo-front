import Text from './Text';
import AvatarIcon from '@/assets/avatar-icon.svg?react';
import XIcon from '@/assets/x-icon.svg?react';
import CheckIcon from '@/assets/check-icon.svg?react';

type ButtonType = 'none' | 'add' | 'requested' | 'actions';

type FriendItemProps = {
  name: string;
  buttonType: ButtonType;
  onAddClick?: () => void;
  onRemoveClick?: () => void;
  onAcceptClick?: () => void;
};

export default function FriendItem({
  name,
  buttonType,
  onAddClick,
  onRemoveClick,
  onAcceptClick,
}: FriendItemProps) {
  return (
    <div className="w-full h-[88px] flex items-center gap-3 px-4 bg-gray-ui shadow-sm rounded-[32px]">
      {/* 프로필 아바타 */}
      <div className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center overflow-hidden">
        <AvatarIcon className="w-full h-full" />
      </div>

      {/* 이름 */}
      <Text variant="heading" className="text-black flex-1">
        {name}
      </Text>

      {/* 오른쪽 버튼 영역 */}
      <div className="flex-shrink-0">
        {buttonType === 'add' && (
          <button
            onClick={onAddClick}
            className="w-[100px] h-[43px] bg-primary rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <Text variant="body" className="text-white whitespace-nowrap">
              친구 추가
            </Text>
          </button>
        )}

        {buttonType === 'requested' && (
          <div className="w-[100px] h-[43px] bg-gray-ui rounded-full flex items-center justify-center">
            <Text variant="body" className="text-black whitespace-nowrap">
              요청됨
            </Text>
          </div>
        )}

        {buttonType === 'actions' && (
          <div className="flex items-center gap-4">
            <button onClick={onRemoveClick} className="w-6 h-6 hover:opacity-70 transition-opacity">
              <XIcon className="w-full h-full text-quick" />
            </button>
            <button onClick={onAcceptClick} className="w-6 h-6 hover:opacity-70 transition-opacity">
              <CheckIcon className="w-full h-full text-primary" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}