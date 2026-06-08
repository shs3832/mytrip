# 2026-06-08 오후 스터디 일지

## 작업 범위

오후에는 `homework35`의 마이페이지 `거래내역 & 북마크` 영역을 정리했다.

처음에는 한 파일에 거래내역, 북마크, query, mutation, infinite scroll, 삭제 로직이 함께 들어가 있었고, 이후 역할별로 파일을 나누며 데이터 흐름과 타입을 다시 맞췄다.

주요 작업 범위는 아래와 같다.

- 마이페이지 거래내역과 북마크 탭 UI 분리
- `useMypageTradingHook`으로 query, mutation, fetchMore, 탭 상태 로직 분리
- `fetchTravelproductsISold`, `fetchTravelproductsIPicked` 목록을 각각 무한 스크롤로 연결
- `fetchMoreResult`의 실제 데이터 형태 확인
- `hasMore`를 state가 아니라 파생 변수로 계산하는 방식 검토
- `deleteTravelproduct` 후 `cache.modify`로 나의 상품 목록과 count 갱신
- GraphQL 응답 객체 타입과 상품 1개 타입을 분리
- TypeScript의 optional, array, map 추론 문제를 확인

오늘 작업은 기능을 새로 붙이는 것보다, 복잡해진 화면을 데이터 흐름 기준으로 다시 정리하는 데 가까웠다.

## 컴포넌트 분리

마이페이지 거래/북마크 영역은 아래 구조로 나눴다.

```txt
src/components/mypage/trading/index.tsx
-> 마이페이지 거래/북마크 섹션 조립

src/components/mypage/trading/hook.ts
-> GraphQL query/mutation, fetchMore, cache.modify, 탭 상태

src/components/mypage/trading/trading/index.tsx
-> 나의 상품 거래내역 목록 UI

src/components/mypage/trading/bookmark/index.tsx
-> 북마크 목록 UI

src/components/mypage/trading/types.ts
-> 상품 타입과 쿼리 응답 타입
```

이 구조의 장점은 `index.tsx`가 화면 전체 조립만 담당하고, 데이터 로직은 hook으로 빠지며, 반복되는 목록 UI는 하위 컴포넌트가 맡는다는 점이다.

처음부터 완벽한 추상화를 한 것은 아니지만, 한 파일이 너무 길어지는 문제는 줄어들었다.

## state와 변수 구분

오후에 가장 많이 다룬 개념 중 하나는 state와 변수의 차이다.

`activeIndex`는 state가 맞다.

```ts
const [activeIndex, setActiveIndex] = useState(0);
```

사용자가 `거래내역`, `북마크` 탭을 클릭했을 때 현재 선택된 탭을 기억해야 하기 때문이다.

반대로 `hasMore`는 state보다 변수로 계산하는 편이 자연스럽다.

```ts
const tradeHasMore =
  (buyData?.fetchTravelproductsISold.length ?? 0) < totalTradeCount;

const bookmarkHasMore =
  (bookMark?.fetchTravelproductsIPicked.length ?? 0) < totalBookmarkCount;
```

`hasMore`는 독립적으로 기억해야 하는 값이 아니라, 현재 불러온 목록 개수와 전체 개수를 비교하면 매 렌더마다 계산할 수 있는 값이다.

오늘 정리한 기준은 아래와 같다.

```txt
사용자 행동으로 바뀌고 기억해야 하는 값
-> state

이미 있는 값으로 매번 계산할 수 있는 값
-> 변수
```

## fetchMoreResult 데이터 형태

무한 스크롤에서 `fetchMoreResult is not iterable` 에러를 확인했다.

콘솔에 찍힌 데이터는 아래와 같은 형태였다.

```ts
{
  fetchTravelproductsISold: [
    상품1,
    상품2,
  ]
}
```

즉 `fetchMoreResult` 자체는 배열이 아니라 쿼리 응답 객체다.

따라서 아래처럼 쓰면 에러가 난다.

```ts
const nextData = [...prev.fetchTravelproductsISold, ...fetchMoreResult];
```

올바른 방식은 응답 객체 안의 배열을 꺼내서 합치는 것이다.

```ts
const nextData = [
  ...prev.fetchTravelproductsISold,
  ...fetchMoreResult.fetchTravelproductsISold,
];
```

북마크도 같은 패턴이다.

