import { useState } from 'react';
import Text from '@/components/Text';
import Input from '@/components/Input';
import { loginApi } from '@/api/auth';

interface LoginSectionProps {
  onLoginSuccess: (token: string) => void;
  onMoveToRegister: () => void;
}

export default function LoginSection({ onLoginSuccess, onMoveToRegister }: LoginSectionProps) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      setErrorMessage('');

      const result = await loginApi({
        username: id,
        password,
      });
      console.log('login result:', result);

      const accessToken = result?.data?.accessToken;

      if (!accessToken) {
        throw new Error('access token이 없습니다.');
      }

      onLoginSuccess(accessToken);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('로그인 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-6 py-8 flex flex-1 flex-col gap-15 w-full">
      <section className="flex flex-col gap-5 text-center">
        <Text variant="title" className="text-primary">
          환영합니다
        </Text>
        <Text className="text-black">로그인 후 서비스를 이용해보세요</Text>
      </section>
      <section className="flex flex-col gap-5">
        <Input
          label="아이디"
          placeholder="아이디를 입력하세요"
          value={id}
          onChange={(e) => setId(e.target.value)}
          inputWhite
        />
        <Input
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          inputWhite
        />

        {errorMessage && (
          <Text variant="caption" className="text-[#ff0000]">
            {errorMessage}
          </Text>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-full bg-primary text-white py-4 mt-7.5 cursor-pointer hover:bg-primary/90"
        >
          <Text variant="heading">로그인</Text>
        </button>
      </section>
      <section className="flex gap-2.5 justify-center pb-5">
        <Text className="text-black">회원이 아니신가요?</Text>
        <button onClick={onMoveToRegister}>
          <Text className="text-primary hover:underline cursor-pointer">회원가입</Text>
        </button>
      </section>
    </main>
  );
}
