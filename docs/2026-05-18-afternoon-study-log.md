# 2026-05-18 오후 스터디 일지

## 작업 범위

오늘 오후에는 GraphQL 게시판 과제를 `homework10`에서 `homework12`까지 확장했다. 오전에 만든 등록, 상세, 목록, 삭제 흐름 위에 게시글 수정 기능을 추가했고, 이후 컴포넌트를 `hook`, `index`, `queries`, `types` 단위로 나누는 리팩토링을 진행했다. 마지막으로 게시글 상세 화면에 댓글 등록과 댓글 목록 조회 기능을 붙이며 mutation 이후 refetch, controlled input 초기화, 이벤트 버블링 처리까지 실습했다.

## 커밋 흐름

### 14:16 - homework10 게시판 수정 및 등록 기능 구현

- `homework10/boards/[boardId]/edit/page.tsx`를 추가해 게시글 수정 페이지를 만들었다.
- `src/commons/boards-write/index.tsx`를 만들어 게시글 등록 화면과 수정 화면에서 같은 컴포넌트를 재사용하도록 구성했다.
- 수정 페이지에서는 `useParams()`로 `boardId`를 꺼내고 `fetchBoard`로 기존 작성자, 제목, 내용을 불러왔다.
- 비동기 query 결과가 첫 렌더링에는 없을 수 있으므로 `useEffect`에서 `data?.fetchBoard`를 확인한 뒤 state에 초기값을 채웠다.
- 작성자와 비밀번호 input은 수정 화면에서 `disabled` 처리했다.
- 제목과 내용은 기존값과 현재 입력값을 비교해, 실제로 바뀐 값만 `updateBoardInput`에 포함시키는 방식을 연습했다.
- 수정 요청 전 `prompt`로 비밀번호를 입력받고, `ApolloError`의 `graphQLErrors`를 확인하는 흐름을 다뤘다.
- Tailwind `disabled:` 스타일이 적용되려면 `tailwind.config.ts`의 `content`에 `src/commons` 경로도 포함되어야 한다는 점을 확인했다.

### 15:32 - homework11 컴포넌트 분리, codegen 타입 적용

- 게시글 작성/수정, 게시글 상세, 게시글 목록 기능을 컴포넌트와 커스텀 훅으로 분리했다.
- `boards-write`, `board-detail`, `board-list` 계열 폴더에 `hook.ts`, `index.tsx`, `queries.ts`, `types.ts`, `styles.module.css`를 나누는 구조를 연습했다.
- `graphql-codegen`을 설치하고 `codegen.ts`를 추가해 GraphQL 스키마 기반 타입과 document를 생성했다.
- `CreateBoardDocument`, `UpdateBoardDocument`, `FetchBoardDocument`, `FetchBoardsDocument`, `DeleteBoardDocument`처럼 codegen 결과물을 `useQuery`, `useMutation`에 적용했다.
- props 타입은 컴포넌트가 부모에게서 받는 값의 설명서로 이해했다.
- `data`는 `FetchBoardQuery`, `FetchBoardsQuery`처럼 codegen이 만든 query 타입을 사용하고, 첫 렌더링에 없을 수 있으므로 optional 처리했다.
- 함수 props는 인자와 반환값을 기준으로 `() => void`, `(id: string) => void`, `Promise<void>` 같은 형태로 표현하는 방식을 익혔다.
- GraphQL custom scalar인 `DateTime`이 codegen에서 `unknown`으로 잡히는 경우, 화면에서 사용할 때 `String(value)`처럼 변환이 필요하다는 점을 확인했다.

### 18:14 - homework12 댓글 컴포넌트 작업 및 기능별 분리

