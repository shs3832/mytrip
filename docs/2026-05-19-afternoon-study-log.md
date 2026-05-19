# 2026-05-19 오후 스터디 일지

## 작업 범위

오늘 오후에는 `homework14`부터 `homework16`까지 이어서 진행했다. 주소 검색과 유튜브 링크를 게시글 등록/수정/상세 흐름에 연결했고, 이후 공통 레이아웃 컴포넌트를 만들면서 `children`, `usePathname`, 조건부 배너 노출을 정리했다. 마지막으로 게시글 목록에 페이지네이션을 붙이며 `currentPage`, 페이지 묶음 시작값, 마지막 페이지, 역순 게시글 번호 계산을 실습했다.

## 커밋 흐름

### 13:18 - homework14 주소, 유튜브, 모달 기반 CRUD 보강

- `homework14` 폴더를 추가하고 기존 게시글 등록, 목록, 상세, 수정 흐름을 확장했다.
- `react-daum-postcode`를 사용해 우편번호 검색 모달을 구현했다.
- 주소 검색 완료 시 우편번호와 기본주소를 state에 저장하고, 상세주소는 사용자가 직접 입력하도록 구성했다.
- 주소 입력값은 `createBoard` mutation의 `boardAddress`에 포함해 전송하도록 GraphQL 문서를 보완했다.
- 수정 화면에서는 `fetchBoard`로 기존 주소, 상세주소, 유튜브 URL을 불러와 초기값으로 연결했다.
- `updateBoardInput`에는 수정된 값만 포함하기 위해 기존값과 현재 state를 비교했다.
- 주소 객체는 빈 객체를 바로 전송하지 않고, 실제 변경된 주소 필드가 있을 때만 `boardAddress`에 붙이는 방향을 정리했다.
- 유튜브 URL에서 영상 ID를 추출하는 `getYoutubeID` 흐름을 만들고, 상세 화면에서 `react-youtube`로 영상을 렌더링했다.
- `Tooltip`을 사용해 주소 아이콘에 마우스를 올렸을 때 주소를 보여주는 방식을 적용했다.
- 기존 `alert` 일부를 Ant Design `Modal.success`로 바꾸며 라이브러리 기반 알림 흐름을 시작했다.
- `globals.css`에 기본 reset과 Pretendard 계열 폰트 적용을 보완했다.
- codegen 문서와 generated document의 관계를 다시 확인하며 `gql` 원본문서, generated `graphql.ts`, operation name 중복 문제를 정리했다.

### 15:29 - homework15 공통 레이아웃, 네비게이션, 배너 구성

- `src/commons/layout` 경로에 공통 레이아웃 컴포넌트를 추가했다.
- `navigation/index.tsx`에서 로고, 메뉴, 사용자 아이콘이 있는 상단 내비게이션 UI를 작성했다.
- 기존 게시글 목록 배너를 `commons/layout/banner`로 옮기고, Swiper 기반 배너를 공통 레이아웃에서 사용할 수 있도록 정리했다.
- `src/commons/layout/index.tsx`에서 내비게이션, 배너, 본문 영역을 조립하는 `LayoutComponent`를 만들었다.
- `src/app/layout.tsx`에서 `LayoutComponent`로 `children`을 감싸도록 구조를 변경했다.
- `children`은 현재 URL에 따라 바뀌는 페이지 본문이고, 공통 레이아웃은 그 본문을 감싸는 틀이라는 개념을 정리했다.
- `usePathname()`을 사용해 현재 경로를 읽고, `/new`, `/edit`이 포함된 등록/수정 페이지에서는 배너를 숨기는 조건을 만들었다.
- 문자열 `includes`, 배열 `includes`, `some`의 차이를 확인했다.
- `some`은 배열 요소 중 하나라도 조건을 만족하면 `true`가 되는 방식이므로, 숨김 경로 패턴 검사에 적합하다는 점을 익혔다.
- Tailwind의 `border-b-2`, `border-transparent`, `border-gray-700`을 사용해 내비게이션 선택 상태를 표현하는 방향을 잡았다.

### 17:22 - homework16 페이지네이션 구현

