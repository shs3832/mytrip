# 2026-06-11 오전 스터디 일지

## 작업 범위

오늘 오전은 `homework39`의 테스트 코드 작성 흐름을 중심으로 정리했다.

처음에는 단순히 "상품 등록 페이지 API mocking test"를 작성하는 과제처럼 보였지만, 실제로는 아래 요소들이 한 번에 엮여 있었다.

```txt
Jest 설정
테스트 실행 환경
MSW mock server
Apollo Client
GraphQL mutation
React Testing Library
테스트 전용 컴포넌트
성공/실패 시나리오
```

그래서 오늘의 핵심은 테스트 문법을 많이 외우는 것이 아니라, 테스트가 실행될 때 어떤 역할들이 어떤 순서로 연결되는지 이해하는 것이었다.

## Jest 설정 파일의 역할

`jest.config.ts`는 Jest가 테스트를 어떤 환경에서 실행할지 정하는 파일이다.

오늘 기준으로 이 파일은 아래 역할을 한다.

```txt
Next.js 프로젝트 기준으로 Jest 설정을 만든다.
브라우저처럼 테스트할 수 있도록 jsdom 환경을 준비한다.
테스트 파일 실행 전에 jest.setup.ts를 먼저 실행한다.
MSW v2와 관련된 Web API 환경 문제를 줄인다.
```

이 파일은 매번 처음부터 직접 설계한다기보다, 프로젝트 환경에 맞는 기본 템플릿을 가져와 조금씩 조정하는 성격이 강하다.

따라서 지금 단계에서 중요한 것은 모든 옵션을 외우는 것이 아니라 아래 정도를 이해하는 것이다.

```txt
jest.config.ts
= 테스트 실행 환경을 정하는 파일

setupFilesAfterEnv
= 각 테스트 파일보다 먼저 실행할 준비 파일을 등록하는 옵션

testEnvironment
= 테스트를 Node 환경처럼 돌릴지, 브라우저 비슷한 환경처럼 돌릴지 정하는 옵션
```

## Jest setup 파일의 역할

`jest.setup.ts`는 테스트가 실제로 실행되기 전에 공통 준비 작업을 하는 파일이다.

현재 흐름은 아래와 같다.

```ts
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

각 코드의 의미는 아래와 같다.

```txt
beforeAll
= 전체 테스트가 시작되기 전에 mock server를 켠다.

afterEach
= 각 테스트가 끝날 때마다 테스트에서 임시로 바꾼 mock API를 원래대로 되돌린다.

afterAll
= 전체 테스트가 끝나면 mock server를 닫는다.
```

여기서 `resetHandlers()`는 Apollo cache를 초기화하는 것이 아니다.

정확히는 `server.use(...)`로 테스트 중간에 덮어쓴 MSW handler를 원래 상태로 되돌리는 역할이다.

## MSW mock server 흐름

MSW는 실제 백엔드 서버를 띄우는 것이 아니라, 테스트 중에 발생하는 네트워크 요청을 가로채서 가짜 응답을 내려주는 도구다.

현재 구조는 아래처럼 이해할 수 있다.

```txt
테스트 컴포넌트
  -> Apollo Client
  -> HttpLink("http://mock.com/graphql")
  -> MSW가 요청을 가로챔
  -> apis.ts에 정의한 응답 반환
```

`http://mock.com/graphql`은 실제 서버 주소가 아니다.

Apollo Client가 요청을 보내는 주소와 MSW의 `graphql.link(...)` 주소를 맞추기 위한 테스트용 약속이다.

```ts
const gql = graphql.link("http://mock.com/graphql");
```

```ts
new HttpLink({
  uri: "http://mock.com/graphql",
  fetch,
});
```

두 주소가 다르면 MSW가 요청을 제대로 가로채지 못한다.

## apis.ts의 역할

`src/commons/mocks/apis.ts`는 테스트에서 사용할 가짜 백엔드 API를 모아두는 파일이다.

예를 들어 `createTravelproduct` mutation을 테스트하려면, mock server도 같은 이름의 mutation을 알고 있어야 한다.

```ts
gql.mutation("createTravelproduct", ({ variables }) => {
  const inputs = variables.createTravelproductInput;

  return HttpResponse.json({
    data: {
      createTravelproduct: {
        _id: "qqq",
        name: inputs.name,
        remarks: inputs.remarks,
        contents: inputs.contents,
        price: inputs.price,
        images: inputs.images ?? [],
        tags: inputs.tags ?? [],
        travelproductAddress: inputs.travelproductAddress ?? null,
        __typename: "Travelproduct",
      },
    },
  });
});
```

이 코드는 아래 의미를 가진다.

```txt
createTravelproduct 요청이 오면
variables.createTravelproductInput을 읽고
등록이 성공한 것처럼 JSON 응답을 돌려준다.
```

여기서 중요한 점은 mock API도 테스트 목적에 맞게 설계해야 한다는 것이다.

## ...inputs의 장단점

mock 응답을 만들 때 아래처럼 처리할 수도 있다.

```ts
createTravelproduct: {
  _id: "qqq",
  ...inputs,
  __typename: "Travelproduct",
}
```

이 방식은 빠르고 간단하다.

하지만 단점도 있다.

```txt
프론트에서 보낸 값이 그대로 응답으로 돌아오기 때문에
백엔드가 실제로 어떤 필드를 내려주는지 검증하기 어렵다.
```

따라서 테스트 목적에 따라 선택이 달라진다.