```ts
const nextData = [
  ...prev.fetchTravelproductsIPicked,
  ...fetchMoreResult.fetchTravelproductsIPicked,
];
```

오늘 다시 확인한 핵심은 아래와 같다.

```txt
fetchMoreResult
-> 쿼리 응답 객체

fetchMoreResult.fetchTravelproductsISold
-> 실제 배열
```

## 거래내역과 북마크 fetchMore 분리

처음에는 거래내역 쿼리에서 나온 `fetchMore`를 북마크에서도 같이 쓰고 있었다.

하지만 거래내역과 북마크는 서로 다른 쿼리다.

```graphql
fetchTravelproductsISold
fetchTravelproductsIPicked
```

따라서 각각의 `useQuery`에서 `fetchMore`를 따로 꺼내야 한다.

```ts
const { data: buyData, fetchMore } = useQuery(
  MYPAGE_FETCH_TRAVEL_PRODUCTS_I_SOLD,
);

const { data: bookMark, fetchMore: bookmarkFetchMore } = useQuery(
  MYPAGE_FETCH_TRAVEL_PRODUCTS_I_PICKED,
);
```

이렇게 하면 거래내역은 거래내역 쿼리 기준으로, 북마크는 북마크 쿼리 기준으로 다음 페이지를 불러온다.

추후 가독성을 더 높이려면 거래내역 쪽도 아래처럼 이름을 맞출 수 있다.

```ts
const { data: buyData, fetchMore: tradeFetchMore } = useQuery(...);
```

## TypeScript 타입 정리

오후에 가장 헷갈렸던 부분은 `상품 1개 타입`과 `쿼리 응답 타입`의 차이다.

상품 1개는 아래 타입이다.

```ts
export interface IMypageProducts {
  _id: string;
  name: string;
  price: number;
  createdAt: string;
  soldAt: string | null;
  buyer: {
    _id: string;
    name: string;
  };
  seller: {
    _id: string;
    name: string;
  };
}
```

하지만 `buyData`는 상품 1개가 아니라 GraphQL 응답 객체다.

```ts
{
  fetchTravelproductsISold: IMypageProducts[];
}
```

따라서 타입도 별도로 잡아야 한다.

```ts
export interface IMypageTradingProps {
  fetchTravelproductsISold: IMypageProducts[];
}

export interface IMypageBookmarkProps {
  fetchTravelproductsIPicked: IMypageProducts[];
}
```

오늘의 핵심은 아래와 같다.

```txt
IMypageProducts
-> 상품 1개

IMypageTradingProps
-> fetchTravelproductsISold 배열을 가진 쿼리 응답 객체

IMypageBookmarkProps
-> fetchTravelproductsIPicked 배열을 가진 쿼리 응답 객체
```

## optional chaining과 기본값

`buyData`는 Apollo `useQuery` 결과이므로 처음 렌더에서는 `undefined`일 수 있다.

따라서 prop 타입은 아래처럼 optional로 받을 수 있다.

```ts
buyData?: IMypageTradingProps;
```

하지만 아래 코드는 TypeScript가 경고할 수 있다.

```ts
buyData?.fetchTravelproductsISold.length > 0;
```

`buyData`가 없으면 결과가 `undefined`가 될 수 있기 때문이다.

비교 연산을 하려면 기본값을 넣는 편이 안전하다.

```ts
(buyData?.fetchTravelproductsISold.length ?? 0) > 0;
```

더 깔끔한 방식은 배열을 먼저 변수로 빼는 것이다.

```ts
const tradeItems = buyData?.fetchTravelproductsISold ?? [];
```

그러면 JSX에서는 아래처럼 단순하게 쓸 수 있다.

```tsx
dataLength={tradeItems.length}
loader={tradeItems.length > 0 ? <h4>Loading...</h4> : null}
{tradeItems.map((el, index) => ...)}
```

이 방식은 `undefined` 가능성을 한 곳에서 정리해주기 때문에 JSX가 덜 복잡해진다.

## map의 타입 추론

배열 타입이 정확히 선언되어 있으면 `map` 안에서 `el` 타입은 자동으로 추론된다.

```ts
fetchTravelproductsISold: IMypageProducts[];
```

그러면 아래처럼 작성해도 된다.

```tsx
buyData?.fetchTravelproductsISold.map((el, index) => {
  return ...;
});
```

