import FrameIcon from '../Img/sparkle.svg';

interface TodayProgressProps {
  total: number;
  completed: number;
}

export default function TodayProgress({ total, completed }: TodayProgressProps) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="mx-4 bg-primary-light rounded-3xl px-5 py-4 flex items-center justify-between">
      <div>
        <div className="text-[12px] text-gray-text mb-1">이날의 진행 상황</div>
        <div className="text-[22px] font-bold text-primary">
          {percent}%{' '}
          <span className="text-[16px] font-medium text-black">완료</span>
        </div>
      </div>

      {/* 아이콘 자리 — 원하는 아이콘으로 교체 */}
      <div className="w-10 h-10 flex items-center justify-center">
        <img src={FrameIcon} alt="progress icon" />
      </div>
    </div>
  );
}