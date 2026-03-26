import { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Text from '@/components/Text';
import Button from '@/components/Button';
import Input from '@/components/Input';
import CategorySelector, { type CategoryColor } from '@/pages/calendar/components/CategorySelector'
import CloseIcon from '@/assets/close.svg?react';

type AddTaskModalProps = {
  date: Date;
  onSave: (data: { text: string; category: CategoryColor; memo: string }) => void;
  onClose: () => void;
};

export default function AddTaskModal({ date, onSave, onClose }: AddTaskModalProps) {
  const [text, setText]         = useState('');
  const [category, setCategory] = useState<CategoryColor>('focus');
  const [memo, setMemo]         = useState('');

  const dateLabel = format(date, 'M월 d일 EEEE', { locale: ko });

  const handleSave = () => {
    if (!text.trim()) return;
    onSave({ text: text.trim(), category, memo });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative w-full max-w-[343px] bg-white rounded-[40px] px-8 pt-[34px] pb-8 flex flex-col gap-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <Text variant="heading" className="text-black">{dateLabel}</Text>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center transition-transform"
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        </div>

        {/* 할 일 */}
        <Input
          label="할 일"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />

        {/* 카테고리 */}
        <CategorySelector selected={category} onChange={setCategory} />

        {/* 메모 */}
        <Input
          label="메모"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모를 입력하세요"
        />

        {/* 버튼 */}
        <div className="flex gap-3 pb-4">
          <Button variant="quick" onClick={onClose}>취소</Button>
          <Button variant="primary" onClick={handleSave}>저장</Button>
        </div>

      </div>
    </div>
  );
}