# 2026-06-04 오후 스터디 일지

## 작업 범위

오늘 오후에는 `homework31` 숙박권 구매 메인 화면과 트립토크 게시판 화면의 퍼블리싱을 정리했다.

오전에는 상품 상세의 포인트 결제 흐름을 다뤘고, 오후에는 과제 요구사항에 맞춰 메인 화면 뼈대를 만들고 디자인 톤을 맞추는 데 집중했다.

주요 범위는 아래와 같다.

- `homework31` 라우트 기준 공통 네비게이션 정리
- 게시판 배너와 상품 배너 분리
- `/homework31/products`에서만 상품 배너 노출
- 숙박권 구매 메인 화면 퍼블리싱
- 트립토크 게시판 디자인 개선
- Tailwind, antd, Swiper를 섞어 화면 구성
- 마크업은 AI 도움을 받고, 이후 직접 컴포넌트 분리와 로직 연결을 하는 학습 방향 정리

오늘 오후 작업의 핵심은 기능을 완성하는 것이 아니라, 이후 데이터 연결과 상태 처리를 붙일 수 있는 화면 구조를 확보하는 것이었다.

## 숙박권 구매 메인 화면

`src/app/homework31/products/page.tsx`에서 숙박권 구매 메인 화면의 주요 요소를 마크업했다.

구성한 화면 요소는 아래와 같다.

- 상단 등록된 여행상품 카드
- 광고 배너
- 예약 가능 숙소 / 예약 마감 숙소 버튼
- 날짜 검색 입력
- 제목 검색 입력
- 검색 버튼
- 숙박권 판매하기 버튼
- 카테고리 필터 아이콘 영역
- 여행상품 카드
- 우측 하단 fixed 최근 본 상품 영역

아직 실제 데이터 연결보다는 정적 마크업이 중심이다.

다음 단계에서는 상품 데이터를 받아서 `map`으로 렌더링하고, 상품 카드와 필터 영역을 컴포넌트로 분리해야 한다.

## Tailwind에서 느낀 점

Tailwind는 레이아웃과 간격을 빠르게 잡을 때 편하다.

예를 들어 아래처럼 JSX 안에서 화면 구조를 바로 확인할 수 있다.

```tsx
<div className="flex items-center justify-between px-6 py-4 text-sm font-medium" />
```

다만 다음과 같은 CSS는 Tailwind className 안에 길게 넣으면 오히려 불편해진다.

- `background-image`
- `before`, `after`
- 복잡한 gradient
- 동적 이미지 URL

고정 배경 이미지는 아래처럼 쓸 수 있다.

```tsx
<div className="bg-[url('/images/banner.png')] bg-cover bg-center" />
```

하지만 이미지가 동적으로 들어오거나, 코드 가독성이 더 중요하면 `style`을 쓰는 편이 낫다.

```tsx
<div
  className="bg-cover bg-center"
  style={{ backgroundImage: `url(${imageUrl})` }}
/>
```

이미지 위에 오버레이를 얹을 때도 `after:`를 쓸 수 있지만, 실제 `div`를 하나 두는 방식이 더 읽기 쉬울 때가 있다.

```tsx
<div className="relative">
  <div className="absolute inset-0 bg-black/50" />
  <div className="relative z-10">내용</div>
</div>
```

오늘의 결론은 Tailwind를 무조건 모든 CSS 대체제로 쓰기보다, 편한 영역과 불편한 영역을 나눠서 쓰는 것이 좋다는 것이다.

## 배너 구조

게시판 배너와 상품 배너는 의미가 다르므로 컴포넌트를 나누는 것은 괜찮다.

다만 Swiper 구조가 거의 같다면, 공통 구조는 유지하고 이미지 배열만 props로 넘기는 방식이 더 낫다.

```tsx
<BoardListBannerComponent bannerImages={bannerImages} />
<ProductListBannerComponent productBannerImages={productBannerImages} />
```

상품 배너는 상품 메인 페이지에서만 보여야 하므로 `includes`보다 정확 비교가 안전하다.

```ts
const isProductBanner = param === "/homework31/products";
```

`includes("/products")`를 사용하면 `/products/new`, `/products/123` 같은 등록/상세 페이지에서도 true가 될 수 있다.

이번 작업에서는 경로 조건을 명확히 나누는 것이 중요했다.

## 트립토크 게시판 디자인 개선

`src/components/boards-list/list/index.tsx`와 `src/components/boards-list/search/index.tsx`를 product 페이지와 비슷한 톤으로 정리했다.