```txt
성공 흐름만 확인하고 싶다
-> ...inputs로 간단히 처리해도 된다.

백엔드 응답 형태까지 확인하고 싶다
-> 실제 스펙에 맞게 필드를 명시하는 것이 좋다.
```

오늘 기준으로는 API mocking의 개념을 익히는 단계이므로, 지나치게 모든 응답 검증을 넣기보다 핵심 흐름을 작게 통과시키는 것이 더 적절했다.

## 성공 시나리오와 실패 시나리오

테스트는 보통 성공 케이스만 확인하지 않는다.

오늘 정리한 흐름은 아래와 같다.

```txt
기본 apis.ts
= 성공 응답

특정 테스트 안의 server.use(...)
= 그 테스트에서만 실패 응답으로 덮어쓰기
```

예를 들어 실패 테스트에서는 아래처럼 기본 handler를 임시로 교체할 수 있다.

```ts
server.use(
  gql.mutation("createTravelproduct", () => {
    return HttpResponse.json({
      errors: [{ message: "상품 등록에 실패했습니다." }],
    });
  }),
);
```

이렇게 하면 같은 API 이름을 사용하되, 테스트 시나리오에 따라 다른 응답을 줄 수 있다.

테스트가 끝나면 `jest.setup.ts`의 `server.resetHandlers()`가 실행되어 기본 성공 handler로 되돌아간다.

## 전체 페이지 대신 테스트 전용 컴포넌트를 둔 이유

상품 등록 페이지 전체를 바로 테스트하려고 하면 고려할 것이 많다.

```txt
ReactQuill
Ant Design InputNumber
주소 검색 모달
파일 업로드
react-hook-form
zod validation
router 이동
Apollo Provider
브라우저 API mock
```

이런 요소를 모두 한 번에 테스트하면, 정작 API mocking 흐름을 배우기 전에 설정 문제에서 막히기 쉽다.

그래서 오늘은 테스트 전용 컴포넌트를 작게 만들어서 아래만 확인했다.

```txt
버튼 클릭
createTravelproduct mutation 실행
MSW가 응답 반환
성공이면 "등록 성공" 표시
실패이면 "등록 실패" 표시
```

이 테스트는 전체 상품 등록 페이지 테스트는 아니지만, Apollo와 MSW가 연결되는 핵심 흐름을 확인하는 데 충분한 가치가 있다.

## 경험의 영역으로 남는 부분

오늘 느낀 것처럼 테스트 설정은 코드 자체보다 경험에서 나오는 판단이 많다.

특히 아래 부분은 처음부터 완전히 이해하기 어렵다.

```txt
Jest 버전과 Next.js 버전 궁합
MSW v1/v2 문법 차이
jsdom 환경에서 부족한 Web API
Apollo Client 테스트 설정
ESM/CJS 모듈 해석 문제
동적 import나 브라우저 전용 라이브러리 mock 처리
```

이런 부분은 프론트 개발을 오래 해도 매번 프로젝트마다 조금씩 다르다.

그래서 지금 단계에서 목표는 모든 설정을 외우는 것이 아니라 아래 기준을 잡는 것이다.

```txt
config/setup은 템플릿에 가깝다.
문제가 나면 버전과 환경을 확인한다.
mock API와 테스트 시나리오가 실제 학습 포인트다.
작게 통과하는 테스트부터 만든다.
```

## 오늘 정리한 핵심

- `jest.config.ts`는 테스트 실행 환경을 정하는 파일이다.
- `jest.setup.ts`는 테스트 전후 공통 준비 작업을 담당한다.
- MSW는 실제 백엔드가 아니라 요청을 가로채는 mock server다.
- Apollo `HttpLink`의 `uri`와 MSW `graphql.link(...)` 주소는 같아야 한다.
- `apis.ts`는 테스트용 가짜 API 응답을 정의하는 파일이다.
- 기본 API는 성공 응답으로 두고, 실패 케이스는 테스트 안에서 `server.use(...)`로 덮어쓸 수 있다.
- `resetHandlers()`는 Apollo cache 초기화가 아니라 MSW handler override 초기화다.
- mock API는 가능하면 백엔드 스펙을 기준으로 작성하는 것이 좋다.
- 백엔드 스펙이 없으면 UI 요구사항을 기준으로 임시 계약을 만들 수 있지만, 실제 API가 나오면 반드시 맞춰야 한다.
- `...inputs`는 빠르지만 응답 스펙 검증에는 약하다.
- 전체 페이지 테스트가 너무 무거우면 테스트 전용 작은 컴포넌트로 핵심 흐름부터 확인해도 가치가 있다.

## 다음에 다시 볼 것

- `page.test.tsx`에서 성공 테스트와 실패 테스트 흐름 다시 읽기
- `apis.ts`에서 mock 응답이 실제 GraphQL 응답 형태와 맞는지 확인하기
- 상품 등록 페이지 전체 테스트로 확장할지, mutation 흐름 테스트만 유지할지 판단하기
- form validation 실패 케이스를 테스트할지 검토하기
- 테스트 파일이 길어질 경우 helper 함수로 render/ApolloClient 생성 로직 분리하기

오늘 오전은 테스트 코드 자체보다 테스트 환경을 바라보는 관점을 잡은 시간이었다.

테스트는 처음부터 거대한 통합 테스트로 들어가면 난이도가 급격히 올라간다. 지금은 작은 성공/실패 흐름을 직접 통과시켜보면서, 어디까지가 설정이고 어디부터가 테스트 설계인지 구분한 것이 가장 큰 수확이다.
