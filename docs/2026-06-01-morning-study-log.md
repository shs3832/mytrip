# 2026-06-01 오전 스터디 일지

## 작업 범위

오늘은 `homework26` 여행상품 상세 페이지와 상품 등록/수정 흐름을 이어서 점검했다.

주요 범위는 아래와 같다.

- 여행상품 상세 페이지에서 `fetchTravelproduct` 데이터 렌더링
- `contents` HTML 문자열을 안전하게 표시하는 방법
- `dangerouslySetInnerHTML`과 XSS 위험
- `DOMPurify`를 이용한 HTML sanitize
- 한국 원화 가격 표시용 `Intl.NumberFormat`
- GraphQL mutation 반환 필드 선택 규칙
- `createTravelproductQuestion` 문의 등록 흐름
- React controlled input과 textarea 초기화
- `event.target.value`, state, DOM 직접 접근의 차이
- 수정 완료 후 이동 로직 점검

오늘은 기능 자체보다 “React에서 어떤 값을 공식 값으로 볼 것인가”를 많이 다뤘다. 코드가 길어질수록 예전 코드가 낯설어지는 것은 자연스럽고, 새로 짜는 코드는 오히려 최근에 배운 기준이 적용되기 때문에 더 잘 풀릴 수 있다.

## 상품 상세 페이지 데이터 흐름

상세 페이지는 URL의 `productId`를 읽고, 해당 ID로 상품 상세 데이터를 조회한다.

```txt
useParams()
-> productId 추출
-> fetchTravelproduct query 실행
-> data.fetchTravelproduct 렌더링
```

상세 페이지에서 사용하는 주요 데이터는 아래와 같다.

```txt
name
remarks
price
contents
images
tags
travelproductAddress
seller
```

중요한 점은 `data`가 처음 렌더링 시점에는 아직 없을 수 있다는 것이다.

그래서 화면에서는 아래처럼 optional chaining을 사용한다.

```tsx
data?.fetchTravelproduct?.name
data?.fetchTravelproduct?.price
data?.fetchTravelproduct?.tags
```

이 패턴은 서버 데이터가 아직 도착하지 않은 첫 렌더링에서 에러를 막기 위한 방어 코드다.

## HTML contents 렌더링

`ReactQuill` 같은 에디터에서 저장된 `contents`는 일반 문자열이 아니라 HTML 문자열이다.

예를 들면 아래와 같은 형태다.

```html
<p>여행 설명입니다</p>
<strong>강조된 문장</strong>
```

React에서 아래처럼 출력하면 HTML로 해석되지 않고 문자열 그대로 보인다.

```tsx
<p>{data?.fetchTravelproduct?.contents}</p>
```

HTML 서식을 실제로 적용하려면 아래 API를 사용한다.

```tsx
dangerouslySetInnerHTML
```

다만 이 값에 악성 HTML이 들어오면 XSS 위험이 생긴다.

예를 들어 아래 같은 값이 그대로 렌더링되면 위험하다.

```html
<img src="x" onerror="alert('xss')" />
<script>alert("xss")</script>
<a href="javascript:alert('xss')">click</a>
```

그래서 오늘 상세 페이지에서는 `DOMPurify.sanitize()`로 HTML을 정화한 뒤 렌더링하는 흐름을 사용했다.

```txt
서버에서 HTML 문자열 받기
-> DOMPurify.sanitize(contents)
-> safeContents state에 저장
-> dangerouslySetInnerHTML로 렌더링
```

핵심 기준은 아래와 같다.

```txt
dangerouslySetInnerHTML만 쓰면 위험하다.
DOMPurify로 정화한 뒤 쓰면 실무적으로 많이 쓰는 방식이다.
```

`zod`는 HTML 내부의 위험한 태그나 속성을 제거하는 도구가 아니다. `zod`는 데이터 형태 검증이고, XSS 방어는 sanitizer가 맡는다.

## 가격 포맷

상품 가격은 서버에서는 숫자로 관리하고, 화면에서는 표시용 문자열로 변환한다.

