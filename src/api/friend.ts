import { authFetch } from '@/utils/authFetch';

/** 친구 관련 타입 정의 (이미지 명세 기준) **/

// 1. 친구 요청 전송 응답
export interface FriendRequestResponse {
  friend_id: number;
  receive_id: number;
  receive_nickname: string;
  status: string;
  create_at: string;
}

// 2. 친구 요청 목록
export interface ReceivedFriendRequest {
  friend_id: number;
  request_id: number;
  request_nickname: string;
  status: string;
  created_at: string;
}

// 3. 친구 요청 수락/거절 응답
export interface FriendStatusUpdateResponse {
  friend_id: number;
  request_id: number;
  receive_id: number;
  request_nickname: string;
  receive_nickname: string;
  status: 'ACCEPTED' | 'REJECTED';
  create_at: string;
}

// 4. 친구 목록 조회 아이템
export interface FriendListItem {
  friend_id: number;
  request_nickname: string;
}

// 5. 친구 캘린더 조회 응답
export interface FriendCalendarResponse {
  friend_id: number;
  friend_nickname: string;
  todos: Array<{
    todo_id: number;
    title: string;
    date: string;
    is_completed: boolean;
  }>;
}

// 유저 검색 결과 타입
export interface UserSearchResponse {
  user_id: number;
  username: string;
  nickname: string;
}

/** API 함수 **/

// 1. 친구 요청 전송
export async function sendFriendRequest(receiveId: number) {
  const res = await authFetch('/api/v1/friends/request', {
    method: 'POST',
    body: JSON.stringify({ receive_id: receiveId }),
  });
  if (!res.ok) throw new Error('친구 요청 실패');
  return res.json();
}

// 받은 친구 요청 목록 조회
export async function getReceivedRequests() {
  const res = await authFetch('/api/v1/friends/request/received');
  if (!res.ok) throw new Error('받은 요청 조회 실패');
  return res.json(); // { data: ReceivedFriendRequest[] } 반환 가정
}

// 2. 친구 요청 수락 및 거절
// status 값은 "ACCEPTED" 또는 "REJECTED"만 가능
export async function updateFriendStatus(friendId: number, status: 'ACCEPTED' | 'REJECTED') {
  const res = await authFetch(`/api/v1/friends/request/${friendId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('친구 상태 변경 실패');
  return res.json();
}

// 4. 친구 목록 조회
export async function getFriends() {
  const res = await authFetch('/api/v1/friends');
  if (!res.ok) throw new Error('친구 목록 조회 실패');
  return res.json();
}

// 5. 친구 캘린더 조회
// 명세에 따라 month 쿼리 파라미터(예: 2025-03)를 포함할 수 있습니다.
export async function getFriendCalendar(friendId: number, month: string = '2025-03') {
  const res = await authFetch(`/api/v1/friends/${friendId}/calendar?month=${month}`);
  if (!res.ok) throw new Error('친구 캘린더 조회 실패');
  return res.json();
}

/** 유저 검색 API**/
export async function searchUsers(nickname: string) {
  // 쿼리 파라미터로 nickname 전달
  const res = await authFetch(`/api/v1/users/search?nickname=${encodeURIComponent(nickname)}`);
  if (!res.ok) throw new Error('유저 검색 실패');
  return res.json(); // { data: UserSearchResponse[] } 반환
}
