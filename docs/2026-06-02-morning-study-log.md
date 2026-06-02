# 2026-06-02 오전 스터디 노트

## 오늘의 작업 범위

homework26 여행상품 상세 페이지를 중심으로 상품 상세, 스크랩, 구매, 문의 댓글, 답변 컴포넌트 흐름을 점검했다.

오늘 오전의 핵심은 기능을 하나 더 붙이는 것보다, 이미 길어진 코드를 어떻게 나누고 이름을 어떻게 붙여야 나중에 다시 읽을 수 있는지 확인하는 쪽이었다.

## GraphQL operation 이름 정리

codegen 실행 중 아래 에러를 확인했다.

```txt
Not all operations have an unique name: uploadFile, fetchTravelproduct
```

GraphQL에서 실제 백엔드 API 필드 이름은 같아도 된다.

예를 들어 백엔드 필드는 그대로 사용할 수 있다.

```graphql
uploadFile(file: $file)
fetchTravelproduct(travelproductId: $travelproductId)
```

하지만 프론트에서 작성하는 operation 이름은 프로젝트 전체에서 고유해야 한다.

```graphql
mutation uploadTravelproductFile
query fetchTravelproductForDetail
query fetchTravelproductForEdit
```

codegen은 operation 이름을 기준으로 타입과 훅 이름을 만들기 때문에, 같은 이름이 여러 파일에 있으면 어떤 타입을 기준으로 생성해야 할지 알 수 없다.

그래서 `allowPartialOutputs=true`로 우회하기보다, 중복 operation 이름을 수정하는 것이 맞다.

이번에 정리한 방향은 다음과 같다.

- 게시글 이미지 업로드: `uploadBoardFile`
- 여행상품 이미지 업로드: `uploadTravelproductFile`
- 여행상품 상세 조회: `fetchTravelproductForDetail`
- 여행상품 수정 조회: `fetchTravelproductForEdit`
- 문의 답변 목록 조회: 용도별로 고유한 operation 이름 사용

정리 후 `npm run codegen`이 성공했다.

## 상품 상세 페이지 흐름

중심 파일은 다음이다.

```txt
src/app/homework26/products/[productId]/page.tsx
```

현재 상세 페이지에서 다루는 데이터는 크게 네 가지다.

- 상품 상세 정보
- 로그인한 사용자 정보
- 상품 문의 목록
- 스크랩 및 구매 mutation 결과

상품 작성자 본인 여부는 상품의 판매자 id와 로그인한 사용자 id를 비교해서 판단한다.

```ts
const isMine =
  data?.fetchTravelproduct?.seller?._id === userData?.fetchUserLoggedIn?._id;
```

이 값은 UI 노출 여부를 정하는 데 사용된다.

예를 들어 판매자만 답변 입력창을 볼 수 있게 하거나, 작성자만 수정/삭제 버튼을 볼 수 있게 하는 흐름이다.

중요한 점은 프론트에서 UI를 숨기는 것은 사용자 경험을 위한 처리이고, 실제 권한 검사는 백엔드에서도 반드시 해야 한다는 것이다.

## 구매 에러 처리

구매 API를 호출했을 때 아래처럼 HTTP status는 200인데 GraphQL `errors`에 에러가 내려오는 경우를 확인했다.

```txt
message: "포인트가 부족합니다."
path: ["createPointTransactionOfBuyingAndSelling"]
```

GraphQL은 HTTP 요청 자체는 성공했지만, GraphQL operation 처리 중 에러가 발생하면 200 응답 안에 `errors` 배열을 담아 내려줄 수 있다.

이 경우 프론트에서는 `try/catch`에서 `ApolloError`를 받아 메시지를 꺼내 보여주는 방식이 적절하다.

```ts
if (error instanceof ApolloError) {
  const message = error.graphQLErrors[0]?.message;
}
```

스터디 단계에서는 `Modal.error`로 사용자에게 에러 메시지를 보여주는 정도면 충분하다.

실무에서는 포인트 부족, 로그인 필요, 판매자 본인 구매 불가 같은 케이스를 메시지와 UI 흐름으로 더 세분화한다.

## pickedCount와 toggle API

`pickedCount`는 상품이 몇 번 스크랩되었는지 나타내는 총합 값으로 보인다.

다만 이것만으로는 현재 로그인한 사용자가 이 상품을 스크랩했는지 알 수 없다.

즉 아래 두 개는 다른 정보다.

- `pickedCount`: 전체 스크랩 수
- `isPicked`: 내가 스크랩했는지 여부

현재 API가 `toggleTravelproductPick` 형태라면 누를 때마다 서버에서 스크랩 상태를 반대로 바꾸는 구조다.

하지만 프론트에서 아이콘을 정확히 채우거나 비우려면, 결국 현재 사용자의 스크랩 여부를 알 수 있어야 한다.

homework에서는 `pickedCount`를 refetch해서 숫자를 갱신하는 정도로 진행해도 되지만, 실무라면 `isPicked` 같은 필드가 필요하다.

## 문의 댓글과 답변 컴포넌트 분리

이번 오전에 가장 의미 있는 부분은 댓글/답변 구조를 컴포넌트 단위로 나눠본 것이다.

현재 흐름은 대략 이렇게 볼 수 있다.

```txt
상품 상세 페이지
  -> 문의 작성 컴포넌트
  -> 문의 목록 컴포넌트
       -> 문의 하나의 카드
       -> 문의 수정 폼
       -> 답변 작성 폼
       -> 답변 목록
            -> 답변 하나의 카드
            -> 답변 수정 폼
```