오늘 사용한 방식은 브라우저 내장 API인 `Intl.NumberFormat`이다.

```ts
const formatPriceToKRW = (price?: number | null) => {
  return new Intl.NumberFormat("ko-KR").format(price ?? 0);
};
```

예시는 아래와 같다.

```txt
1000 -> 1,000
30000 -> 30,000
1234567 -> 1,234,567
```

가격 포맷은 서버로 보내는 값이 아니라 화면 표시용 값이다.

```txt
서버 전송 값: number
화면 표시 값: 콤마가 찍힌 string
```

이런 유틸 함수는 직접 오래 고민하기보다 AI에게 맡기고, 결과가 현재 데이터 흐름에 맞는지만 판단해도 효율적이다.

## GraphQL mutation 반환 필드

문의 등록 mutation은 아래 형태다.

```graphql
createTravelproductQuestion(
  createTravelproductQuestionInput: CreateTravelproductQuestionInput!
  travelproductId: ID!
): TravelproductQuestion!
```

여기서 입력값은 아래 두 가지다.

```txt
createTravelproductQuestionInput
-> 문의 내용 객체

travelproductId
-> 어떤 상품에 문의를 등록할지 나타내는 ID
```

프론트 변수 형태는 아래와 같은 구조가 된다.

```ts
variables: {
  createTravelproductQuestionInput: {
    contents: question,
  },
  travelproductId: String(params.productId),
}
```

오늘 헷갈렸던 부분은 반환 필드였다.

GraphQL에서 객체 타입 필드는 단독으로 요청할 수 없다.

```graphql
travelproduct
```

이렇게 쓰면 `travelproduct`가 객체 타입일 경우 에러가 날 수 있다.

객체라면 필요한 하위 필드를 골라야 한다.

```graphql
travelproduct {
  _id
}
```

그리고 `travelproduct { name }`을 요청했을 때 아래 에러가 발생했다.

```txt
Cannot return null for non-nullable field Travelproduct.name.
```

이 에러는 프론트가 `name`을 입력값으로 보내지 않아서 생긴 것이 아니다.

의미는 아래와 같다.

```txt
프론트가 응답으로 Travelproduct.name을 요청했다.
그런데 서버가 name을 null로 반환했다.
하지만 스키마에서는 name이 String!으로 non-null이다.
그래서 GraphQL이 에러를 발생시켰다.
```

근본적으로는 백엔드 resolver나 데이터 상태가 맞아야 하지만, 프론트 과제 단계에서는 필요 없는 필드를 요청하지 않는 것이 현실적인 해결이다.

## 문의 등록 textarea

처음에는 textarea 값을 `document.getElementById`로 가져오고, 등록 후 직접 비우려고 했다.

```ts
const questionInput = document.getElementById("question") as HTMLInputElement;
questionInput.value = "";
```

순수 JavaScript에서는 가능한 방식이지만, React에서는 권장되는 흐름이 아니다.

React에서는 입력값을 state로 관리하는 controlled input 방식이 더 자연스럽다.

```tsx
const [question, setQuestion] = useState("");
```

```tsx
<TextArea
  value={question}
  onChange={(event) => setQuestion(event.target.value)}
/>
```

submit 시점에는 state를 검사한다.

```ts
if (question.trim() === "") return;
```

등록 성공 후에는 state를 비운다.

```ts
setQuestion("");
```

이렇게 하면 React가 textarea의 공식 값을 알고 있기 때문에 화면에서도 안정적으로 입력값이 비워진다.

## event.target.value와 state

오늘 가장 헷갈렸던 부분은 “최신값을 언제 event에서 보고, 언제 state에서 보느냐”였다.

기준은 아래처럼 정리할 수 있다.

```txt
onChange 안에서 방금 입력된 값을 바로 써야 한다
-> event.target.value

submit 버튼을 눌렀을 때 현재 입력값을 검사한다
-> state

파일 input에서 선택된 File 객체를 읽는다
-> event.target.files

DOM 요소 자체를 직접 조작해야 한다
-> useRef

React 바깥의 DOM을 어쩔 수 없이 잡아야 한다
-> document.getElementById
```

