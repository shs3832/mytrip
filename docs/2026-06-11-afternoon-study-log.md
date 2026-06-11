# 2026-06-11 오후 스터디 일지

## 오늘의 주제

오후에는 `homework40`을 중심으로 프로덕션 빌드에서 드러나는 문제를 정리했다. 단순히 화면을 컴포넌트로 나누는 수준을 넘어서, Next.js App Router에서는 컴포넌트가 서버에서 실행되는지, 클라이언트에서 실행되는지, 빌드 시점에 어떤 값을 알 수 있는지까지 함께 봐야 한다는 점을 확인했다.

## 과거 과제 라우트 정리

오래된 `homework` 코드가 최신 공통 컴포넌트나 fragment 경로 변경의 영향을 받아 빌드를 깨뜨릴 수 있었다.

현재 흐름 확인용으로만 남겨둘 과거 과제들은 `study-archive`로 옮기고, 실제 앱 라우트에서는 `homework40` 중심으로 확인하는 방향이 적절하다고 판단했다.

핵심은 다음과 같다.

- 과거 코드는 학습 기록으로 보존한다.
- 현재 빌드 대상에서는 제외한다.
- `tsconfig.json`의 `exclude`에 `study-archive`를 추가해 타입 검사 대상에서도 제외한다.

이 방식은 과거 코드를 무리하게 고치지 않으면서도 현재 과제의 빌드 안정성을 확인할 수 있다는 장점이 있다.

## 빌드 전 확인 명령어

빌드 에러를 한 번에 보는 것도 좋지만, 원인을 나눠서 보는 것이 더 이해하기 쉬웠다.

```bash
npx tsc --noEmit
npm run lint
npm run build
```

- `npx tsc --noEmit`: 타입 에러 확인
- `npm run lint`: 문법, 규칙, 잠재 문제 확인
- `npm run build`: 실제 프로덕션 빌드와 prerender 문제 확인

개발 서버에서는 괜찮아 보여도 `npm run build`에서만 드러나는 문제가 있었다. 특히 App Router의 정적 prerender 단계에서는 브라우저에서만 알 수 있는 값이나 클라이언트 훅 사용 방식이 더 엄격하게 드러난다.

## GraphQL Fragment 정리

GraphQL fragment는 반복되는 응답 필드를 재사용하는 데 유용하다. 다만 codegen 설정에 따라 fragment masking이 적용되면, fragment를 사용한 결과를 바로 일반 객체처럼 다룰 수 없을 수 있다.

예를 들어 `BoardsItemSet` fragment를 사용한 board list 항목은 타입상 fragment reference를 포함한 형태가 될 수 있다.

```ts
"$fragmentRefs"
```

이 경우 `el._id`, `el.title`처럼 바로 접근하면 타입 에러가 날 수 있다. 이럴 때는 다음 중 하나를 선택해야 한다.

- `useFragment`로 fragment 데이터를 풀어서 사용한다.
- 단순 리스트라면 query에 직접 필드를 적어 타입을 단순하게 유지한다.
- 프로젝트 정책에 따라 fragment masking을 끄는 방법도 검토한다.

실무적으로는 fragment를 무조건 많이 쓰기보다, 반복되는 응답 필드가 많고 여러 쿼리에서 실제로 공유될 때 사용하는 편이 더 자연스럽다.

## Generated 타입과 수동 타입

댓글 답글처럼 GraphQL 응답 타입이 이미 codegen으로 만들어지는 경우에는 수동 타입을 계속 유지하면 오히려 타입이 어긋날 수 있다.

예를 들어 답글 항목 타입은 직접 작성한 타입보다 query 응답 타입에서 꺼내오는 편이 안전하다.

```ts
import type { FetchTravelproductQuestionAnswersForListQuery } from "@/commons/graphql/graphql";

export type IReplyQuestionElement =
  FetchTravelproductQuestionAnswersForListQuery["fetchTravelproductQuestionAnswers"][number];
```

이렇게 하면 백엔드 응답 필드가 바뀌었을 때 codegen 결과를 기준으로 타입이 함께 따라간다.

또한 `createdAt`처럼 codegen에서 `unknown`으로 잡히는 값은 렌더링 직전에 `String()`으로 처리하거나, 필요한 곳에서 명확하게 변환해주는 것이 좋다.

## Optional Chaining과 Null 처리

`typeof value === "undefined"`로 undefined만 걸러내는 방식은 null까지 처리하지 못한다.

특히 다음처럼 중간 객체가 null일 수 있는 경우에는 안전하지 않다.

```tsx
data?.fetchUserLoggedIn?.userPoint.amount
```

이 경우 `userPoint` 자체가 null이면 `.amount` 접근에서 문제가 생길 수 있으므로 다음처럼 중간에도 optional chaining을 넣는 것이 안전하다.

```tsx
data?.fetchUserLoggedIn?.userPoint?.amount
```

그리고 포맷 함수가 이미 `value ?? 0`을 처리한다면 호출부는 더 단순하게 유지할 수 있다.

## useSearchParams와 Suspense

프로덕션 빌드에서 가장 중요한 에러는 다음 흐름이었다.

```txt
useSearchParams() should be wrapped in a suspense boundary
```

