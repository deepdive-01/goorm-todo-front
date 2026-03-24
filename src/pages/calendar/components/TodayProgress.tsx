import FrameIcon from '../Img/Frame.png';

interface TodayProgressProps {
  total: number;
  completed: number;
}

export default function TodayProgress({ total, completed }: TodayProgressProps) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="mx-4 bg-[#F0FAF5] rounded-3xl px-5 py-4 flex items-center justify-between">
      <div>
        <p className="text-[12px] text-[#9E9E9E] mb-1">이날의 진행 상황</p>
        <p className="text-[22px] font-bold text-[#4CC38A]">
          {percent}%{' '}
          <span className="text-[16px] font-medium text-[#2D2D2D]">완료</span>
        </p>
      </div>

      {/* 아이콘 자리 — 원하는 아이콘으로 교체 */}
      <div className="w-10 h-10 flex items-center justify-center">
        <img src={FrameIcon} alt="progress icon" />
      </div>
    </div>
  );
}