이때 `el`은 `IMypageProducts`, `index`는 `number`로 추론된다.

오히려 아래처럼 다시 타입을 붙이면 타입이 꼬일 수 있다.

```ts
el: Pick<IMypageProducts, "_id" | "name" | "price">
```

오늘 정리한 기준은 아래와 같다.

```txt
위에서 배열 타입을 정확히 줬다면
map 내부에서는 타입을 다시 붙이지 않아도 된다.
```

## cache.modify로 나의 상품 삭제

`deleteTravelproduct` mutation 후 `cache.modify`로 나의 상품 목록과 count를 갱신했다.

핵심 흐름은 아래와 같다.

```ts
update(cache, { data }) {
  const deletedId = data?.deleteTravelproduct;
  if (!deletedId) return;

  cache.modify({
    fields: {
      fetchTravelproductsISold(existingData = [], { readField }) {
        return existingData.filter((el) => {
          return readField("_id", el) !== deletedId;
        });
      },
      fetchTravelproductsCountISold(existingData = 0) {
        return existingData - 1;
      },
    },
  });
}
```

삭제 후 목록에서 해당 상품을 제거하고, 전체 개수도 1 감소시키는 구조다.

Apollo 캐시 항목은 실제 객체가 아니라 reference일 수 있으므로, `_id` 비교에는 `readField("_id", el)`을 사용한다.

## 남은 정리 후보

과제 진행에는 큰 문제 없지만, 전체 숙제가 끝난 뒤 정리하면 좋을 항목도 보인다.

- `console.log(error)`를 `Modal.error` 등 사용자 피드백으로 바꾸기
- Apollo cache 내부 `existingData`에서 남아 있는 `any` 줄이기
- `buyData?.fetchTravelproductsISold ?? []`처럼 배열 기본값을 변수로 빼서 JSX 단순화하기
- GraphQL codegen 타입을 적용할 수 있는 구간은 직접 타입 대신 generated 타입으로 교체하기
- 마이페이지 공통 컴포넌트 이동이 의도한 구조인지 커밋 전 확인하기

특히 타입 정리는 모든 숙제가 끝난 뒤 한 번에 더 볼 필요가 있다.

지금은 과제 기능을 진행하는 것이 우선이고, 이후에 타입, 에러 처리, 파일 구조, 네이밍을 다시 다듬는 방식이 현실적이다.

## 오늘 기억할 점

오늘의 핵심은 아래 문장으로 정리할 수 있다.

```txt
서버 데이터는 화면에 쓰는 배열 그 자체가 아니라,
GraphQL 응답 객체 안에 들어 있는 배열인 경우가 많다.
```

그래서 타입도 아래처럼 나눠서 생각해야 한다.

```txt
상품 1개 타입
목록 배열 타입
쿼리 응답 객체 타입
컴포넌트 props 타입
```

처음에는 어렵게 느껴지지만, 오늘처럼 실제 콘솔 데이터와 타입 선언을 비교하면서 맞춰가는 방식이 가장 확실하다.

TypeScript는 문법보다 데이터 모양을 정확히 적는 감각이 더 중요하다는 것도 다시 확인했다.

## homework36 Open Graph 학습 시작

오후 후반에는 `homework36` 과제 요구사항을 확인하고, Open Graph를 Next.js App Router에서 어떻게 적용해야 하는지 흐름을 정리했다.

과제 요구사항은 아래와 같다.

```txt
homework35 폴더를 활용해 homework36 완성
여행상품 상세페이지에는 dynamic opengraph 적용
나머지 모든 페이지에는 static opengraph 적용
남은 시간에는 기존 기능 완성 또는 리팩토링
```

강의노트에서는 Open Graph의 원리를 설명했다.

```html
<meta property="og:title" content="여행마켓" />
<meta property="og:description" content="나의 여행마켓에 오신 것을 환영합니다!" />
<meta property="og:image" content="이미지주소" />
```

이 태그들이 HTML에 들어 있으면 카카오톡, 슬랙, 디스코드 같은 서비스가 페이지 HTML을 스크래핑해서 링크 미리보기 카드로 보여준다.

강의에서 `fetch(...).text()`로 HTML을 받아오고 `<meta>` 문자열을 찾는 예시는, 우리가 직접 구현해야 하는 과제 코드라기보다 외부 서비스가 OG 태그를 읽는 원리를 흉내 낸 예시에 가깝다.

