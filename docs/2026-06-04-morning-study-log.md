# 2026-06-04 오전 스터디 노트

## 오늘의 작업 범위

homework30의 포인트 충전, 상품 구매, 마이페이지 포인트 내역 흐름을 중심으로 점검했다.

오늘 오전의 핵심은 `PortOne` 결제와 GraphQL 포인트 API가 각각 어떤 역할을 하는지 분리해서 이해하는 것이었다.

## 포인트 충전과 상품 구매는 다른 흐름

처음에는 결제와 구매 흐름이 조금 섞여 있었다.

정리 후에는 아래처럼 역할을 나눠서 이해했다.

```txt
포인트 충전:
PortOne.requestPayment
-> 결제 성공 후 paymentId 수신
-> createPointTransactionOfLoading(paymentId)
-> 유저 포인트 증가

상품 구매:
현재 유저 포인트와 상품 가격 비교
-> 포인트 부족: 포인트 충전 모달 열기
-> 포인트 충분: createPointTransactionOfBuyingAndSelling(useritemId)
-> 구매자 포인트 차감, 판매자 포인트 증가
```

중요한 점은 상품 구매 API가 외부 결제를 직접 처리하는 API가 아니라는 것이다.

상품 구매는 이미 보유한 포인트로 처리하고, 포인트가 부족한 경우에만 포인트 충전 흐름으로 넘어가는 것이 자연스럽다.

## PortOne paymentId와 백엔드 검증

포인트 충전에서는 프론트에서 `paymentId`를 생성해서 PortOne 결제 요청에 넘긴다.

```ts
const paymentId = `payment_${crypto.randomUUID()}`;
```

결제가 성공하면 PortOne 응답에도 같은 `paymentId`가 돌아온다.

그 다음 백엔드에는 PortOne 응답의 `rsp.paymentId`를 넘기는 것이 안전하다.

```ts
await add_point({
  variables: {
    paymentId: rsp.paymentId,
  },
});
```

여기서 중요한 점은 `createPointTransactionOfLoading`이 단순히 문자열을 저장하는 API가 아니라는 것이다.

백엔드는 이 `paymentId`로 PortOne 결제 내역을 다시 조회하고 검증한다.

따라서 프론트의 `storeId`, `channelKey`와 백엔드가 검증에 사용하는 PortOne 계정이 서로 맞아야 한다.

이번에 직접 확인한 흐름은 다음과 같다.

```txt
내 PortOne storeId로 결제
-> 프론트 결제는 성공
-> 백엔드 검증 단계에서 404 발생

강의 제공업체 storeId로 결제
-> 프론트 결제 성공
-> 백엔드 검증 성공
-> 포인트 충전 성공
```

프론트 결제 성공과 백엔드 포인트 충전 성공은 같은 단계가 아니다.

실무에서도 결제는 반드시 백엔드 검증까지 통과해야 최종 완료로 봐야 한다.

## 포인트 부족 모달과 충전 모달

상품 구매 버튼을 누르면 먼저 구매 확인 모달을 보여준다.

확인을 누르면 `handlePurchase`에서 유저 포인트와 상품 가격을 비교한다.

```txt
포인트 충분:
createPointTransactionOfBuyingAndSelling 호출

포인트 부족:
포인트 부족 모달 표시
-> 확인
-> 포인트 충전 모달 표시
```

이번에 모달을 두 종류로 나눴다.

```txt
ProductDetailModalComponent
-> 제목, 내용, 확인/취소 버튼만 있는 공통 확인 모달

PointModalComponent
-> 충전 금액 Select가 들어가는 포인트 충전 전용 모달
```

같은 스타일이라도 입력 UI나 역할이 다르면 별도 컴포넌트로 분리하는 것이 오히려 읽기 쉽다.

공통화는 스타일이 같다는 이유만으로 무조건 하는 것이 아니라, props가 지나치게 복잡해지지 않는 선에서 해야 한다.

## GraphQL 에러와 프론트 에러 구분

포인트 충전 중 아래 에러를 확인했다.