변경한 내용은 아래와 같다.

- `오늘 핫한 트립토크` 카드 영역 추가
- 게시판 리스트를 둥근 카드 박스 안에 배치
- 행마다 border와 여백을 주어 더 부드러운 목록 형태로 변경
- 검색 영역을 antd `RangePicker`, `Input`, `Button`으로 정리
- 삭제 버튼은 기존처럼 hover 시 보이도록 유지

기능 로직은 그대로 두고, 화면의 완성도와 가독성만 개선했다.

## antd 사용

오후에는 antd 컴포넌트를 적극적으로 활용했다.

사용한 주요 컴포넌트와 아이콘은 아래와 같다.

- `Button`
- `DatePicker.RangePicker`
- `Input`
- `SearchOutlined`
- `CalendarOutlined`
- `EditOutlined`
- `UserOutlined`
- `ApartmentOutlined`
- `BankOutlined`
- `FireOutlined`

antd는 날짜 입력, 검색 입력, 버튼처럼 상호작용이 있는 기본 UI를 빠르게 구성할 때 유용하다.

다만 디자인을 피그마처럼 맞추려면 Tailwind className을 함께 사용해 높이, radius, 여백, 색상을 조정해야 한다.

## 결제 API 회고

오전에 다룬 결제 흐름은 오후 마무리에서 다시 정리했다.

오늘 가장 크게 느낀 점은 결제 API 자체가 어렵다기보다, API가 어떤 비즈니스 이벤트를 의미하는지 설명이 부족하면 이해 비용이 커진다는 것이다.

결제 관련 API는 아래처럼 나누어 이해해야 한다.

```txt
포인트 충전
-> 실제 PG 결제 발생
-> PortOne paymentId 생성
-> createPointTransactionOfLoading(paymentId)
```

```txt
상품 구매
-> 이미 충전된 포인트 사용
-> PG 결제 아님
-> createPointTransactionOfBuyingAndSelling(useritemId)
```

즉, 상품 구매는 외부 결제가 아니라 포인트 차감이고, 포인트 충전만 PortOne 결제와 연결된다.

이 구조가 문서에서 명확하게 설명되어 있었다면 훨씬 빠르게 이해했을 것이다.

## AI 도움을 받은 부분에 대한 판단

오늘 오후에는 디자인 마크업을 AI 도움으로 빠르게 잡았다.

이 방식은 현재 학습 목표에 잘 맞는다고 판단했다.

현재 중요한 학습 포인트는 퍼블리셔 수준의 세밀한 마크업보다 아래 내용이기 때문이다.

- 데이터를 어떻게 화면에 렌더링하는지
- 검색 조건이 refetch에 어떻게 들어가는지
- 페이지네이션 상태가 어떻게 움직이는지
- 버튼 클릭이 어떤 route나 mutation으로 이어지는지
- 화면을 어떤 기준으로 컴포넌트 분리할지

따라서 AI가 만든 마크업을 그대로 외우는 것이 아니라, 구조를 읽고 직접 분리하면서 내 코드로 재조립하는 것이 중요하다.

## 남은 작업

다음 작업은 마크업을 더 늘리기보다 기능 연결과 구조 정리가 중심이 될 것 같다.

- `products/page.tsx`의 임시 상품 카드들을 실제 데이터 기반 렌더링으로 전환
- 상품 카드 컴포넌트 분리
- 카테고리 필터 영역 컴포넌트 분리
- 최근 본 상품 컴포넌트 분리 및 로직 연결
- 숙박권 판매하기 버튼 route 연결
- 예약 가능 / 예약 마감 탭 상태 연결
- 트립토크 등록 버튼 route 연결
- 보드 리스트 상단 핫 카드 이미지 데이터 처리 방식 결정
- `hook.ts`의 디버깅용 `console.log` 제거
- `.playwright-cli`, `output` 같은 검증 산출물 커밋 제외

## 오늘 오후 기준 결론

오후 작업은 큰 무리 없이 진행됐다.

퍼블리싱은 AI 도움을 받아 빠르게 완성도를 끌어올렸고, 결제 API에 대해서는 오전에 느꼈던 불친절함을 오후에 다시 정리하면서 흐름을 더 명확히 이해했다.

다음 스터디에서는 오늘 만든 화면을 컴포넌트 단위로 나누고, 실제 데이터와 이벤트 흐름을 연결하는 데 집중하면 된다.
