import { useEffect, useState } from 'react';
import TodoItem from '@/components/TodoItem';
import Header from '@/components/Header';
import SectionHeader from '@/components/SectionHeader';
import Footer from '@/components/Footer';
import QuoteIcon from './quote-icon.svg?react';
import Text from '@/components/Text';
import { getRandomQuote } from '@/api/quote';

const openTodoModal = () => {};

export default function TodayPage() {
  const [quote, setQuote] = useState({
    content: '',
    author: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const result = await getRandomQuote();

        setQuote({
          content: result.data.content,
          author: result.data.author,
        });
      } catch (error) {
        console.error(error);
        setQuote({
          content: '성공의 비결은 실패에도 불구하고 열정을 잃지 않는 것이다.',
          author: '윈스턴 처칠',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
  }, []);

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
              <Text variant="title" className="text-center">
                {isLoading ? '명언을 불러오는 중...' : quote.content}
              </Text>
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
