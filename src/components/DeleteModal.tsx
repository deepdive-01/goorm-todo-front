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
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Card */}


      <div className="relative w-full max-w-[343px] bg-white rounded-[40px] flex flex-col overflow-hidden">

        {/* 콘텐츠 */}
        <div className="flex flex-col items-center gap-4 px-8 pt-8 pb-6">
          <TrashIcon />
          <div className="flex flex-col items-center gap-2">
            <Text variant="title">할 일을 삭제할까요?</Text>
            <Text variant="body">삭제한 할 일은 복구할 수 없습니다.</Text>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 px-8 pt-4 pb-8">
          <Button variant="gray" onClick={onClose}>취소</Button>
          <Button variant="quick" onClick={onConfirm}>삭제</Button>
        </div>

      </div>
    </div>
  );
}