오늘 정리한 구분은 아래와 같다.

```txt
OG 제공자
-> 우리 페이지 HTML에 og:title, og:description, og:image를 심어두는 역할

OG 소비자
-> 카카오톡, 슬랙, 디스코드처럼 다른 페이지 HTML을 긁어서 OG 태그를 읽는 역할
```

이번 `homework36` 과제에서 우리가 해야 하는 것은 OG 소비자를 만드는 것이 아니라, 우리 페이지가 OG 제공자 역할을 하도록 만드는 것이다.

## Next.js App Router에서의 적용 방향

Next.js App Router에서는 `<meta>` 태그를 컴포넌트에서 직접 넣기보다, Metadata API를 사용하는 방식이 공식적인 흐름이다.

정적인 메타데이터는 `layout.tsx` 또는 `page.tsx`에서 `metadata` 객체로 정의한다.

```ts
export const metadata = {
  title: "여행마켓",
  description: "나의 여행마켓",
  openGraph: {
    title: "여행마켓",
    description: "나의 여행마켓",
    images: ["기본 이미지 URL"],
  },
};
```

상품 상세처럼 URL 파라미터나 서버 데이터에 따라 값이 바뀌는 경우에는 `generateMetadata`를 사용한다.

```ts
export async function generateMetadata({ params }) {
  const productId = params.productId;

  // productId로 상품 데이터 조회

  return {
    title: "상품명",
    description: "상품 설명",
    openGraph: {
      title: "상품명",
      description: "상품 설명",
      images: ["상품 이미지 URL"],
    },
  };
}
```

오늘 확인한 핵심 규칙은 아래와 같다.

```txt
static opengraph
-> src/app/layout.tsx의 metadata

dynamic opengraph
-> src/app/homework36/products/[productId]/page.tsx의 generateMetadata

generateMetadata
-> 서버 컴포넌트에서만 사용 가능
-> "use client" 파일에서는 사용 불가
```

## 서버 컴포넌트와 클라이언트 컴포넌트 분리

기존 상품 상세 페이지는 `useProductDetailHook`, Apollo `useQuery`, 모달 상태, 클릭 이벤트 등을 사용하므로 클라이언트 컴포넌트가 필요했다.

하지만 `generateMetadata`는 서버에서 실행되기 때문에 `"use client"`가 붙은 파일에서는 사용할 수 없다.

따라서 구조를 아래처럼 나누는 것이 자연스럽다.

```txt
src/app/homework36/products/[productId]/page.tsx
-> 서버 컴포넌트
-> generateMetadata 작성
-> 클라이언트 상품 상세 컴포넌트 렌더링

src/components/product-detail-page/index.tsx
-> "use client"
-> 기존 useProductDetailHook 사용
-> ProductDetailComponentPage 렌더링
```

이 구조는 전체 화면을 완전히 SSR로 바꾼다는 뜻은 아니다.

더 정확히는 아래와 같다.

```txt
page.tsx
-> 서버 영역
-> 동적 메타데이터 생성 가능

ProductDetailPageComponent
-> 클라이언트 영역
-> 기존 hook, 이벤트, Apollo useQuery 유지
```

## generateMetadata의 params

`generateMetadata`에서는 `useParams()`를 사용할 수 없다.

대신 Next.js가 route segment 이름을 기준으로 `params`를 함수 인자로 넘겨준다.

현재 파일 경로는 아래와 같다.

```txt
src/app/homework36/products/[productId]/page.tsx
```

따라서 `params`의 key는 `id`가 아니라 `productId`다.

```ts
export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}) {
  const productId = params.productId;
}
```

오늘 확인한 기준은 아래와 같다.

```txt
[productId]
-> params.productId

[boardId]
-> params.boardId

[id]
-> params.id
```

`console.log(params)`로 확인할 수도 있지만, 이 로그는 브라우저 개발자도구가 아니라 `npm run dev`를 실행한 서버 터미널에 찍힌다.

## 서버에서 Apollo query 호출

`generateMetadata`는 서버에서 실행되므로 React hook인 `useQuery`를 사용할 수 없다.

대신 서버에서 Apollo Client를 직접 만들고 `client.query()`로 상품 데이터를 가져오는 방식이 가능하다.

