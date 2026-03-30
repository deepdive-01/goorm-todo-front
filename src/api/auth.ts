const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface RegisterRequest {
  username: string;
  nickname: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export async function registerApi(body: RegisterRequest) {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || '회원가입에 실패했습니다.');
  }

  return data;
}

export async function loginApi(body: LoginRequest) {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || '로그인에 실패했습니다.');
  }

  return data;
}
