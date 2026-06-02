# 2026-06-02 오후 스터디 노트

## 오늘 오후 작업 범위

오후에는 homework27에서 이어진 로그인/인증 흐름을 정리하고, homework30 포인트 충전/결제 흐름으로 넘어갔다.

주요 범위는 다음과 같다.

- 네비게이션 active 메뉴 처리
- 로그인 후 이전 페이지로 redirect
- 새로고침 시 refreshToken으로 accessToken 복구
- `isLoaded`로 인증 복구 완료 시점 구분
- homework30 PortOne 결제 테스트
- 결제 id와 `crypto.randomUUID()`
- 포인트 내역 조회 쿼리 확인
- 구매 확인/포인트 부족 공통 모달 구조 설계

## 현재 변경 파일 흐름

실제 새 커밋은 아직 없다.

현재 마지막 커밋은 다음이다.

```txt
ee0a4b8 - homework26: 여행상품 상세 페이지 리팩토링 및 훅 추가로 코드 구조 개선
```

이번 오후 작업은 다음 커밋에 들어갈 변경사항으로 보면 된다.

```txt
src/commons/layout/navigation/index.tsx
src/commons/stores/load-store.ts
src/components/login/*
src/components/product-detail/hook.ts
src/components/product-detail/index.tsx
src/components/product-detail/modal/*
src/components/product-detail/types.ts
src/components/product-detail/comment-list/hook.ts
src/app/homework27/*
src/app/homework30/*
```

## 로그인과 새로고침 복구

네비게이션에서 로그인 상태를 판단하는 기준은 `accessToken`이다.

새로고침을 하면 zustand 메모리 상태는 초기화되기 때문에 `accessToken`은 다시 빈 문자열이 된다.

그래서 새로고침 직후에는 `getAccessToken()`을 호출해서 refreshToken 쿠키로 새 accessToken을 받아와야 한다.

현재 흐름은 다음과 같다.

```txt
새로고침
-> zustand accessToken 초기화
-> Navigation useEffect 실행
-> getAccessToken 호출
-> refreshToken cookie가 credentials: include로 서버에 전달
-> 새 accessToken 발급
-> setAccessToken 저장
-> setIsLoaded 실행
```

여기서 `isLoaded`는 로그인 여부가 아니라, 초기 인증 복구 시도가 끝났는지 나타내는 값이다.

```txt
accessToken
-> 로그인 상태 판단

isLoaded
-> 로그인 상태를 판단해도 되는 시점인지 판단
```

네비게이션에서 `isLoaded`가 true일 때만 로그인/프로필 영역을 보여주면, 새로고침 직후 로그인 버튼이 잠깐 보였다가 프로필로 바뀌는 깜빡임을 줄일 수 있다.

## redirect 흐름

로그인 후 이전에 보고 있던 페이지로 돌아가려면 현재 URL을 로그인 페이지로 이동할 때 같이 넘겨야 한다.

현재 네비게이션의 역할은 다음이다.

```txt
현재 URL 확인
-> /homework27/login?redirect=현재URL 로 이동
```

로그인 훅의 역할은 다음이다.

```txt
로그인 성공
-> accessToken 저장
-> redirect query 확인
-> redirect가 내부 경로면 해당 경로로 이동
-> 없으면 /homework27/boards로 이동
```

핵심 문법은 다음이다.

```ts
router.push(redirect?.startsWith("/") ? redirect : "/homework27/boards");
```

이 코드는 `redirect`가 있고 `/`로 시작하는 내부 경로이면 그곳으로 이동하고, 없거나 이상한 값이면 기본 페이지로 보내는 코드다.

## 네비게이션 메뉴 active 처리

메뉴가 많아질 것을 고려해서 배열로 분리했다.

```ts
const menus = [
  { label: "트립토크", href: "/homework27/boards", activePath: "/boards" },
  { label: "숙박권구매", href: "/homework27/products", activePath: "/products" },
  { label: "마이페이지", href: "/homework27/mypage", activePath: "/mypage" },
];
```

현재 URL은 `usePathname()`으로 확인하고, `activePath`가 포함되어 있는지로 active 스타일을 준다.

```ts
const isActive = pathName.includes(el.activePath);
```

이 구조의 장점은 메뉴가 늘어나도 배열에 객체 하나만 추가하면 된다는 점이다.

## 제네릭 타입 적용 흐름

homework27 요구사항 중 하나였던 제네릭 타입은 Apollo `useQuery`, `useMutation`에 적용하는 방식이 가장 자연스럽다.

```ts
useQuery<TData, TVariables>(QUERY, options);
useMutation<TData, TVariables>(MUTATION);
```

이번에 상품 상세 훅과 답변 목록 훅에 generated 타입을 일부 적용했다.

```ts
useQuery<
  FetchUserLoggedInQuery,
  FetchUserLoggedInQueryVariables
>(FETCH_USER_LOGGED_IN);
```

다만 주의할 점도 있다.

`FETCH_TRAVEL_PRODUCT_QUESTIONS`에 `FetchTravelproductForDetailQuery` 타입을 넣는 식으로 서로 다른 query 타입을 섞으면 타입 의미가 틀어진다.