- 게시글 목록에서 행 전체를 클릭하면 상세 페이지로 이동하고, 삭제 버튼 클릭은 `event.stopPropagation()`으로 상위 클릭 이벤트가 실행되지 않도록 처리했다.
- 게시글 상세 화면을 게시글 본문, 댓글 등록, 댓글 목록 컴포넌트로 나누는 구조를 만들었다.
- 댓글 등록에서는 `createBoardComment` mutation을 사용하고, `boardId`와 `createBoardCommentInput`을 variables로 전달했다.
- GraphQL 문법에서 `createBoardComment($createBoardCommentInput)`처럼 변수만 넣는 것이 아니라, `createBoardCommentInput: $createBoardCommentInput`처럼 서버 인자 이름과 변수 이름을 매칭해야 한다는 점을 정리했다.
- 댓글 등록 후 `refetchQueries`에 `FetchBoardCommentsDocument`와 variables를 명시해 댓글 목록을 다시 조회하도록 구성했다.
- 댓글 작성 컴포넌트에서는 목록 `data`를 직접 사용하지 않으므로 `useQuery`를 제거하고, 댓글 목록 컴포넌트에서만 `useQuery`로 데이터를 조회하는 역할 분리를 적용했다.
- 댓글 등록 성공 후 `setWriter("")`, `setPassword("")`, `setContents("")`로 state를 초기화하고, input과 textarea에 `value`를 연결해 화면도 함께 비워지도록 했다.
- 댓글 목록은 `fetchBoardComments` 결과를 `map`으로 렌더링하고, 댓글이 없을 때만 빈 상태 문구를 보여주도록 수정했다.
- `console.log("list" + data)`처럼 문자열 덧셈으로 배열을 찍으면 구조가 보이지 않는다는 점을 확인하고, `console.log("list", data)` 형태가 더 적절하다는 점을 배웠다.

## 확인한 개념

- React state는 `setState` 직후 즉시 바뀌는 것이 아니라 다음 렌더링에 반영된다. 따라서 `onChange` 안에서 방금 입력한 값을 비교할 때는 기존 state보다 `event.target.value`를 기준으로 삼는 것이 안전하다.
- `controlled input`은 input의 `value`를 React state와 연결한 형태다. 등록 후 state를 빈 문자열로 바꾸면 화면 input도 같이 비워진다.
- `useQuery`는 데이터를 조회하고 화면에 사용하는 컴포넌트에 두는 것이 자연스럽고, mutation 후 갱신만 필요하면 `refetchQueries`로 해당 query를 다시 실행시킬 수 있다.
- `refetchQueries`에 variables를 명시하면 어떤 게시글의 댓글 목록을 다시 가져오는지 더 분명해진다.
- `&&`는 모든 조건이 참이어야 참이고, `||`는 하나라도 참이면 참이다.
- 필수값 검사는 "모두 있으면 등록"으로 쓰면 `writer && password && contents`, "하나라도 없으면 중단"으로 쓰면 `!writer || !password || !contents`가 된다.
- boolean 이름은 의미와 true/false 값이 일치해야 한다. 예를 들어 `isWriterEmpty`라면 입력값이 비어 있을 때 `true`가 되는 편이 읽기 쉽다.
- `String`과 `string`은 다르다. TypeScript에서 일반 문자열 타입은 소문자 `string`을 사용해야 한다.
- `unknown`은 TypeScript가 아직 어떤 값인지 모른다는 뜻이므로, 사용 전에 변환하거나 타입을 좁혀야 한다.
- 커스텀 훅 분리는 작은 파일에서는 번거로워 보일 수 있지만, 상태, 이벤트, GraphQL 요청, 화면 JSX가 커질수록 역할 분리에 도움이 된다.

## 정리한 코드 품질

- 프로젝트 안에 퍼져 있던 디버깅용 `console.log`를 제거했다.
- 로그에만 사용되던 mutation 결과 변수는 `await mutation(...)` 형태로 정리했다.
- `src` 안 일반 코드 기준으로 `console.log`가 더 이상 검색되지 않는 상태를 확인했다.

## 남은 점검 포인트

- `homework9`, `homework10`의 예전 목록 페이지에는 아직 `id`, `el`, `index` implicit any 타입 에러가 남아 있다.
- `src/commons/boards-detail/detail/types.ts`의 GraphQL 타입 import 경로는 `@/commons/graphql/graphql`처럼 현재 폴더 구조에 맞게 정리해야 한다.
- 댓글 등록 검증은 `isEmpty` 상태보다 실제 요청 값인 `writer`, `password`, `contents`를 기준으로 막는 방식이 더 단순하고 안전할 수 있다.
- 별점 SVG가 댓글 작성과 목록에 반복되므로, 이후에는 별점 표시 컴포넌트로 분리하면 JSX 가독성이 좋아질 수 있다.
- codegen 문서를 바로 import하면 `queries.ts`의 실질 필요성은 줄어든다. 다만 과제 요구상 `queries.ts`를 두는 경우에는 generated document를 re-export하는 식으로 역할을 맞출 수 있다.