- `homework16` 폴더를 추가하고 게시글 목록에 페이지네이션 컴포넌트를 붙였다.
- 게시글 목록을 `boards-list/list`, 페이지네이션을 `boards-list/pagination`으로 분리했다.
- `fetchBoardsCount` query를 추가하고 codegen 결과인 `FetchBoardsCountDocument`를 사용해 전체 게시글 수를 조회했다.
- 전체 게시글 수를 `totalCount`, 마지막 페이지를 `lastPage`로 계산했다.
- 페이지 번호 버튼을 누르면 `refetch({ page })`로 해당 페이지의 목록을 다시 가져오도록 연결했다.
- `currentPage`를 사용해 실제 선택된 페이지를 표시하고, 선택된 번호에 `text-blue-500` 스타일을 적용했다.
- `page`는 페이지 버튼 묶음의 시작 번호로 사용하고, `currentPage`는 실제 보고 있는 페이지 번호로 분리해서 이해했다.
- 이전/다음 버튼은 페이지 묶음을 10개 단위로 이동하도록 만들고, 첫 묶음과 마지막 묶음에서는 버튼을 제한하도록 처리했다.
- 페이지 번호는 `index + page <= lastPage` 조건으로 마지막 페이지까지만 렌더링되도록 했다.
- 게시글 번호는 전체 게시글 수 기준 역순으로 보이도록 `totalCount - (currentPage - 1) * 10 - index` 공식을 적용했다.
- pagination props 타입은 `Pick`을 사용해 목록 컴포넌트 props 중 필요한 값만 고르는 방식으로 분리했다.

## 확인한 개념

- `gql` 문서는 codegen의 원본이므로 함부로 지우면 generated document가 사라질 수 있다.
- codegen이 보는 이름은 JavaScript 변수명이 아니라 GraphQL operation 이름이다.
- `boardAddress: {}`처럼 빈 객체도 서버에는 값으로 전달되므로, 수정된 필드가 있을 때만 객체를 붙이는 편이 안전하다.
- `??`는 `null` 또는 `undefined`일 때만 기본값을 적용한다.
- `||`는 하나라도 참이면 전체 조건이 참이 되는 OR 조건에 사용된다.
- `&&`는 앞 조건이 참일 때만 뒤 JSX나 함수를 실행할 때 자주 쓴다.
- `children`은 현재 라우트의 페이지 본문이고, 공통 레이아웃은 그 본문을 감싸는 구조다.
- `usePathname()`은 도메인을 제외한 pathname만 반환한다.
- 문자열 `includes`는 부분 문자열 포함 여부를 보고, 배열 `includes`는 배열 안에 정확히 같은 요소가 있는지 본다.
- `some`은 배열 요소 중 하나라도 조건을 만족하는지 검사할 때 쓴다.
- 페이지네이션에서는 `totalCount`, `lastPage`, `currentPage`, 페이지 묶음 시작값을 구분해야 한다.
- 게시글 역순 번호는 "전체 게시글 수 - 이전 페이지에서 이미 보여준 글 수 - 현재 줄 index"로 계산할 수 있다.
- `Pick`은 기존 props 타입 중 일부만 골라 자식 컴포넌트의 props 타입을 만들 때 유용하다.
- `interface`는 객체 모양을 직접 설명할 때, `type`은 `Pick`, `Omit`, union 같은 타입 조합에 자주 사용된다.

## 정리한 코드 품질

- 주소, 유튜브, 게시글 상세 조회 필드를 GraphQL 문서와 generated document 흐름에 맞춰 확장했다.
- 공통 레이아웃을 `commons/layout`으로 분리해 `app/layout.tsx`가 더 간결해졌다.
- 등록/수정 페이지에서 배너를 숨기는 책임을 레이아웃 hook으로 분리했다.
- 페이지네이션을 목록 컴포넌트에서 분리하고, 필요한 props만 전달하는 구조로 정리했다.
- `totalPages`처럼 의미가 헷갈리는 이름을 `totalCount`로 바꾸며 값의 의미를 더 분명히 했다.
- 선택된 페이지와 페이지 묶음 시작값을 분리해 페이지네이션 상태를 더 명확히 다뤘다.

## 페이지네이션 상태 설계 샘플

페이지네이션에서 헷갈리기 쉬운 값은 아래 네 가지다.

```txt
totalCount = 전체 게시글 수
lastPage = 마지막 페이지 번호
currentPage = 실제 보고 있는 페이지
startPage = 현재 화면에 보이는 페이지 버튼 묶음의 시작 번호
```

예를 들어 전체 게시글 수가 123개이고, 한 페이지에 10개씩 보여준다면 마지막 페이지는 13이다.

```ts
const totalCount = count?.fetchBoardsCount ?? 0;
const lastPage = Math.ceil(totalCount / 10);
```

`currentPage`는 사용자가 실제로 보고 있는 페이지다. 1페이지를 보고 있으면 1, 7페이지를 보고 있으면 7, 12페이지를 보고 있으면 12다.