GraphQL 제네릭은 다음 기준으로 맞춰야 한다.

```txt
TData
-> 해당 query가 실제로 반환하는 data 타입

TVariables
-> 해당 query가 실제로 받는 variables 타입
```

즉 query 이름과 generated 타입 이름이 같은 흐름인지 꼭 확인해야 한다.

## homework30 PortOne 결제

상품 상세의 구매 흐름에 PortOne 결제 테스트를 붙여봤다.

PortOne 결제 요청은 브라우저에서 실행되므로 환경변수는 `NEXT_PUBLIC_` 접두사가 필요하다.

```env
NEXT_PUBLIC_STORE_ID=...
NEXT_PUBLIC_CHANNEL_KEY=...
```

클라이언트 코드에서는 다음처럼 읽어야 한다.

```ts
process.env.NEXT_PUBLIC_STORE_ID
process.env.NEXT_PUBLIC_CHANNEL_KEY
```

`STORE_ID`, `CHANNEL_KEY`처럼 접두사가 없으면 서버 전용 환경변수라 브라우저 코드에서 `undefined`가 될 수 있다.

## paymentId와 UUID

결제 요청의 `paymentId`는 결제 한 건을 식별하는 값이다.

처음에는 유저 id 기반으로 만들 수 있다고 생각했지만, 같은 유저가 여러 번 결제하면 paymentId가 중복될 수 있다.

그래서 과제 단계에서는 다음처럼 매번 고유한 id를 만드는 것이 적절하다.

```ts
const paymentId = `payment_${crypto.randomUUID()}`;
```

`crypto.randomUUID()`는 브라우저에 내장된 Web Crypto API 기능으로 UUID 문자열을 만들어준다.

실무에서는 프론트가 paymentId를 임의로 만들기보다, 보통 백엔드가 주문을 먼저 만들고 그 주문 id/paymentId를 내려준다.

```txt
프론트 -> 백엔드 주문 생성 요청
백엔드 -> paymentId 생성 및 DB 저장
프론트 -> paymentId로 PortOne 결제 요청
결제 성공 후 -> 백엔드 검증
백엔드 -> 포인트 충전/구매 처리
```

## 결제와 트랜잭션

결제 흐름은 트랜잭션 개념과 연결된다.

구분하면 다음 두 가지다.

```txt
결제 트랜잭션
-> PortOne/카카오페이에서 결제가 처리되는 흐름

DB 트랜잭션
-> 백엔드에서 포인트 증가, 결제 내역 저장, 주문 상태 변경을 하나로 묶는 처리
```

프론트의 `paymentId`는 결제사, 프론트, 백엔드, DB를 이어주는 식별자에 가깝다.

백엔드에서는 결제 검증 후 다음 작업을 하나의 DB 트랜잭션으로 묶는 것이 안전하다.

```txt
포인트 증가
충전 내역 저장
결제 상태 PAID 변경
```

모두 성공하면 commit, 하나라도 실패하면 rollback하는 구조가 실무적으로 안전하다.

## 포인트 내역 조회 쿼리

서버 스키마를 확인해보니 포인트 내역 관련 query가 있다.

```graphql
fetchPointTransactions(search: String, page: Int): [PointTransaction!]!
fetchPointTransactionsOfLoading(search: String, page: Int): [PointTransaction!]!
fetchPointTransactionsOfBuying(search: String, page: Int): [PointTransaction!]!
fetchPointTransactionsOfSelling(search: String, page: Int): [PointTransaction!]!
```

`fetchPointTransactions`는 전체 포인트 거래 내역이고, 나머지는 충전/구매/판매별 전용 조회로 보면 된다.

내 포인트 내역을 그냥 1페이지부터 보여줄 때는 `search`가 필요 없다.

```ts
variables: {
  page: 1,
}
```

검색창을 만들 때만 `search`에 검색어를 넣으면 된다.

## 포인트 페이지 탭 상태

처음에는 `menu` 배열 안에 `setOpen` 값을 넣고 직접 수정하려 했다.

하지만 React에서는 일반 객체/배열 값을 직접 바꿔도 렌더링이 다시 일어나지 않는다.

탭 UI는 현재 선택된 index 하나만 state로 관리하는 편이 가장 단순하다.

```ts
const [activeIndex, setActiveIndex] = useState(0);
```

표시 조건은 다음처럼 잡는다.

```tsx
{activeIndex === 0 && <전체 />}
{activeIndex === 1 && <충전내역 />}
{activeIndex === 2 && <구매내역 />}
{activeIndex === 3 && <판매내역 />}
```

메뉴 목록 자체는 변하지 않으므로 굳이 state로 둘 필요가 없다.

## 공통 구매 모달

구매 확인 모달과 포인트 부족 모달은 스타일이 거의 같고, 문구와 버튼 동작만 다르다.

그래서 모달 컴포넌트를 두 개 만들기보다 하나의 공통 모달을 만들고, `modalData`만 바꿔서 쓰는 방식이 적절하다.

공통 데이터 구조는 다음과 같은 형태가 좋다.

