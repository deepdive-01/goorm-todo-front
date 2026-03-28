import TodoItem from '@/components/TodoItem';
import Header from '@/components/Header';
import SectionHeader from '@/components/SectionHeader';
import Footer from '@/components/Footer';
import QuoteIcon from './quote-icon.svg?react';
import Text from '@/components/Text';

const openTodoModal = () => {};

export default function TodayPage() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-93.75 bg-gray-ui">
        <Header />
        <main className="px-6 py-8 flex flex-col gap-12 w-full">
          <section className="w-full flex flex-col gap-6">
            <SectionHeader
              title="오늘의 할 일"
              rightLabel="새로 추가"
              onRightPress={openTodoModal}
            />
            <TodoItem text="아침 차 마시며 독서하기" category="plan" />
            <TodoItem text="스튜디오 세션 예약하기" category="quick" />
            <TodoItem text="몬스테라 물 주기" category="focus" />
          </section>
          <section className="w-full flex flex-col gap-4 py-12 border border-primary border-dashed items-center rounded-4xl">
            <QuoteIcon />
            <div className="w-full px-4 pb-4">
              <Text variant="title">성공의 비결은 실패에도 불구하고 열정을 잃지 않는 것이다.</Text>
            </div>
            <div className="w-12 h-px bg-primary"></div>
          </section>
          <section className="w-full flex flex-col gap-6">
            <SectionHeader title="언젠가 할 일" rightLabel="기한 없음" />
            <TodoItem text="도예 클래스 알아보기" category="later" />
            <TodoItem text="서재 책장 정리하기" category="later" />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