`useSearchParams`는 브라우저의 현재 URL query string을 읽는 클라이언트 훅이다. 그런데 Next.js는 프로덕션 빌드 중 일부 페이지를 미리 정적으로 만들려고 한다. 이때 서버는 실제 브라우저 주소의 search params를 알 수 없기 때문에, 해당 부분을 클라이언트 렌더링 영역으로 분리하라고 요구한다.

그래서 `useSearchParams`를 직접 또는 간접적으로 사용하는 컴포넌트는 `Suspense` 안에 있어야 한다.

중요한 점은 `Suspense`의 위치다.

좋은 구조:

```tsx
function PageContent() {
  const props = useBoardList();
  return <BoardListComponent {...props} />;
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  );
}
```

주의할 구조:

```tsx
export default function Page() {
  const props = useBoardList();

  return (
    <Suspense fallback={null}>
      <BoardListComponent {...props} />
    </Suspense>
  );
}
```

두 번째 방식은 이미 `Suspense` 바깥에서 `useBoardList`가 실행되므로 빌드 에러를 해결하지 못한다.

## 공통 레이아웃의 영향

개별 페이지를 고쳤는데도 같은 에러가 계속 난다면, 공통 레이아웃이나 네비게이션 컴포넌트를 확인해야 한다.

이번에는 `NavigationComponent`처럼 여러 페이지에서 공통으로 렌더링되는 컴포넌트가 `useSearchParams`를 사용하고 있을 가능성도 확인했다.

이 경우 페이지별로 감싸는 것만으로는 부족하고, 해당 공통 컴포넌트 자체를 `Suspense` 경계 안에 넣어야 한다.

```tsx
<Suspense fallback={null}>
  <NavigationComponent />
</Suspense>
```

## AntD와 Client Boundary

AntD 컴포넌트는 대체로 클라이언트 컴포넌트에서 사용하는 것이 안전하다.

`DatePicker`, `Input`, `Button`처럼 브라우저 상호작용을 전제로 하는 UI 라이브러리 컴포넌트를 서버 컴포넌트에서 바로 사용하면 빌드 단계에서 예상치 못한 에러가 날 수 있다.

이런 경우 해당 컴포넌트 파일 상단에 `"use client"`를 명시하거나, AntD를 사용하는 부분만 클라이언트 컴포넌트로 분리하는 것이 좋다.

```tsx
"use client";
```

## Suspense의 역할 정리

`Suspense`는 단순히 로딩 UI를 보여주는 도구로만 볼 수 있지만, App Router에서는 서버 렌더링과 클라이언트 렌더링의 경계를 나누는 데도 중요하다.

이번 경우에는 다음 의미에 가까웠다.

- 서버가 미리 렌더링할 수 있는 부분은 먼저 렌더링한다.
- 브라우저에서만 알 수 있는 값이 필요한 부분은 `fallback`으로 잠시 대체한다.
- 클라이언트에서 hydrate된 뒤 실제 컴포넌트를 렌더링한다.

즉, `useSearchParams` 같은 브라우저 의존 훅은 `Suspense`를 통해 서버 빌드 단계와 분리해줘야 한다.

## AWS 동적 배포 개념

S3 버킷 이름은 도메인을 구매해야만 사용할 수 있는 값이 아니다. 버킷 이름은 AWS 전체에서 고유해야 하는 이름일 뿐이다.

Next.js 동적 배포 관점에서는 다음처럼 나누어 볼 수 있다.

- S3 + CloudFront: 정적 파일 배포에 적합
- Amplify Hosting: Next.js SSR 배포를 비교적 쉽게 처리
- EC2: 직접 Node 서버를 띄우는 방식
- S3: 이미지, 첨부파일 같은 정적 리소스 저장소로 활용 가능

동적 SSR이 필요한 Next.js 앱이라면 단순 S3 배포만으로는 부족하다. 학습 목적이라면 Amplify Hosting이나 EC2 배포 흐름을 먼저 이해하는 것이 좋다.

## 오늘 정리한 핵심

- 컴포넌트 분리는 UI 기준만이 아니라 실행 위치 기준도 함께 봐야 한다.
- App Router에서는 서버 컴포넌트, 클라이언트 컴포넌트, Suspense 경계가 빌드 안정성과 직접 연결된다.
- 개발 서버에서 괜찮아도 프로덕션 빌드에서만 드러나는 문제가 있다.
- `useSearchParams`는 브라우저 URL에 의존하므로 Suspense 경계가 필요할 수 있다.
- 공통 레이아웃에 있는 클라이언트 훅은 모든 페이지 빌드에 영향을 줄 수 있다.
- GraphQL fragment는 재사용성이 있지만, codegen fragment masking과 함께 쓰면 타입 사용법을 알아야 한다.
- 오래된 학습 코드는 보존하되 현재 빌드 대상과 분리하는 것이 좋다.

## 다음에 이어서 볼 것

- `npm run build`를 다시 실행해 남은 prerender 에러 확인
- `useSearchParams`를 사용하는 공통 컴포넌트 추가 점검
- AntD를 사용하는 컴포넌트의 `"use client"` 경계 확인
- fragment를 유지할 곳과 직접 필드로 단순화할 곳 구분
- `homework40` 기준으로 현재 앱의 빌드 가능한 범위 확정
