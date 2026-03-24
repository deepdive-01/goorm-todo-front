import SparkleIcon from '../sparkle.svg?react';
import Text from '@/components/Text';

export default function TodayProgress() {
  return (
    <div className="w-full bg-primary-light rounded-[32px] p-6 flex items-center justify-between">
        <div className="flex flex-col gap-1">
            <Text>이날의 진행 상황</Text>
            <Text variant='title' className='text-primary'>65% 완료</Text>
        </div>
        
        <SparkleIcon/>
    </div>
  );
}