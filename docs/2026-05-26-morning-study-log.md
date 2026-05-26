# 2026-05-26 오전 스터디 일지

## 작업 범위

오늘 오전에는 `homework21` 게시글 목록 검색 과제를 중심으로 진행했다. `homework20`까지 만들어 둔 게시글 목록 구조를 바탕으로, 게시글 목록을 목록/페이지네이션/검색 컴포넌트로 나누고 검색어, 날짜 범위, 페이지네이션이 함께 동작하는 흐름을 점검했다.

이번 과제는 단순히 input 값을 하나 추가하는 수준이 아니라, 검색 조건이 목록 조회와 count 조회, 페이지 이동, 검색어 하이라이트에 모두 영향을 주는 구조였다. 그래서 "검색어를 어디에 저장할지", "디바운스 안에서 최신 값을 어떻게 볼지", "검색 결과에서 페이지를 이동해도 조건이 유지되는지"를 중심으로 학습했다.

## 진행한 작업

### 1. 검색 컴포넌트 분리

- `src/components/boards-list/search/index.tsx`를 새로 만들고, 검색 UI를 목록 컴포넌트 바깥으로 분리했다.
- 검색 컴포넌트에는 `RangePicker`, 검색어 `Input`, 검색 `Button`을 배치했다.
- 검색 컴포넌트는 직접 GraphQL 요청을 실행하지 않고, 상위 hook에서 받은 핸들러만 호출하도록 구성했다.

```tsx
<RangePicker className="w-full" onChange={onRangeChange} />
<Input
  placeholder="제목을 검색해 주세요"
  onChange={handleChangeSearchInput}
  className="ml-3"
/>
<Button
  className="ml-3"
  type="primary"
  icon={<SearchOutlined />}
  onClick={handleSearch}
>
  검색
</Button>
```

- 이 구조를 통해 검색 UI는 화면 역할, `useBoardList` hook은 데이터 요청과 상태 관리 역할을 맡도록 분리했다.

### 2. 검색 props 흐름 확인

- `useBoardList`에서 검색 관련 값과 함수를 만들고, `homework21/boards/page.tsx`에서 `BoardListComponent`로 전달했다.
- `BoardListComponent`는 다시 `BoardSearchComponent`에 검색 핸들러를 전달했다.

```txt
useBoardList
→ homework21/boards/page.tsx
→ BoardListComponent
→ BoardSearchComponent
```

- 처음에는 `handleChangeSearchInput`, `handleSearch`가 props로 제대로 흐르는지 점검했다.
- `homework21` 기준으로는 props 이름과 타입 흐름이 맞았다.
- 다만 공통 `IBoardListProps`에 검색 관련 필수 props가 추가되면서, 과거 `homework13`부터 `homework20` 페이지들은 타입 에러가 발생했다.
- 이번 점검에서는 `homework21` 과제 기준으로만 타입 흐름을 보았다.

### 3. 검색어 상태와 디바운스 이해

- 검색어 입력 시 `search` state를 업데이트하고, lodash `debounce`를 이용해 0.5초 뒤 검색 요청이 실행되도록 구성했다.
- 처음에는 `setSearch(event.target.value)` 직후 `search`를 사용하면 최신값이라고 생각하기 쉬웠지만, React state는 다음 렌더에서 반영되므로 바로 아래 줄에서는 이전 값일 수 있다는 점을 확인했다.
- 그래서 이벤트에서 바로 꺼낸 `keyword`를 디바운스 함수에 직접 넘기는 구조로 이해했다.

```ts
const handleChangeSearchInput = (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  const keyword = event.target.value;
  setSearch(keyword);
  debounce(keyword);
  setPage(1);
  setCurrentPage(1);
};
```

- 이 흐름의 핵심은 아래와 같다.

```txt
검색어 최신값 = event.target.value
화면 상태 저장 = setSearch(keyword)
실제 검색 요청 = debounce(keyword)
```

### 4. `useMemo`와 debounce 의존성

- `_.debounce(...)`는 debounced 함수를 새로 만들어 반환한다.
- 따라서 렌더마다 새로 만들면 이전 타이머를 취소하고 마지막 입력만 실행하는 디바운스의 장점이 흐려질 수 있다.
- 이를 막기 위해 `useMemo`로 debounced 함수를 기억시키는 방식을 확인했다.

```ts
const debounce = useMemo(
  () =>
    _.debounce(async (keyword: string) => {
      const date = {
        startDate,
        endDate,
      };

      await refetch({
        page: 1,
        search: keyword,
        ...date,
      });

      await refetchCount({
        search: keyword,
        ...date,
      });
    }, 500),
  [refetch, refetchCount, startDate, endDate],
);
```

- `useCallback`과 `useMemo`의 차이도 함께 정리했다.
- 일반 이벤트 핸들러를 기억할 때는 `useCallback`이 자연스럽지만, `_.debounce(...)`처럼 라이브러리가 만들어 반환한 함수를 보관할 때는 `useMemo`가 더 의미가 잘 맞는다.
- 의존성 배열에는 debounce 내부에서 바깥으로부터 가져다 쓰는 값인 `refetch`, `refetchCount`, `startDate`, `endDate`가 들어가야 한다.

