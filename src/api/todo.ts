import { authFetch } from '@/utils/authFetch';

export type TodoCategory = 'FOCUS' | 'QUICK' | 'PLAN' | 'DROP';

// 2. API 응답 데이터 구조 (조회용)
export interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
  dateType: 'someday' | 'specific' | 'range';
  specificDate: string | null;
  startDate: string | null;
  endDate: string | null;
  category: TodoCategory;
  memo: string;
  createdAt: string;
}

export type TodoResponse = {
  status: number;
  code: string;
  message: string;
  data: TodoItem[];
};

// 3. 할일 생성 요청 데이터 구조 (명세서 기준)
export type TodoCreateRequest =
  | {
      title: string;
      dateType: 'specific';
      specificDate: string;
      category: string;
      memo: string;
    }
  | {
      title: string;
      dateType: 'someday';
      category: string;
      memo: string;
    };

// --- API 함수들 ---

/**
 * 할일 목록 조회
 * @param date YYYY-MM-DD 형식
 */
export async function getTodos(date: string): Promise<TodoResponse> {
  const response = await authFetch(`/api/v1/todos?date=${date}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || '할일 목록 조회에 실패했습니다.');
  }

  return response.json();
}

/**
 * 할일 생성
 */
export async function createTodo(request: TodoCreateRequest): Promise<void> {
  const response = await authFetch('/api/v1/todos', {
    method: 'POST',
    // 요청 본문을 서버 명세서에 맞게 JSON화 하여 전송
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || '할일 생성에 실패했습니다.');
  }
}

/**
 * 할일 삭제
 */
export async function deleteTodo(todoId: number): Promise<void> {
  const response = await authFetch(`/api/v1/todos/${todoId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || '할일 삭제에 실패했습니다.');
  }
}

/**
 * 할일 업데이트
 */
export async function updateTodoStatus(todoId: number, isCompleted: boolean): Promise<void> {
  const response = await authFetch(`/api/v1/todos/${todoId}`, {
    method: 'PATCH',
    body: JSON.stringify({ isCompleted }),
  });

  if (!response.ok) {
    throw new Error('상태 업데이트에 실패했습니다.');
  }
}

export type TodoUpdateRequest = {
  title?: string;
  isCompleted?: boolean;
  category?: TodoCategory;
  memo?: string;
};

export async function updateTodo(todoId: number, request: TodoUpdateRequest): Promise<void> {
  const response = await authFetch(`/api/v1/todos/${todoId}`, {
    method: 'PATCH',
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || '할일 수정에 실패했습니다.');
  }
}
