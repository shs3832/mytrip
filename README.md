# MyTrip

개인 학습과 과제 수행을 위한 여행 플랫폼 연습 프로젝트입니다.

강의에서 배운 React, Next.js, TypeScript, GraphQL, 폼 처리, 상태 관리, 배포 흐름을 실제 화면과 기능으로 연결해보는 것을 목표로 합니다. 완성형 서비스라기보다, 기능을 하나씩 구현하면서 프론트엔드 개발 흐름을 익히는 실습 프로젝트입니다.

## 진행 방식

- 구현한 기능과 배운 내용은 `docs/` 폴더에 과제별로 정리합니다.
- 현재는 GraphQL 게시판 CRUD, 댓글, 공통 레이아웃, 페이지네이션, 주소 검색, 유튜브 임베드까지 단계적으로 확장하고 있습니다.
- 문제를 만났을 때 원인을 분석하고, AI와 함께 해결 방향을 비교하며 학습 기록을 남깁니다.
- 처음부터 완벽한 구조를 만들기보다, 직접 구현한 뒤 필요한 시점에 리팩토링합니다.

## 실행 스크립트

- `npm run dev`: 개발 서버를 실행합니다.
- `npm run build`: 프로덕션 빌드를 생성합니다.
- `npm run start`: 빌드된 앱을 실행합니다.
- `npm run lint`: Next.js lint 검사를 실행합니다.
- `npm run codegen`: `codegen.ts` 설정을 기준으로 GraphQL schema와 gql 문서를 읽어 typed document와 타입을 생성합니다.

## 주요 기술 스택

### Core

- `next`: App Router 기반의 React 프레임워크입니다. 페이지 라우팅, 서버/클라이언트 컴포넌트, 배포 구조 학습에 사용합니다.
- `react`, `react-dom`: UI 컴포넌트 작성과 상태 기반 렌더링에 사용합니다.
- `typescript`: 타입 안정성을 높이고, props/state/API 응답 구조를 명확하게 관리하기 위해 사용합니다.

### Styling / UI

- `tailwindcss`: 유틸리티 클래스 기반 스타일링에 사용합니다.
- `antd`, `@ant-design/icons`: 모달, 툴팁, 별점, 버튼, 아이콘 등 빠른 UI 구현과 실습에 사용합니다.
- `@codecamp2/ui`, `codecamp-ui`: 강의에서 제공하는 공통 UI 패키지 실습에 사용합니다.
- `swiper`: 게시글 목록과 공통 레이아웃의 이미지 배너 캐러셀 구현에 사용합니다.

### Form / Validation

- `react-hook-form`: 폼 입력값 관리와 submit 처리에 사용합니다.
- `zod`: 입력값 검증 schema 작성에 사용합니다.
- `@hookform/resolvers`: `react-hook-form`과 `zod`를 연결하는 데 사용합니다.

### Data / API

- `@apollo/client`: GraphQL query/mutation, Apollo cache, 인증 헤더 처리 실습에 사용합니다.
- `graphql`: GraphQL 문법과 Apollo Client 동작에 필요한 기본 패키지입니다.
- `@graphql-codegen/cli`: GraphQL schema와 gql 문서 기반으로 TypeScript 타입과 typed document를 생성합니다.
- `graphql-request`: 가벼운 GraphQL 요청이 필요할 때 사용할 수 있습니다.
- `apollo-upload-client`: GraphQL 파일 업로드 실습에 사용합니다.
- `zen-observable`: Apollo 관련 Observable 의존성 대응에 사용합니다.

### State / Utility

- `zustand`: 전역 상태 관리 실습에 사용합니다.
- `lodash`: 데이터 가공과 유틸 함수가 필요할 때 사용할 수 있습니다.
- `uuid`: 고유 ID 생성이 필요한 기능에서 사용할 수 있습니다.

### Feature Libraries

- `react-daum-postcode`: 게시글 등록/수정의 우편번호와 주소 검색 기능 구현에 사용합니다.
- `react-youtube`: 게시글 상세 화면에서 유튜브 영상을 임베드하는 데 사용합니다.
- `react-quill`: 웹 에디터 구현에 사용합니다.
- `dompurify`: 에디터 HTML 출력 시 XSS 방어를 위해 사용합니다.
- `react-infinite-scroll-component`: 무한 스크롤 UI 구현에 사용합니다.
- `@portone/browser-sdk`: 결제 기능 실습에 사용합니다.
- `firebase`: 파일 저장, 인증, 실시간 기능 등 Firebase 연동 실습에 사용할 수 있습니다.

## 현재 학습 범위

- GraphQL 게시판: `createBoard`, `fetchBoard`, `fetchBoards`, `updateBoard`, `deleteBoard` 흐름을 Apollo Client와 함께 실습합니다.
- 댓글 기능: 댓글 등록, 댓글 목록 조회, 등록 후 `refetchQueries`, 별점 UI, 필수 입력 UX를 다룹니다.
- GraphQL Codegen: 직접 작성한 gql 문서를 기준으로 generated document를 만들고 `useQuery`, `useMutation`에 연결합니다.
- 공통 레이아웃: `children`, `usePathname`, 네비게이션, 배너 노출 조건을 학습합니다.
- 페이지네이션: 전체 게시글 수, 마지막 페이지, 현재 페이지, 페이지 버튼 묶음 상태를 분리해서 관리합니다.
- 외부 기능: Daum 주소 검색, Ant Design 모달/툴팁/별점, Swiper 배너, YouTube 임베드를 실습합니다.

## 문서 기록

과제별 구현 내용, 시행착오, 리팩토링 후보는 `docs/` 폴더에 정리합니다. 날짜별 학습 로그를 함께 남겨, 커밋 흐름과 그날 배운 개념을 다시 확인할 수 있도록 합니다.

## 목표

- 강의에서 배운 개념을 여행 플랫폼 과제에 적용합니다.
- Tailwind CSS와 컴포넌트 기반 마크업에 익숙해집니다.
- 기능 구현 후 반복되는 코드를 리팩토링합니다.
- AI와 함께 오류 원인, 구현 방향, 리팩토링 기준을 점검하며 학습합니다.
