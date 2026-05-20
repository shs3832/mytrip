# 2026-05-20 오전 스터디 일지

## 작업 범위

오늘 오전에는 `homework17`을 중심으로 게시글 상세의 댓글 목록을 보완했다. `homework16`까지 만든 게시글 목록/상세/댓글 구조를 `src/components` 기준으로 정리하고, 댓글 목록에 무한스크롤을 붙였다. 이후 댓글 목록 아이템을 별도 컴포넌트로 분리하고, 개별 댓글에서 수정 버튼을 누르면 댓글 작성 컴포넌트를 수정 폼으로 재사용하도록 연결했다.

## 커밋 흐름

### 12:35 - homework17 무한스크롤, 댓글수정

- `homework17` 폴더를 추가하고 기존 게시글 목록, 상세, 등록, 수정 페이지 흐름을 이어받았다.
- 과제 경로 기준에 맞춰 `boards-list`, `boards-detail`, `boards-write` 관련 컴포넌트들을 `src/components` 하위로 정리했다.
- 과거 `homework11~16` route들이 아직 `src/commons/boards-*`를 import하던 문제를 `src/components/boards-*` 기준으로 맞췄다.
- `react-infinite-scroll-component`를 사용해 댓글 목록에 무한스크롤을 적용했다.
- 댓글 목록 첫 조회는 `useQuery(FetchBoardCommentsDocument)`로 처리하고, 추가 페이지는 `fetchMore`로 가져오도록 구성했다.
- `updateQuery`에서 기존 댓글 배열과 새로 받아온 댓글 배열을 합쳐 Apollo cache의 최종 댓글 목록을 다시 만들었다.
- `hasMore` state를 추가해 더 이상 받아올 댓글이 없을 때 `Loading...`이 계속 보이지 않도록 처리했다.
- 댓글 목록 전체 컴포넌트와 댓글 한 개를 보여주는 `comment-list-item` 컴포넌트를 분리했다.
- `BoardCommentItem` 안에서 `isCommentEdit` state를 사용해 일반 댓글 카드와 댓글 수정 폼을 조건부로 전환했다.
- 댓글 작성 컴포넌트인 `BoardCommentWrite`를 등록 모드와 수정 모드에서 함께 사용할 수 있도록 `isCommentEdit`, `setIsCommentEdit`, `el` props를 optional 구조로 정리했다.
- 수정 모드 진입 시 기존 댓글의 `contents`, `writer`, `rating`을 state에 초기 세팅해 input/textarea가 수정 가능한 controlled component로 동작하도록 만들었다.
- `updateBoardComment` mutation을 연결하고, 수정 성공 후 댓글 목록을 다시 조회해 화면에 반영하도록 했다.
- `FetchBoardCommentsQuery["fetchBoardComments"][number]` 형태로 generated GraphQL 타입에서 댓글 한 개의 타입을 뽑아 props 타입에 활용했다.
- `npx tsc --noEmit`으로 경로 정리와 props 타입 변경 이후 타입 체크를 통과시켰다.

## 확인한 개념

### 1. `fetchMore`

`fetchMore`는 처음 조회한 query와 같은 query를 사용해 다음 페이지 데이터를 추가로 가져오는 함수다.

```txt
useQuery = 첫 페이지 조회
fetchMore = 다음 페이지 추가 조회
updateQuery = 기존 결과와 새 결과를 합쳐 최종 data 모양 만들기
```

댓글 목록에서는 처음에 `page: 1`을 가져오고, 스크롤 끝에 닿으면 현재 댓글 개수를 기준으로 다음 page를 계산해 추가 요청한다.

### 2. `updateQuery`

`updateQuery`의 `prev`는 기존 Apollo query 결과이고, `fetchMoreResult`는 `fetchMore`로 새로 받아온 결과다.

```ts
fetchBoardComments: [
  ...prev.fetchBoardComments,
  ...fetchMoreResult.fetchBoardComments,
];
```

댓글 query의 결과 key는 `fetchBoardComments`이므로, 게시글 목록의 `fetchBoards`와 헷갈리면 타입 에러가 난다. Apollo cache에 다시 넣는 객체 모양은 원래 query 결과 모양과 같아야 한다.

### 3. 무한스크롤의 `hasMore`

`hasMore`는 라이브러리에게 "더 불러올 데이터가 남아 있는지" 알려주는 값이다.

```txt
hasMore true = 다음 스크롤에서 next 실행 가능
hasMore false = 더 이상 next를 부르지 않고 endMessage 표시
```