### 5. 날짜 범위 검색

- `antd`의 `RangePicker`를 사용해 날짜 범위를 선택할 수 있도록 했다.
- 선택된 날짜는 `Dayjs` 타입으로 들어오므로, GraphQL 변수에 넘기기 위해 `toDate()`로 `Date` 객체로 변환했다.

```ts
const onRangeChange = (dates: null | (Dayjs | null)[]) => {
  if (dates) {
    if (!dates?.[0] || !dates?.[1]) return;
    setStartDate(dates[0].toDate());
    setEndDate(dates[1].toDate());
  } else {
    setStartDate(null);
    setEndDate(null);
  }
};
```

- `dates` 자체가 `null`일 수도 있고, 배열 안의 `dates[0]`, `dates[1]`이 각각 `null`일 수도 있다는 점을 확인했다.
- `if (!dates?.[0] || !dates?.[1]) return;`은 날짜가 둘 다 선택되지 않은 상태를 방어하는 코드다.
- 사용자가 RangePicker 값을 삭제하면 기존 날짜 조건이 남지 않도록 `startDate`, `endDate`를 `null`로 되돌리는 처리를 추가했다.

### 6. GraphQL 검색 조건 보완

- 게시글 목록 조회 쿼리에 `search`, `startDate`, `endDate` 변수를 연결했다.
- 게시글 개수 조회 쿼리인 `fetchBoardsCount`도 검색어와 날짜 범위를 함께 받을 수 있도록 보완했다.

```graphql
query fetchBoardsCount(
  $search: String
  $startDate: DateTime
  $endDate: DateTime
) {
  fetchBoardsCount(search: $search, startDate: $startDate, endDate: $endDate)
}
```

- 검색 결과 페이지네이션을 맞추려면 목록 데이터뿐 아니라 전체 개수도 같은 조건으로 계산되어야 한다는 점을 확인했다.

```txt
목록 조회: page + search + startDate + endDate
개수 조회: search + startDate + endDate
```

### 7. 검색 결과 페이지네이션 연동

- 검색 후 페이지 번호를 클릭하거나 이전/다음 버튼을 눌렀을 때, 검색 조건이 빠지면 전체 게시글 기준으로 다시 돌아갈 수 있다는 점을 확인했다.
- 그래서 `handleGoPage`, `handlePrevBtn`, `handleNextBtn`에서도 `search`, `startDate`, `endDate`를 함께 넘기도록 흐름을 맞췄다.

```ts
const handleGoPage = async (page: number) => {
  await refetch({ page, search, ...date });
  await refetchCount({
    search,
    startDate,
    endDate,
  });
};
```

- 게시글 수가 적으면 화면에서는 이 문제가 잘 드러나지 않지만, 구조적으로는 모든 목록 조회가 같은 필터 조건을 공유해야 한다는 점을 배웠다.

### 8. 검색어 하이라이트

- 검색어와 일치하는 제목의 일부를 빨간색으로 보여주기 위해 `replaceAll`, `split`, `map`을 사용했다.
- 검색어가 있을 때만 하이라이트 로직을 실행하고, 검색어가 빈 문자열이면 원래 제목을 그대로 보여주도록 분기했다.

```tsx
{search
  ? el.title
      .replaceAll(search, `@##${search}@##`)
      .split("@##")
      .map((part, index) => {
        return (
          <span
            key={`${part}_${index}`}
            style={{
              color: part === search ? "red" : "black",
            }}
          >
            {part}
          </span>
        );
      })
  : el.title}