`event.target.value`는 이벤트가 발생한 순간의 최신 입력창 전체 값이다.

하지만 아래 코드는 주의해야 한다.

```tsx
onChange={(event) => {
  setQuestion(event.target.value);
  console.log(question);
}}
```

`setQuestion` 직후의 `question`은 아직 이전 렌더링 값일 수 있다.

최신 입력값을 바로 확인하고 싶다면 아래처럼 본다.

```tsx
onChange={(event) => {
  console.log(event.target.value);
  setQuestion(event.target.value);
}}
```

즉 state가 안전하지 않은 것이 아니라, state 업데이트가 다음 렌더링에 반영된다는 점을 이해해야 한다.

## 현재 코드 점검 메모

오늘 수정된 코드에서 좋아진 점은 아래와 같다.

- 상세 페이지가 더미 데이터가 아니라 `fetchTravelproduct` 데이터로 렌더링되기 시작했다.
- HTML contents를 그냥 문자열로 보여주는 대신 sanitize 후 렌더링하는 흐름을 잡았다.
- 가격 포맷을 유틸 함수로 분리했다.
- 문의 등록 mutation의 변수 구조를 이해하고 연결했다.
- textarea를 controlled input으로 바꾸면서 등록 후 입력창 초기화가 React 흐름에 맞게 정리됐다.
- GraphQL 객체 반환 필드는 필요한 하위 필드만 요청해야 한다는 기준을 확인했다.

다음에 점검해야 할 부분도 있다.

- `src/components/product-write/hook.ts`의 수정 완료 후 이동 경로가 `result.data?.createTravelproduct._id`를 보고 있다. `updateTravelproduct` mutation 결과라면 `result.data?.updateTravelproduct._id`가 맞을 가능성이 높다.
- 상세 페이지의 문의 등록 성공 후 `console.log(result)`는 최종 정리 시 제거하는 것이 좋다.
- `zipCode`, `addressDetail` state는 현재 화면에서 실제로 쓰이는지 확인이 필요하다. 안 쓰이면 추후 정리 대상이다.
- `useEffect`에서 `data?.fetchTravelproduct.travelproductAddress`에 접근할 때 중간 optional chaining이 부족한 부분이 있다. 데이터가 없거나 주소가 null이면 런타임 에러가 날 수 있다.
- `data`가 있어도 `images[0]`이 없을 수 있으므로 대표 이미지 fallback 처리를 한 번 더 점검해야 한다.
- `p` 태그 안에 `dangerouslySetInnerHTML`로 HTML을 넣으면 HTML 구조에 따라 중첩이 어색해질 수 있다. 보통은 `div`로 렌더링하는 편이 더 자연스럽다.
- Swiper를 사용 중이라면 실제 사용 패키지 목록과 README의 사용 패키지 정리가 맞는지도 나중에 확인할 필요가 있다.

## 오늘의 요약

오늘 배운 핵심은 아래 한 문장으로 줄일 수 있다.

```txt
React에서는 화면 값의 출처를 하나로 정해야 하고, GraphQL에서는 필요한 필드만 명확하게 요청해야 한다.
```

입력값은 state로 관리하면 검사와 초기화가 자연스럽다.

HTML 문자열은 그대로 렌더링하면 위험할 수 있으므로 sanitize가 필요하다.

GraphQL mutation은 입력값과 반환값을 구분해서 봐야 한다.

가격 포맷 같은 작은 유틸은 AI에게 맡겨도 좋지만, 서버에 보내는 값과 화면에 보여주는 값이 다르다는 기준은 직접 이해하고 있어야 한다.

오늘은 개념이 많았지만 방향은 좋다. 예전 코드가 헷갈리는 것은 실력이 부족해서라기보다, 코드량이 늘고 다루는 관심사가 많아졌기 때문이다. 그래도 오늘처럼 하나씩 “값의 출처”, “서버에 보내는 형태”, “화면에 보여주는 형태”로 나누면 다시 따라갈 수 있다.