```txt
Request failed with status code 404
path: ["createPointTransactionOfLoading"]
```

이 경우 브라우저가 GraphQL 서버에 요청을 못 보낸 것이 아니다.

GraphQL 서버는 응답했지만, 서버 내부에서 PortOne 결제 검증 중 404가 난 것이다.

그래서 로그를 볼 때는 아래처럼 구분해야 한다.

```txt
networkError
-> 프론트가 GraphQL 서버와 통신 자체를 못 한 경우

graphQLErrors
-> GraphQL 서버는 응답했지만 operation 처리 중 문제가 생긴 경우
```

이번 케이스는 `networkError`가 아니라 `graphQLErrors` 쪽이었다.

## GraphQL 필드는 필요한 것만 요청하기

마이페이지 포인트 내역에서 아래 에러를 확인했다.

```txt
Cannot return null for non-nullable field User.name.
```

이 에러는 프론트의 optional chaining으로 막을 수 없다.

GraphQL 서버가 응답을 만들기 전에 schema와 실제 데이터가 충돌해서 터진다.

원인은 대략 아래와 같다.

```txt
schema: User.name은 String!이라 null 불가
실제 데이터: 어떤 user.name이 null
결과: 서버가 응답 생성 중 에러 발생
```

마이페이지 포인트 내역에서는 사용자 이름이 꼭 필요하지 않으므로 `user.name` 요청을 제거하는 방식으로 해결했다.

프론트에서는 화면에 필요한 필드만 요청하는 것이 좋다.

특히 공용 강의 API나 테스트 데이터에서는 schema와 실제 데이터가 완전히 맞지 않는 경우가 있을 수 있다.

## 마이페이지 포인트 내역 표시

포인트 내역 페이지에서 `fetchPointTransactions`를 사용해 전체 포인트 거래내역을 표시했다.

현재 화면에서 중요한 필드는 다음이다.

```txt
createdAt
status
amount
balance
travelproduct.name
```

숫자는 `Intl.NumberFormat("ko-KR")`로 세 자리 콤마를 붙였다.

```ts
const formatNumberWithComma = (value?: number | null) => {
  return new Intl.NumberFormat("ko-KR").format(value ?? 0);
};
```

거래 상태에 따른 색상은 JSX 안에 직접 조건을 늘어놓기보다 함수로 분리했다.

```ts
const getStatusColor = (status: string) => {
  if (status === "충전") return "text-green-500";
  if (status === "판매") return "text-red-500";
  if (status === "구매") return "text-blue-500";
  return "text-gray-900";
};
```

이런 작은 분리는 코드가 길어질수록 가독성에 도움이 된다.

## 오늘 확인한 중요한 개념

- PortOne 결제 성공과 백엔드 포인트 충전 성공은 별도 단계다.
- `paymentId`는 결제 건을 백엔드가 다시 검증하기 위한 식별자다.
- 포인트 충전은 `createPointTransactionOfLoading`을 사용한다.
- 상품 구매는 `createPointTransactionOfBuyingAndSelling`을 사용한다.
- 포인트가 부족할 때만 충전 흐름으로 넘어간다.
- GraphQL은 요청한 필드가 schema와 실제 데이터에 맞지 않으면 응답 생성 중 에러가 날 수 있다.
- 화면에 필요 없는 GraphQL 필드는 요청하지 않는 것이 좋다.
- 같은 모달 스타일이라도 역할이 다르면 별도 컴포넌트로 나눠도 괜찮다.

## 다음에 정리할 부분

- `handlePurchase` 안에 남은 디버그성 코드와 불필요한 변수 제거
- 상품 구매 성공 후 `fetchUserLoggedIn` 또는 포인트 내역 refetch 여부 결정
- 포인트 내역의 충전, 구매, 판매 탭을 각각 전용 쿼리로 연결
- 마이페이지 포인트 내역 타입을 `any` 대신 명시적인 타입 또는 codegen 타입으로 정리
- 사용하지 않는 import와 props 정리
