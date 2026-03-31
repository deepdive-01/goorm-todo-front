const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TOKEN_KEY = 'accessToken';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * 인증 헤더(Bearer Token)를 포함한 공통 fetch 함수
 */
export async function authFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // 401 (Unauthorized): 토큰이 만료되었거나 유효하지 않은 경우
  if (response.status === 401) {
    removeToken();
    window.location.href = '/login';
  }

  return response;
}
