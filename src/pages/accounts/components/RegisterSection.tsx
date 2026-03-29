import { useState } from 'react';
import Text from '@/components/Text';
import Input from '@/components/Input';

export default function RegisterSection() {
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  return (
    <main className="px-6 py-8 flex flex-1 flex-col gap-15 w-full mb-18">
      <section className="flex flex-col gap-5 text-center">
        <Text variant="title" className="text-primary">
          회원가입
        </Text>
        <Text className="text-black">간단한 정보만 입력하면 바로 시작할 수 있어요</Text>
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
          label="닉네임"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          inputWhite
        />
        <Input
          label="이메일"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          inputWhite
        />
        <Input
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          inputWhite
        />
        <div>
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력하세요"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            inputWhite
          />
          {passwordConfirm.length > 0 && password !== passwordConfirm && (
            <Text variant="caption" className="text-[#ff0000] pt-1">
              비밀번호가 일치하지 않습니다.
            </Text>
          )}
        </div>

        <button className="w-full rounded-full bg-primary text-white py-4 mt-7.5 cursor-pointer hover:bg-primary/90">
          <Text variant="heading">회원가입</Text>
        </button>
      </section>
      <section className="flex gap-2.5 justify-center pb-5">
        <Text className="text-black">이미 계정이 있으신가요?</Text>
        <Text className="text-primary hover:underline cursor-pointer">로그인</Text>
      </section>
    </main>
  );
}