```

- `search === ""`일 때 `replaceAll("", ...)`을 실행하면 글자 사이사이에 값이 끼어드는 이상한 결과가 생길 수 있으므로, 빈 검색어 분기가 필요하다는 점을 확인했다.

### 9. 빈 검색 결과 처리

- 검색 결과가 없을 때 화면에 아무것도 없는 것처럼 보이지 않도록 "게시물이 없습니다." 메시지를 추가했다.
- 게시글이 없을 때는 페이지네이션도 숨기도록 구성했다.

```tsx
{data?.fetchBoards?.length === 0 && (
  <div className="flex items-center justify-center w-full py-10">
    <span className="text-gray-500 text-base">
      게시물이 없습니다.
    </span>
  </div>
)}
```

## 오늘 확인한 개념

### 1. `setState` 직후 state는 최신값이 아닐 수 있다

React에서 `setSearch(keyword)`를 호출해도 같은 함수 안의 다음 줄에서 `search`가 바로 바뀌는 것은 아니다. 그래서 입력 직후 최신 검색어가 필요하면 state가 아니라 이벤트에서 꺼낸 `keyword`를 사용하는 것이 안전하다.

```txt
setSearch(keyword)
→ 다음 렌더에서 search 반영
→ 현재 함수 안에서는 이전 search일 수 있음
```

### 2. debounce는 "나중에 실행되는 함수"다

`_.debounce` 안의 코드는 즉시 실행되지 않고, 일정 시간이 지난 뒤 실행된다. 그래서 debounce 내부에서 사용하는 값이 최신값인지 신경 써야 한다.

```txt
검색어 keyword: 인자로 넘기기
날짜 startDate/endDate: useMemo 의존성에 넣기
refetch/refetchCount: useMemo 의존성에 넣기
```

### 3. 의존성 배열의 의미

`useMemo` 또는 `useCallback`의 의존성 배열은 내부 함수가 바깥에서 가져다 쓰는 값들을 적는 곳이다.

```ts
[refetch, refetchCount, startDate, endDate]
```

이 값들이 바뀌면 debounce 함수도 새 값을 기준으로 다시 만들어져야 한다.

### 4. 검색 조건은 목록의 기준이다

검색어와 날짜는 단순히 1페이지를 가져올 때만 필요한 값이 아니다. 검색 조건은 목록 전체의 기준이므로 페이지네이션, 전체 개수 조회에도 같이 들어가야 한다.

```txt
검색 실행
페이지 번호 클릭
이전/다음 클릭
전체 개수 조회
```

이 네 흐름이 같은 검색 조건을 공유해야 검색 결과 페이지네이션이 유지된다.

### 5. 빈 문자열 검색은 별도 처리해야 한다

`replaceAll(search, ...)`에서 `search`가 빈 문자열이면 문자열 사이사이에 값이 끼어드는 문제가 생길 수 있다. 검색어 하이라이트는 검색어가 있을 때만 실행하는 것이 안전하다.

### 6. 날짜 clear는 상태 초기화까지 해야 한다

RangePicker에서 날짜를 지웠을 때 화면의 값만 사라지는 것이 아니라, 내부 검색 조건인 `startDate`, `endDate`도 `null`로 되돌려야 한다.

## 현재 구현 상태

- `src/components/boards-list/search/index.tsx`
  - 검색 UI 컴포넌트 추가
  - `RangePicker`, 검색 input, 검색 버튼 구성
- `src/components/boards-list/list/hook.ts`
  - 검색어 상태 관리
  - 날짜 범위 상태 관리
  - lodash debounce 검색 구현
  - 검색/날짜 조건을 목록 조회와 count 조회에 연결
  - 페이지네이션 이동 시 검색 조건 유지
- `src/components/boards-list/list/index.tsx`
  - 검색 컴포넌트 조립
  - 검색어 하이라이트
  - 빈 결과 메시지
  - 결과가 없을 때 페이지네이션 숨김
- `src/components/boards-list/list/queries.ts`
  - `fetchBoards` 검색어/날짜 변수 추가
  - `fetchBoardsCount` 검색어/날짜 변수 추가
- `src/app/homework21/boards/page.tsx`
  - `useBoardList`에서 받은 검색 관련 값과 핸들러를 목록 컴포넌트에 전달

## 검증 결과

- `homework21` 기준 props 흐름은 정상으로 보인다.
- `fetchBoardsCount`에 날짜 변수가 추가되었고, generated GraphQL 타입에도 반영된 것을 확인했다.
- 전체 `npx tsc --noEmit --incremental false`는 실패한다.
- 실패 원인은 `homework13`부터 `homework20`까지 과거 페이지들이 공통 `IBoardListProps`에 새로 추가된 검색 props를 아직 넘기지 않기 때문이다.
- 이번 과제 점검에서는 이 타입 에러를 `homework21` 구현 문제와 분리해서 봤다.

## 남은 점검 포인트

- `handleSearch`의 `refetchCount`에도 날짜 조건을 동일하게 넘기기
- `handlePrevBtn`, `handleNextBtn`, `handleGoPage`의 `refetchCount` 변수 전달 방식을 `...date`로 통일할지 정리하기
- 디버깅용 `console.log` 제거하기
- `handleViewDetail(id: String)`을 소문자 `string`으로 정리하기
- 검색어 하이라이트가 대소문자 구분 검색이어도 과제 의도에 맞는지 확인하기
- 가능하면 브라우저에서 검색어 입력, 날짜 선택, 검색어 삭제, 페이지 이동을 직접 눌러보기

## 오늘의 정리

오늘은 단순 검색 input을 붙이는 작업보다, 검색 조건이 목록 전체 흐름에 어떻게 퍼지는지를 보는 시간이 더 중요했다.

처음에는 "검색어를 입력하면 refetch하면 된다" 정도로 생각할 수 있지만, 실제로는 검색어가 페이지 번호, 이전/다음 버튼, 전체 개수, 하이라이트, 날짜 범위와 모두 연결된다. 특히 debounce는 함수가 나중에 실행되기 때문에 최신 값을 어떻게 보장할지 신경 써야 한다는 점이 큰 학습 포인트였다.

이번 과제는 초급 검색 기능처럼 보이지만, 실제로는 상태 관리, 비동기 요청, props 흐름, GraphQL 변수, UI 예외 처리가 같이 들어간 과제였다. 현재 구현은 큰 구조가 잡혔고, 남은 것은 로그 제거와 조건 통일 같은 마무리 정리에 가깝다.
