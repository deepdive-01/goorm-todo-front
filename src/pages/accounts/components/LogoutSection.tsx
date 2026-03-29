import Text from '@/components/Text';
import QuoteIcon from './quote-icon.svg?react';

export default function LogoutSection() {
  return (
    <main className="px-6 py-8 flex flex-1 flex-col gap-15 w-full mb-18">
      <section className="w-full flex flex-col gap-4 py-12 border border-primary border-dashed items-center rounded-4xl">
        <QuoteIcon />
        <div className="w-full px-4 pb-4">
          <Text variant="title">성공의 비결은 실패에도 불구하고 열정을 잃지 않는 것이다.</Text>
        </div>
        <div className="w-12 h-px bg-primary"></div>
      </section>
      <section className="flex gap-2.5 justify-center pb-5">
        <Text className="text-black">현재 계정에서 로그아웃하시겠어요?</Text>
        <Text className="text-primary hover:underline cursor-pointer">로그아웃</Text>
      </section>
    </main>
  );
}
