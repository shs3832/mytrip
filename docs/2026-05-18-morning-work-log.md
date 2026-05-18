# 2026-05-18 오전 작업 일지

## 작업 범위

오늘 오전에는 GraphQL 게시판 과제를 `homework7`에서 `homework9`까지 단계적으로 확장했다. 흐름은 게시글 등록에서 시작해, 등록 후 상세 페이지 이동, 동적 라우트 조회, 목록 조회, 삭제 후 목록 갱신까지 이어졌다.

## 커밋 흐름

### 10:13 - homework7 아폴로세팅, 등록 커밋

- `src/commons/settings/apollo-setting.tsx`를 추가해 Apollo Client와 `ApolloProvider`를 설정했다.
- `src/app/layout.tsx`에서 전체 앱을 Apollo 설정으로 감싸 GraphQL 통신 기반을 만들었다.
- `homework7/boards/new/page.tsx`에서 `createBoard` mutation으로 게시글 등록 기능을 구현했다.
- GraphQL 변수는 `$writer`, `$password`, `$title`, `$contents`처럼 선언하고, `useMutation` 실행 시 `variables`로 전달하는 흐름을 익혔다.

### 10:52 - homework8 게시글 등록 및 조회 기능 구현

- `homework8/boards/new/page.tsx`에서 게시글 등록 성공 후 생성된 `_id`를 사용해 상세 페이지로 이동하도록 연결했다.
- `homework8/boards/[boardId]/page.tsx`를 추가해 동적 라우트 기반의 상세 페이지를 만들었다.
- `useParams()`로 URL의 `boardId`를 꺼내고, `fetchBoard` query의 변수로 전달해 게시글을 조회했다.
- 데이터 로딩 전 `undefined` 접근 문제를 막기 위해 `data?.fetchBoard?.title`처럼 optional chaining을 적용했다.
- `router.push`, `replace`, `pathname`, `asPath`의 차이를 정리하면서 라우팅 개념을 복습했다.

### 11:52 - homework9 게시글 등록 및 조회 기능 구현

- `homework9/boards/page.tsx`를 추가해 `fetchBoards` 기반 게시글 목록 페이지를 구현했다.
- 목록의 번호는 API 값이 아니라 `map`의 `index + 1`로 표시했다.
- 제목 클릭 시 해당 게시글의 상세 페이지로 이동하도록 `router.push`를 연결했다.
- `deleteBoard` mutation을 추가하고, 삭제 후 `refetchQueries: [FETCH_BOARDS]`로 목록을 다시 불러오도록 구성했다.
- Tailwind에서 `group`과 `group-hover`를 사용해 행에 hover했을 때 삭제 버튼이 보이도록 만들었다.
- 테이블 행 간격과 둥근 모서리 처리 방식도 확인했다. `tr` 자체보다 `td` 또는 `div` 기반 레이아웃에서 radius를 다루는 편이 안정적이라는 점을 정리했다.

## 확인한 개념

- GraphQL에서 객체 반환 타입은 반드시 받고 싶은 필드를 선택해야 한다.
- `fetchBoardsCount`처럼 `Int`를 반환하는 API는 하위 필드 선택 없이 바로 호출할 수 있다.
- `refetchQueries`는 mutation 이후 캐시/목록 화면을 다시 맞추는 간단한 방법이다.
- 현재 코드처럼 `useQuery(FETCH_BOARDS, { variables: { page: 1 } })`가 활성화되어 있으면 삭제 후에도 1페이지 목록을 다시 가져오는 흐름으로 이해할 수 있다.
- Next.js App Router에서는 폴더 구조가 URL 구조가 된다.
- `[boardId]` 폴더는 URL의 해당 위치에 들어온 값을 동적 파라미터로 받는 자리다.

## 남은 점검 포인트

- `homework9/boards/page.tsx`의 `id`, `el`, `index`는 명시 타입을 붙이면 TypeScript strict 모드에서 더 안전하다.
- 상세 이동 경로는 상대경로보다 `/homework9/boards/${id}`처럼 절대경로로 적는 편이 덜 헷갈린다.
- 삭제 요청은 실제 서버 데이터를 바꾸므로, 테스트할 때는 삭제 대상이 맞는지 한 번 더 확인하는 습관이 필요하다.
