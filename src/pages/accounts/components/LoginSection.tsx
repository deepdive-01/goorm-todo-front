import { useState } from 'react';
import Text from '@/components/Text';
import Input from '@/components/Input';

export default function LoginSection() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

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
        <button className="w-full rounded-full bg-primary text-white py-4 mt-7.5 cursor-pointer hover:bg-primary/90">
          <Text variant="heading">로그인</Text>
        </button>
      </section>
      <section className="flex gap-2.5 justify-center pb-5">
        <Text className="text-black">회원이 아니신가요?</Text>
        <Text className="text-primary hover:underline cursor-pointer">회원가입</Text>
      </section>
    </main>
  );
}
