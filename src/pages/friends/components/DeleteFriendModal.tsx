import Text from '@/components/Text';
import Button from '@/components/Button';
import TrashIcon from '@/assets/trash.svg?react';

type DeleteModalProps = {
  onConfirm: () => void;
  onClose: () => void;
};

export default function DeleteModal({ onConfirm, onClose }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-[343px] bg-white rounded-[40px] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex flex-col items-center gap-4 px-8 pt-8 pb-6">
          <TrashIcon className="w-12 h-12 text-quick" />
          <div className="flex flex-col items-center gap-2">
            <Text variant="heading">친구를 삭제할까요?</Text>
            <Text variant="body" className="text-gray-text text-center">
              친구를 삭제하면 상대방의 <br /> 할 일을 더 이상 볼 수 없습니다.
            </Text>
          </div>
        </div>

        <div className="flex gap-3 px-8 pt-4 pb-8">
          <Button variant="gray" className="flex-1" onClick={onClose}>
            취소
          </Button>
          <Button variant="quick" className="flex-1" onClick={onConfirm}>
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