```ts
const serverApolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://main-practice.codebootcamp.co.kr/graphql",
  }),
  cache: new InMemoryCache(),
  ssrMode: true,
});

const { data } = await serverApolloClient.query({
  query: METADATA_FETCH_TRAVEL_PRODUCT,
  variables: {
    travelproductId: params.productId,
  },
});
```

공식적인 App Router + Apollo 통합 방식으로는 `@apollo/client-integration-nextjs`의 `registerApolloClient`를 사용할 수도 있다.

다만 이번 과제처럼 `generateMetadata`에서 상품 1개를 조회해 OG 태그를 만들기 위한 목적이라면, 전체 Apollo 구조를 바꾸기보다 서버용 Apollo Client를 가볍게 따로 만드는 방식도 현실적이다.

오늘 정리한 차이는 아래와 같다.

```txt
클라이언트 화면 데이터
-> useQuery, useProductDetailHook

메타데이터용 서버 데이터
-> generateMetadata 안에서 ApolloClient.query()
```

카카오톡, 슬랙, 디스코드는 React 화면이 뜬 뒤의 `useQuery` 결과를 기다려주지 않는다.

그래서 공유 미리보기에 필요한 데이터는 초기 HTML의 meta 태그에 들어가야 하고, 이 값은 서버 단계에서 준비해야 한다.

## OG 데이터 가공

상품 상세 dynamic OG에 넣을 값은 상품 데이터에서 가져온다.

```txt
title
-> 상품명

description
-> 상품 설명

image
-> 상품 첫 번째 이미지
```

다만 `contents`는 ReactQuill에서 저장된 HTML 문자열일 수 있으므로, OG description에는 태그를 제거한 텍스트를 넣는 편이 좋다.

간단한 태그 제거는 문자열 처리로 할 수 있다.

```ts
const makeDescription = (html?: string): string => {
  const text = (html ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();

  return text.length > 80 ? `${text.slice(0, 80)}...` : text;
};
```

이미지는 상품 이미지가 없을 수 있으므로 기본 이미지를 준비하는 방식이 안전하다.

```ts
const firstImage = product.images?.find((image: string) => image);

const imageUrl = firstImage
  ? `https://storage.googleapis.com/${firstImage}`
  : DEFAULT_OG_IMAGE;
```

OG 이미지 URL은 카카오톡, 슬랙, 디스코드 같은 외부 서비스가 접근할 수 있어야 하므로 가능하면 절대 URL을 사용하는 편이 좋다.

## 오늘 정리한 큰 그림

강의노트는 Open Graph의 원리를 설명했고, homework36은 그 원리를 Next.js App Router 방식으로 적용해보는 과제다.

오늘의 결론은 아래와 같다.

```txt
강의노트
-> OG meta 태그가 무엇인지 이해하는 자료
-> 외부 서비스가 HTML을 긁어서 OG를 읽는 원리 설명

homework36 실제 구현
-> layout.tsx의 static metadata
-> 상품 상세 page.tsx의 generateMetadata
-> 서버에서 productId로 상품 조회
-> 상품 데이터를 Metadata 객체로 변환
```

처음에는 강의노트와 과제 구현 방향이 다르게 느껴졌지만, 역할을 나누면 이해가 쉬워진다.

이번 과제의 숨은 학습 목표는 단순히 OG 태그를 쓰는 것이 아니라, 아래 개념들을 연결하는 것이다.

```txt
Open Graph 원리
Next.js Metadata API
App Router의 Server Component / Client Component 경계
서버에서 GraphQL 호출하기
상품 데이터를 공유 미리보기용 데이터로 가공하기
```

구현 관점에서는 아래 흐름만 잡으면 된다.

```txt
1. layout.tsx에 기본 static openGraph 추가
2. 상품 상세 page.tsx를 서버 컴포넌트로 유지
3. 기존 hook 화면은 클라이언트 컴포넌트로 분리
4. generateMetadata에서 params.productId 확인
5. 서버 Apollo query로 상품 조회
6. name, contents, images를 title, description, image로 변환
7. 이미지가 없으면 default image 사용
```

오늘은 직접 완성 구현까지 들어가기보다, 왜 이 구조가 필요한지와 어떤 공식 문법을 찾아야 하는지 이해하는 데 집중했다.