```ts
type ModalData = {
  title: string;
  content: string;
  okText: string;
  cancelText: string;
  onOk: () => void;
};
```

구매 버튼 클릭 흐름은 다음과 같다.

```txt
구매하기 클릭
-> handleBuyConfirm
-> 구매 확인용 modalData 세팅
-> 모달 open

확인 클릭
-> modalData.onOk 실행
-> handlePurchase 실행
-> 포인트 검사
```

포인트가 부족하면 다시 포인트 부족용 modalData를 세팅한다.

```txt
포인트 부족
-> pointData 세팅
-> 모달 open
-> 확인/충전 클릭
-> /homework30/mypage/points 이동
```

## 오늘 발견한 중요한 버그

모달 OK 버튼이 실행되지 않았던 이유는 대소문자 오타였다.

```ts
onOK: handlePurchase
```

하지만 모달 컴포넌트에서는 다음 값을 실행하고 있었다.

```tsx
onClick={modalData.onOk}
```

JavaScript는 대소문자를 구분하므로 `onOK`와 `onOk`는 다른 속성이다.

```txt
onOK !== onOk
```

따라서 `modalData.onOk`가 `undefined`가 되었고, OK 버튼을 눌러도 `handlePurchase`의 `console.log("체크")`까지 도달하지 않았다.

내일 가장 먼저 고칠 부분이다.

## 현재 코드에서 조심할 점

현재 작업 상태에서 중요한 점은 다음과 같다.

- `modalData` 초기값에도 `onOk: () => {}`가 있어야 타입과 런타임 흐름이 맞다.
- `confirmData`에는 `onOK`가 아니라 `onOk`를 넣어야 한다.
- `handlePurchase` 내부에 `return`이 있어서 PortOne 실제 결제 로직은 아직 실행되지 않는다.
- `productPrice`가 `undefined`일 수 있으므로 비교 전에 기본값이나 early return 처리가 필요하다.
- `FETCH_TRAVEL_PRODUCT_QUESTIONS`에 잘못된 generated query 타입이 들어간 것으로 보인다.
- `menu`는 state로 둘 필요가 없고 `activeIndex`만 state면 충분하다.
- 포인트 내역은 아직 실제 데이터 map이 아니라 더미 row가 남아 있다.
- `createPointTransactionsOfLoading` mutation 연결은 아직 남아 있다.
- 실제 포인트 충전은 PortOne 성공 후 GraphQL 충전 API까지 호출해야 완료된다.

## 다음 커밋 후보 요약

아직 실제 커밋은 없지만, 현재 변경사항을 커밋한다면 다음 범위가 될 수 있다.

```txt
homework30: 로그인 복구 및 포인트 결제 흐름 초안 구현
```

커밋 내용 후보:

- 네비게이션 메뉴 배열화 및 active 스타일 처리
- 로그인 redirect query 처리 추가
- refreshToken 기반 accessToken 복구 흐름 추가
- `load-store`로 초기 인증 복구 완료 상태 관리
- homework27/homework30 과제 폴더 추가
- PortOne 결제 요청 초안 추가
- 구매 확인/포인트 부족 공통 모달 초안 추가
- 포인트 내역 페이지 탭 상태 및 조회 쿼리 초안 추가
- 일부 Apollo query/mutation 제네릭 타입 적용

## 내일 이어서 할 순서

내일은 새 기능을 더 붙이기보다 오늘 멈춘 모달/결제 흐름을 먼저 정리하는 것이 좋다.

1. `modalData` 타입에 `onOk` 포함시키기
2. 초기 `modalData`에 `onOk: () => {}` 넣기
3. `onOK` 오타를 `onOk`로 수정하기
4. OK 클릭 시 `console.log("체크")` 도달 확인하기
5. 포인트 부족 분기 확인하기
6. 부족 모달의 OK/충전 버튼에서 `/homework30/mypage/points` 이동 확인하기
7. PortOne 실제 결제 로직의 임시 `return` 제거 여부 결정하기
8. 결제 성공 후 `createPointTransactionsOfLoading` mutation 연결하기
9. 포인트 내역 query를 codegen에 반영하고 generated 타입 적용하기
10. 더미 포인트 row를 실제 `dataPoints.fetchPointTransactions` map으로 교체하기

## 오늘의 핵심 정리

오늘 오후의 핵심은 “결제 기능” 자체보다 결제 기능에 필요한 주변 흐름을 이해한 것이다.

```txt
로그인 유지
-> refreshToken으로 accessToken 복구

결제 요청
-> PortOne requestPayment

결제 식별
-> paymentId

결제 검증
-> 실무에서는 백엔드 검증

포인트 반영
-> createPointTransactionsOfLoading

UI 분기
-> 구매 확인 모달 / 포인트 부족 모달
```

코드가 길어지면서 집중력이 떨어질 때는 구조가 틀린 것이 아니라, 이름 하나가 흐름을 막는 경우가 많다.

오늘의 대표적인 예가 `onOK`와 `onOk`였다.

내일은 이 오타를 시작점으로 삼아, 모달 OK 버튼에서 실제 구매 흐름으로 넘어가는지부터 확인하면 된다.
