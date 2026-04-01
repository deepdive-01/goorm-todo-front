### 캘린더 기반 할 일 관리 서비스

캘린더 기반의 할 일을 관리하는 웹 서비스의 프론트엔드 애플리케이션입니다.  
사용자는 회원가입 및 로그인 후 자신의 할 일을 날짜별로 관리할 수 있으며, 친구와 캘린더를 공유하고 명언 기능도 함께 이용할 수 있습니다. 백엔드 서버와 RESTful API 통신을 통해 주요 기능을 제공합니다.


### 진행 기간
2026.03.18. ~ 2026.04.01.


### 프로젝트 목표
- 컴포넌트 기반 UI 설계 및 재사용 가능한 구조 구성
- 페이지 단위 라우팅 및 사용자 흐름 중심의 화면 구성
- JWT 기반 인증 흐름을 고려한 로그인 상태 관리 구현
- 백엔드 API 명세서를 기반으로 기능별 화면 및 통신 로직 구현
- 일정/할 일 데이터를 캘린더 UI와 연동하여 직관적으로 시각화
- 배포 가능한 프론트엔드 환경 구성


### 사용 기술
- TypeScript
- React
- Axios
- React Router
- Tailwind CSS
- AWS Amplify



### 파일 구조
```bash
goorm-todo-front/
└── src/
    ├── api/          # axios 인스턴스 및 API 요청 함수
    ├── assets/       # 이미지, 아이콘 등 정적 리소스
    ├── components/   # 재사용 가능한 UI 컴포넌트
    ├── pages/        # 라우팅 단위 페이지 컴포넌트
    ├── utils/        # 인증 토큰 관리 및 공통 fetch 로직
    ├── App.tsx       # 라우터 및 전체 레이아웃 설정
    ├── main.tsx      # React 앱 엔트리 포인트
    └── index.css     # 글로벌 스타일
```


### 주요 화면
- 로그인 / 회원가입 페이지
<img width="380" height="908" alt="스크린샷 2026-04-02 001113" src="https://github.com/user-attachments/assets/5cd184ac-f19e-49ab-84d5-a73f0067621f" />
<img width="384" height="902" alt="스크린샷 2026-04-02 001122" src="https://github.com/user-attachments/assets/0ef7706f-4f09-42fd-8f4f-2e6d572e2048" />


- 메인 캘린더 페이지
<img width="375" height="902" alt="image" src="https://github.com/user-attachments/assets/e6ae3671-f92b-4f2c-bcf3-cd201f623e8d" />


- 할 일 생성 / 수정 / 조회 UI
<img width="364" height="896" alt="image" src="https://github.com/user-attachments/assets/be8e81f7-6a1d-4f10-adc3-940d9d6e0866" />
<img width="363" height="905" alt="image" src="https://github.com/user-attachments/assets/068dab64-03b1-44fe-9ff2-72e32a618dc3" />
<img width="372" height="908" alt="image" src="https://github.com/user-attachments/assets/73cc96c2-9e59-49bf-9019-f03c718fa9fb" />


- 친구 검색 및 친구 요청 화면
<img width="386" height="907" alt="image" src="https://github.com/user-attachments/assets/a6a02e11-b593-4895-b2f8-2b7d94324791" />
<img width="370" height="901" alt="image" src="https://github.com/user-attachments/assets/95466135-baed-4483-83b0-03e0f4bc3e18" />
<img width="423" height="910" alt="image" src="https://github.com/user-attachments/assets/cf13f7f7-3a98-495e-ac4a-5d94003acdc9" />


- 받은 친구 요청 및 친구 목록 화면
<img width="687" height="911" alt="image" src="https://github.com/user-attachments/assets/91779771-eca4-4c06-9180-1bdaff8ff569" />


- 친구 캘린더 조회 화면
<img width="361" height="896" alt="image" src="https://github.com/user-attachments/assets/81c49369-2478-43f2-b7ed-717b582bd241" />


- 랜덤 명언 조회 UI
<img width="374" height="908" alt="image" src="https://github.com/user-attachments/assets/98a47607-82a8-4373-b8e0-e019b95939a2" />



### 주요 기능

**인증/유저**
- 회원가입 및 로그인
- JWT 토큰 기반 인증 처리
- 로그인 상태 유지
- 닉네임 기반 유저 검색

**할 일**
- 날짜별 할 일 목록 조회
- 할 일 생성
- 할 일 수정
- 완료 여부 체크
- 할 일 삭제

**친구**
- 친구 요청 전송
- 친구 요청 수락/거절
- 받은 친구 요청 목록 조회
- 친구 목록 조회
- 친구 캘린더 조회
- 친구 삭제

**명언**
- 랜덤 명언 조회


### 배포
프론트엔드 애플리케이션은 백엔드 서버와 연동하여 동작하도록 구성하였으며,  
환경 변수를 통해 API 서버 주소를 분리하여 관리하였습니다.

```bash
VITE_API_BASE_URL=백엔드_서버_주소
```
