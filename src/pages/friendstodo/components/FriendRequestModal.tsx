import Text from '@/components/Text';
import FriendItem from '@/components/FriendItem';

const DUMMY_REQUESTS = [
  { id: '1', name: '김지수' },
  { id: '2', name: '이민우' },
  { id: '3', name: '박서준' },
];

type FriendRequestModalProps = {
  onClose: () => void;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
};

export default function FriendRequestModal({ onClose, onAccept, onReject }: FriendRequestModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md" onClick={onClose} />

      {/* Card */}
      <div className="relative w-full max-w-[343px] bg-white rounded-[40px] px-8 pt-8 pb-8 flex flex-col gap-6">

        {/* 제목 */}
        <Text variant="heading" className="text-center">친구 요청</Text>

        {/* 요청 목록 */}
        <div className="flex flex-col gap-4">
          {DUMMY_REQUESTS.map((req) => (
            <FriendItem
              key={req.id}
              name={req.name}
              buttonType="actions"
              onAcceptClick={() => onAccept(req.id)}
              onRemoveClick={() => onReject(req.id)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}