컴포넌트를 분리할 때 중요한 기준은 “상태가 어디에 묶여 있어야 자연스러운가”이다.

문의 하나마다 수정 여부가 다르고, 답변 작성창이 열렸는지도 다르다.

그래서 문의 카드 하나를 기준으로 상태를 관리하는 방향이 자연스럽다.

## questionId 흐름

답변은 상품 전체에 달리는 것이 아니라 특정 문의에 달린다.

그래서 답변 조회, 작성, 삭제 후 refetch에는 모두 문의 id가 필요하다.

이때 변수명을 그냥 `id`라고 쓰면 헷갈리기 쉽다.

현재 더 명확한 흐름은 다음과 같다.

```ts
const questionId = question._id;
useProductDetail({ questionId });
```

그리고 답변 작성 시에도 어느 문의에 답변을 다는지 명확히 전달한다.

```ts
handleWriteReply(questionId, replyContents);
```

이 방식은 코드가 길어질수록 중요해진다.

`id`라는 이름만 있으면 상품 id인지, 문의 id인지, 답변 id인지 금방 헷갈린다.

앞으로는 다음처럼 구체적인 이름을 쓰는 편이 좋다.

- `productId`
- `questionId`
- `answerId`
- `userId`

## 답변 타입 정리

답변 목록에서 사용하는 타입은 `types.ts`로 분리했다.

```ts
export type IReplyQuestionElement = {
  _id: string;
  contents: string;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
};
```

GraphQL에서는 백엔드 스키마가 기준이지만, 프론트 타입은 실제 query에서 가져오는 필드 기준으로 작성하는 것이 좋다.

백엔드 타입 전체를 그대로 가져와도 되지만, 화면에서 실제로 쓰지 않는 필드까지 타입에 넣으면 컴포넌트가 괜히 무거워진다.

이번 경우에는 답변 카드에서 필요한 최소 필드를 기준으로 타입을 잡는 것이 적절하다.

## REST API였다면 타입은 어떻게 잡는가

GraphQL은 schema와 codegen을 통해 타입을 자동 생성하기 쉽다.

REST API는 보통 다음 중 하나를 사용한다.

- 직접 TypeScript type/interface 작성
- OpenAPI/Swagger 기반 타입 자동 생성
- zod 같은 런타임 검증 라이브러리로 응답 검증

간단한 과제나 작은 프로젝트에서는 직접 타입을 작성해도 된다.

실무에서는 API 스펙이 크기 때문에 OpenAPI 기반 자동 생성이나 zod 검증을 함께 쓰는 경우가 많다.

## 오늘 배운 핵심 개념

- GraphQL operation 이름은 프로젝트 전체에서 고유해야 한다.
- operation 이름과 백엔드 field 이름은 다르다.
- codegen 에러는 우회보다 원인 수정이 우선이다.
- GraphQL은 HTTP 200이어도 `errors` 배열로 실패를 내려줄 수 있다.
- `pickedCount`는 전체 카운트이지, 내가 눌렀는지 여부가 아니다.
- UI 권한 제어와 백엔드 권한 검사는 역할이 다르다.
- 컴포넌트 분리는 “상태가 어디에 속하는가”를 기준으로 생각하면 쉽다.
- `id` 대신 `questionId`, `answerId`처럼 구체적인 이름을 쓰면 흐름이 선명해진다.
- GraphQL 타입은 백엔드 스키마를 기준으로 하되, 프론트에서는 실제 query 필드 기준으로 다루는 것이 좋다.

## 현재 코드에 대한 느낌

오늘 작업한 코드는 아직 완전히 정돈된 상태라기보다는, 복잡한 기능을 직접 부딪히며 구조를 잡아가는 단계에 가깝다.

하지만 중요한 변화가 있다.

예전에는 기능 하나가 막히면 그 코드 조각만 보게 됐다면, 지금은 다음 흐름을 같이 보고 있다.

```txt
데이터가 어디서 오나
어떤 id가 필요한가
어느 컴포넌트가 상태를 가져야 하나
mutation 후 어떤 query를 갱신해야 하나
타입은 어디까지 명시해야 하나
```

이 관점이 생긴 것은 단순 퍼블리싱보다 훨씬 개발자 쪽 사고에 가깝다.

속도가 느린 것은 이상한 게 아니라, 지금 다루는 범위가 이미 꽤 크기 때문이다.

## 오후에 이어서 보면 좋은 것

오후에는 새 기능을 크게 늘리기보다 정리 위주로 보면 좋다.

- `comment-list/index.tsx`의 답변 map에서 `any` 제거하기
- `comment-reply/hook.ts`의 `id`를 `answerId`로 바꾸기
- `DELET_TRAVEL_PRODUCT_QUESTION_ANSWER` 오타를 `DELETE_...`로 수정하기
- 스크랩 refetch에 `travelproductId` variables가 필요한지 확인하기
- 사용하지 않는 변수와 console.log 제거하기
- `graphql.config.yaml`을 실제로 사용할지 확인하기
- 정리 후 `npm run codegen`과 타입체크 다시 실행하기

## 마무리

오늘 오전은 코드 양이 늘어난 만큼 헷갈림도 늘었지만, 그 헷갈림을 컴포넌트 구조, id 이름, GraphQL operation 이름, 타입 기준으로 하나씩 분해해본 시간이었다.

지금 단계에서는 완벽하게 한 번에 짜는 것보다, 복잡해진 코드를 다시 읽히게 만드는 경험이 훨씬 중요하다.
