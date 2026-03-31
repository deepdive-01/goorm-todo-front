import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Text from '@/components/Text';
import Button from '@/components/Button';
import Input from '@/components/Input';
import CategorySelector, { type CategoryColor } from '@/pages/calendar/components/CategorySelector';
import CloseIcon from '@/assets/close.svg?react';
import { createTodo } from '@/api/todo';

type AddTaskModalProps = {
  mode: 'specific' | 'someday';
  date?: Date;
  onSave: (data: { text: string; category: CategoryColor; memo: string }) => void;
  onClose: () => void;
  initialValues?: {
    text: string;
    category: CategoryColor;
    memo: string;
  };
  submitLabel?: string;
  onSubmit?: (data: { text: string; category: CategoryColor; memo: string }) => Promise<void>;
};

const mapCategoryToApi = (category: CategoryColor) => {
  switch (category) {
    case 'focus':
      return 'FOCUS';
    case 'quick':
      return 'QUICK';
    case 'plan':
      return 'PLAN';
    case 'drop':
      return 'DROP';
    default:
      return 'PLAN';
  }
};

export default function AddTaskModal({
  mode,
  date,
  onSave,
  onClose,
  initialValues,
  submitLabel = '저장',
  onSubmit,
}: AddTaskModalProps) {
  const [text, setText] = useState(initialValues?.text ?? '');
  const [category, setCategory] = useState<CategoryColor>(initialValues?.category ?? 'focus');
  const [memo, setMemo] = useState(initialValues?.memo ?? '');

  useEffect(() => {
    setText(initialValues?.text ?? '');
    setCategory(initialValues?.category ?? 'focus');
    setMemo(initialValues?.memo ?? '');
  }, [initialValues]);

  const titleLabel =
    mode === 'specific' && date
      ? format(date, 'M월 d일 EEEE', { locale: ko })
      : '언젠가 할 일 추가';

  const handleSave = async () => {
    if (!text.trim()) return;

    try {
      const values = {
        text: text.trim(),
        category,
        memo,
      };

      if (onSubmit) {
        await onSubmit(values);
      } else {
        if (mode === 'specific') {
          if (!date) return;

          await createTodo({
            title: values.text,
            dateType: 'specific',
            specificDate: format(date, 'yyyy-MM-dd'),
            category: mapCategoryToApi(values.category),
            memo: values.memo,
          });
        } else {
          await createTodo({
            title: values.text,
            dateType: 'someday',
            category: mapCategoryToApi(values.category),
            memo: values.memo,
          });
        }
      }

      onSave(values);
      onClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : '저장에 실패했습니다.');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-md" />

      <div className="relative w-full max-w-[343px] bg-white rounded-[40px] px-8 pt-[34px] pb-8 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <Text variant="heading" className="text-black">
            {titleLabel}
          </Text>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center transition-transform"
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        </div>

        <Input
          label="할 일"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />

        <CategorySelector selected={category} onChange={setCategory} />

        <Input
          label="메모"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모를 입력하세요"
        />

        <div className="flex gap-3">
          <Button variant="quick" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {submitLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