서버에서 새로 받아온 댓글 수가 한 페이지 기준인 10개보다 적으면 더 이상 다음 페이지가 없다고 판단할 수 있다.

### 4. 등록 폼과 수정 폼 재사용

`BoardCommentWrite`는 두 위치에서 쓰인다.

```txt
상세 페이지의 <BoardCommentWrite />
= 댓글 등록 모드

댓글 아이템 내부의 <BoardCommentWrite isCommentEdit setIsCommentEdit el />
= 댓글 수정 모드
```

따라서 props는 optional로 두고, `isCommentEdit`의 기본값을 `false`로 주면 등록/수정 두 경우를 한 컴포넌트에서 처리할 수 있다.

### 5. 기존 값을 수정 state에 넣기

수정 모드에서는 `el.contents`를 textarea에 바로 넣는 것보다, 처음 한 번 state로 복사하는 방식이 자연스럽다.

```txt
el.contents = 서버에서 받은 기존 값
contents = 사용자가 수정 중인 현재 값
```

수정 모드 진입 시:

```txt
el.contents -> contents state
el.rating -> rating state
```

그 뒤 textarea와 Rate는 state를 바라보게 해야 사용자가 값을 바꿀 수 있다.

### 6. generated GraphQL 타입 활용

서버에서 받은 댓글 한 개의 타입은 직접 새로 만들기보다 generated query 타입에서 뽑아 쓰는 편이 안전하다.

```ts
type BoardComment = FetchBoardCommentsQuery["fetchBoardComments"][number];
```

GraphQL query의 필드가 바뀌면 generated 타입도 함께 바뀌므로, props 타입이 서버 응답 구조와 따로 놀 가능성이 줄어든다.

### 7. `refetchQueries`와 variables

`refetchQueries: [FetchBoardCommentsDocument]`처럼 query 문서만 넘길 수도 있지만, `boardId`처럼 필수 변수가 있는 query는 variables까지 명시하는 편이 더 안전하다.

```ts
refetchQueries: [
  {
    query: FetchBoardCommentsDocument,
    variables: {
      page: 1,
      boardId: String(params.boardId),
    },
  },
];
```

이 방식은 "현재 게시글의 댓글 목록 1페이지를 다시 가져와라"는 뜻이 명확하다. 다만 무한스크롤로 여러 페이지를 불러온 뒤 1페이지를 refetch하면 화면이 다시 1페이지 기준으로 정리될 수 있다는 점도 확인했다.

## 오늘 마무리 개념 정리

오늘 작업은 단순한 댓글 목록 구현이 아니라, 여러 파일로 나뉜 React/Apollo 구조를 따라가는 연습이었다.

```txt
page.tsx = 화면 조립
comment-list = 댓글 목록과 무한스크롤
comment-list-item = 댓글 한 개와 수정 모드 전환
comment-write = 댓글 등록/수정 폼
hook.ts = state와 mutation 로직
queries.ts = GraphQL 문서
types.ts = props 타입
```

코드량이 늘어나면서 한 번에 전체를 이해하기 어려워졌지만, 흐름을 기능 단위로 끊어 보면 따라갈 수 있었다.

```txt
수정 버튼 클릭
→ isCommentEdit true
→ BoardCommentWrite로 전환
→ el 값을 state에 초기 세팅
→ updateBoardComment 실행
→ 댓글 목록 refetch
→ setIsCommentEdit(false)
```

오늘 가장 중요한 학습 포인트는 `fetchMore`와 `updateQuery`의 역할 분리, 그리고 등록/수정 폼을 하나의 컴포넌트로 재사용하기 위해 props를 optional하게 설계하는 방식이었다.

## 남은 점검 포인트

- `refetchQueries`에 `page`, `boardId` variables를 명시해 수정 후 댓글 목록 재조회 의도를 더 분명하게 만들기.
- 수정 모드에서 별점도 수정 가능하게 열어둘지, 내용만 수정 가능하게 둘지 결정하기.
- `FETCH_BOARD_COMMENTS_UPDATE` 같은 이름은 실제 역할에 맞게 `UPDATE_BOARD_COMMENT`로 바꾸면 더 읽기 쉽다.
- 무한스크롤로 여러 페이지를 불러온 상태에서 댓글을 수정했을 때, 1페이지 refetch로 목록이 줄어드는 UX를 이후 필요하면 cache update 방식으로 개선하기.
