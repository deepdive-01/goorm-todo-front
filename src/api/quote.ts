export type QuoteResponse = {
  status: number;
  code: string;
  message: string;
  data: {
    quote_id: number;
    content: string;
    author: string;
  };
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getRandomQuote() {
  const response = await fetch(`${API_BASE_URL}/api/v1/quotes/random`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('랜덤 명언 조회에 실패했습니다.');
  }

  const result: QuoteResponse = await response.json();
  return result;
}