```ts
const [currentPage, setCurrentPage] = useState(1);
```

`startPage`는 페이지 버튼 묶음의 시작 번호다. 페이지 버튼을 10개씩 보여준다면 1~10 묶음에서는 1, 11~20 묶음에서는 11이 된다.

```ts
const startPage = Math.floor((currentPage - 1) / 10) * 10 + 1;
```

계산 예시는 아래와 같다.

```txt
currentPage = 1  -> startPage = 1
currentPage = 7  -> startPage = 1
currentPage = 10 -> startPage = 1
currentPage = 11 -> startPage = 11
currentPage = 18 -> startPage = 11
```

페이지 번호 버튼은 `startPage`를 기준으로 만든다.

```tsx
const paginationArray = new Array(10).fill(0);

{paginationArray.map((_, index) => {
  const pageNumber = startPage + index;

  return (
    pageNumber <= lastPage && (
      <button
        key={pageNumber}
        className={currentPage === pageNumber ? "text-blue-500" : ""}
        onClick={() => {
          setCurrentPage(pageNumber);
          refetch({ page: pageNumber });
        }}
      >
        {pageNumber}
      </button>
    )
  );
})}
```

여기서 `pageNumber <= lastPage` 조건은 마지막 페이지 이후의 버튼을 숨기기 위한 조건이다. 예를 들어 마지막 페이지가 13이면 11, 12, 13까지만 보이고 14~20은 렌더링하지 않는다.

이전/다음 묶음 버튼은 `currentPage`를 10개 단위로 이동시키면 된다.

```ts
const handlePrevBtn = () => {
  if (startPage === 1) return;

  const prevPage = startPage - 10;
  setCurrentPage(prevPage);
  refetch({ page: prevPage });
};

const handleNextBtn = () => {
  if (startPage + 10 > lastPage) return;

  const nextPage = startPage + 10;
  setCurrentPage(nextPage);
  refetch({ page: nextPage });
};
```

버튼 비활성화 조건은 아래처럼 볼 수 있다.

```tsx
<button disabled={startPage === 1}>이전</button>
<button disabled={startPage + 10 > lastPage}>다음</button>
```

게시글 번호를 전체 게시글 수 기준으로 역순 표시하려면 `totalCount`, `currentPage`, 현재 줄의 `index`를 사용한다.

```tsx
const boardNumber = totalCount - (currentPage - 1) * 10 - index;
```

공식의 의미는 아래와 같다.

```txt
전체 게시글 수
- 이전 페이지들에서 이미 보여준 게시글 수
- 현재 페이지 안에서 몇 번째 줄인지
```

예를 들어 전체 게시글이 123개라면:

```txt
1페이지 첫 번째 줄 = 123 - (1 - 1) * 10 - 0 = 123
1페이지 두 번째 줄 = 123 - (1 - 1) * 10 - 1 = 122
2페이지 첫 번째 줄 = 123 - (2 - 1) * 10 - 0 = 113
3페이지 첫 번째 줄 = 123 - (3 - 1) * 10 - 0 = 103
```

현재 코드처럼 `page`를 페이지 버튼 묶음 시작 번호로 두고, `currentPage`를 실제 선택 페이지로 두는 방식도 가능하다. 다만 장기적으로는 `currentPage`만 state로 두고 `startPage`는 계산값으로 만드는 방식이 더 단순하다.

```txt
state로 관리할 값 = currentPage
계산해서 얻을 값 = startPage, lastPage, boardNumber
```

## 남은 점검 포인트

- 과거 homework 폴더들은 공통 컴포넌트 변경의 영향을 계속 받을 수 있으므로, 실제 과제 진행 기준과 타입 체크 범위를 분리해서 볼 필요가 있다.
- `homework14`의 alert 모달화는 일부 남아 있을 수 있으므로 `alert(` 검색으로 마지막 정리가 필요하다.
- `homework15` 내비게이션은 모든 메뉴가 실제 경로를 갖고 선택 상태가 동적으로 계산되도록 확장할 수 있다.
- `homework16` 페이지네이션은 이후 `hook.ts`, `queries.ts`, `types.ts`를 pagination 폴더 기준으로 더 명확히 나누면 과제 형식에 더 잘 맞는다.
- 페이지네이션 state는 현재 구조로도 동작하지만, 장기적으로는 `currentPage` 하나를 기준으로 `startPage`를 계산값으로 두는 방식이 더 단순할 수 있다.
