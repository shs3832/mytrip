# 2026-05-27 오전 스터디 일지

## 작업 범위

오늘 오전에는 `homework26`의 여행상품 등록 페이지를 중심으로 학습했다.

과제 요구사항은 `homework23`에서 퍼블리싱했던 여행상품 등록/수정 페이지에 기능을 붙이는 것이다. 특히 오늘은 아래 흐름을 먼저 다뤘다.

- `react-hook-form`으로 상품 등록 form 구성
- `zod`로 입력값 검증 schema 작성
- `antd Input`과 `react-hook-form` 연결 방식 확인
- `ReactQuill` 웹 에디터 값 검증 방식 확인
- `z.infer`, `type`, `interface` 같은 TypeScript 개념 정리

마지막 커밋은 `a84ac73 - homework25 HOC구현, 신규 게시글 등록시 로그인권한체크`이고, 현재 `homework26` 작업은 아직 커밋 전 상태다.

## 과제 요구사항

`src/app/homework26/homwork.md` 기준으로 이번 과제의 핵심은 아래와 같다.

- `homework25` 폴더를 활용해 `homework26` 완성
- 여행상품 등록/수정 페이지 기능 추가
  - 각 input에 `react-hook-form` 사용
  - `zod`로 에러 메시지 관리
  - `createTravelproduct`, `updateTravelproduct` 연결
- 여행상품 상세 페이지 기능 추가
  - 상품 상세 조회
  - 스크랩
  - 구매
  - 문의 댓글 / 답변 댓글 CRUD

오늘 오전에는 전체 기능 중에서 먼저 상품 등록 form의 입력값 관리와 검증 흐름을 잡는 데 집중했다.

## 진행한 작업

### 1. zod schema 작성

상품 등록 form에서 사용할 입력값에 대해 schema를 작성했다.

```ts
export const schema = z.object({
  productName: z.string().min(1, { message: "상품명을 입력해주세요." }),
  summary: z.string().min(1, { message: "한줄요약을 입력해주세요." }),
  productDetail: z.string().refine(
    (value) => {
      const text = value.replace(/<(.|\n)*?>/g, "").trim();
      return text.length > 0;
    },
    {
      message: "상품 설명을 입력해주세요.",
    },
  ),
  price: z.string().min(1, { message: "판매가격을 입력해주세요." }),
  tags: z.string().min(1, { message: "태그를 입력해주세요." }),
  zipcode: z.string().min(1, { message: "주소를 입력해주세요." }),
  address: z.string().optional(),
  addressDetail: z.string().optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
});
```

여기서 필수값과 비필수값을 구분했다.

```txt
필수값: z.string().min(1, { message: "..." })
비필수값: z.string().optional()
```

`address`, `addressDetail`, `lat`, `lng`는 아직 지도/주소 검색 기능이 완성되지 않았으므로 일단 비필수값으로 두는 것이 자연스럽다.

### 2. z.infer 개념 확인

schema를 작성한 뒤 아래 타입을 사용했다.

```ts
type FormData = z.infer<typeof schema>;
```

처음에는 생소했지만, 역할은 명확하다.

```txt
zod schema = 실행 중 값 검증
z.infer<typeof schema> = schema를 보고 TypeScript 타입 자동 생성
```

직접 타입을 만들면 schema와 type을 따로 관리해야 한다.

```ts
type FormData = {
  productName: string;
  summary: string;
  productDetail: string;
  price: string;
  tags: string;
  zipcode: string;
  address?: string;
  addressDetail?: string;
  lat?: string;
  lng?: string;
};
```

하지만 `z.infer`를 사용하면 schema가 곧 타입의 기준이 된다.

```txt
schema를 수정하면 FormData 타입도 함께 바뀜
register / Controller의 name도 schema 기준으로 타입 체크됨
```

오늘의 중요한 TypeScript 감각은 이것이다.

```txt
z.infer는 검증 규칙과 타입 정의를 연결하는 다리다.
```

### 3. type과 interface 차이 정리

`type FormData = z.infer<typeof schema>`를 보며 `type`과 `interface`의 차이도 다시 정리했다.

둘 다 객체 모양을 표현할 수 있다.

```ts
type User = {
  name: string;
  age: number;
};
```

```ts
interface User {
  name: string;
  age: number;
}
```

하지만 감각적으로는 아래처럼 구분할 수 있다.

```txt
interface
- 객체 구조 정의에 적합
- props, API 응답 객체 등에 자주 사용
- 같은 이름으로 다시 선언하면 합쳐질 수 있음

type
- 객체뿐 아니라 union, literal, infer 결과 등 더 넓게 표현 가능
- z.infer 같은 타입 계산 결과에 자연스러움
- 같은 이름 재선언 불가
```

이번 코드에서는 `z.infer<typeof schema>`라는 계산된 타입에 이름을 붙이는 자리이므로 `type`이 자연스럽다.

### 4. antd Input과 Controller

처음에는 `register`를 사용해 antd `Input`을 연결하려고 했다.

```tsx
<Input
  size="large"
  placeholder="상품명"
  {...register("productName")}
/>
```

하지만 antd의 `Input`은 겉으로는 input처럼 보이지만 내부적으로는 antd가 감싼 컴포넌트다. 기본 HTML input처럼 `ref`, `value`, `onChange`가 그대로 연결된다고만 보기 어렵다.

그래서 외부 UI 라이브러리 컴포넌트는 `Controller`로 연결하는 것이 더 안정적이라고 정리했다.

```tsx
<Controller
  name="productName"
  control={control}
  render={({ field }) => (
    <Input size="large" placeholder="상품명" {...field} />
  )}
/>
```

오늘 정리한 기준은 아래와 같다.

```txt
기본 HTML input -> register
antd Input / Select / DatePicker / Upload -> Controller
ReactQuill 같은 웹 에디터 -> Controller
```

### 5. defaultValues와 required 메시지

`rules`를 지웠는데도 에러 메시지가 `required`로 나오는 이유를 확인했다.

핵심은 `undefined`와 `""`의 차이다.

```txt
undefined = 값이 아예 없음
"" = 문자열이지만 비어 있음
```

schema가 아래처럼 되어 있어도:

```ts
productName: z.string().min(1, { message: "상품명을 입력해주세요." })
```

초기값이 `undefined`이면 zod는 먼저 "string이 아니다"라고 판단한다. 그러면 `.min(1)` 메시지까지 가지 못하고 기본 required 계열 메시지가 나올 수 있다.

그래서 `useForm`에 `defaultValues`를 넣어주는 것이 중요하다.

```ts
const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>({
  resolver: zodResolver(schema),
  mode: "onChange",
  defaultValues: {
    productName: "",
    summary: "",
    productDetail: "",
    price: "",
    tags: "",
    zipcode: "",
    address: "",
    addressDetail: "",
    lat: "",
    lng: "",
  },
});
```

이렇게 하면 zod가 `undefined`가 아니라 `""`를 받으므로, 직접 작성한 `.min(1)` 메시지가 의도대로 출력된다.

### 6. ReactQuill 빈 값 처리

`ReactQuill`은 사용자가 아무것도 입력하지 않아도 값이 완전한 빈 문자열이 아닐 수 있다.

대표적으로 아래처럼 HTML 문자열이 남는다.

```html
<p><br></p>
```

그래서 단순히 `z.string().min(1)`로 검사하면 실제로는 내용이 없어도 문자열 길이가 있어서 통과할 수 있다.

이번에는 HTML 태그를 제거한 실제 텍스트 기준으로 검사했다.

```ts
productDetail: z.string().refine(
  (value) => {
    const text = value.replace(/<(.|\n)*?>/g, "").trim();
    return text.length > 0;
  },
  {
    message: "상품 설명을 입력해주세요.",
  },
),
```

여기서 중요한 점은 아래와 같다.

```txt
Input 값 = 보통 사용자가 입력한 문자열
ReactQuill 값 = HTML 문자열
```

따라서 웹 에디터 검증은 "문자열 길이"가 아니라 "HTML을 걷어낸 실제 텍스트 길이" 기준으로 봐야 한다.

### 7. ReactQuill 높이 지정

`ReactQuill`에 단순히 `className="h-[300px]"`를 주면 원하는 입력 영역 높이가 안 맞을 수 있다.

이유는 ReactQuill 내부에 `.ql-container`, `.ql-editor` 같은 내부 DOM이 따로 있기 때문이다.

Tailwind로 내부 클래스를 잡는 문법을 확인했다.

```tsx
<div className="relative [&_.ql-container]:h-[300px]">
  <Controller
    name="productDetail"
    control={control}
    render={({ field }) => (
      <ReactQuill
        theme="snow"
        value={field.value}
        onChange={field.onChange}
        placeholder="내용을 입력해주세요"
      />
    )}
  />
</div>
```

`[&_.ql-container]:h-[300px]`는 Tailwind의 arbitrary variant 문법이다.

```txt
& = 현재 요소
_ = 공백
.ql-container = 현재 요소 안의 ql-container 클래스
:h-[300px] = 높이 300px 적용
```

CSS로 풀어보면 아래와 비슷하다.

```css
.parent .ql-container {
  height: 300px;
}
```

다만 이 문법은 눈에 잘 들어오지 않으므로, 나중에 유지보수를 생각하면 `styles.module.css`로 분리하는 편이 더 읽기 좋을 수 있다.

## 오늘 막혔던 지점

### 1. antd를 쓰면 register가 안 되는 것처럼 보임

처음에는 antd 자체를 쓰면 안 되는 것처럼 보였다.

하지만 정확히는 antd가 문제라기보다 `register`가 기본 HTML input을 기준으로 만들어진 방식이고, antd `Input`은 외부 UI 컴포넌트라 연결 방식이 다를 수 있다는 점이 핵심이었다.

정리:

```txt
antd를 쓰면 안 됨 X
antd 같은 외부 컴포넌트는 Controller가 더 안정적 O
```

### 2. submit을 눌러도 console.log가 안 찍힘

`handleSubmit(onSubmit)`은 바로 `onSubmit`을 실행하는 함수가 아니다.

흐름은 아래와 같다.

```txt
submit 클릭
-> react-hook-form이 값 수집
-> zodResolver가 schema 검증
-> 성공하면 onSubmit(data) 실행
-> 실패하면 onSubmit 실행 안 함
```

따라서 검증 에러가 있으면 `console.log(data)`가 찍히지 않는 것이 정상이다.

검증 실패를 확인하고 싶다면 아래처럼 실패 콜백을 추가할 수 있다.

```tsx
<form
  onSubmit={handleSubmit(
    onSubmit,
    (errors) => console.log("검증 실패", errors),
  )}
>
```

### 3. 라이브러리 활용법과 React 기본 개념의 구분

오늘 질문들은 대부분 순수 React 개념보다 라이브러리 활용법에 가까웠다.

예를 들면:

- `react-hook-form`의 `Controller`
- zod의 `required`와 `.min(1)` 메시지 차이
- `defaultValues`의 필요성
- ReactQuill의 빈 값 HTML
- antd Input과 register의 궁합

이런 문제는 오래 혼자 붙잡는 것보다 공식 문서, 검색, AI 질문으로 빠르게 확인하는 편이 효율적이다.

다만 중요한 것은 답을 외우는 것이 아니라 문제를 분류하는 감각이다.

```txt
내 로직 문제인가?
React 기본 개념 문제인가?
라이브러리 사용법 문제인가?
라이브러리끼리 붙이는 방식 문제인가?
```

오늘의 대부분은 네 번째, 즉 "라이브러리끼리 붙이는 방식" 문제였다.

## 오늘 이해한 핵심 개념

### react-hook-form

- `register`는 기본 HTML input에 적합하다.
- `Controller`는 외부 UI 컴포넌트에 적합하다.
- `handleSubmit`은 검증 성공 시에만 submit 콜백을 실행한다.
- `defaultValues`가 없으면 Controller 필드의 초기값이 `undefined`가 될 수 있다.
- `errors.xxx.message`는 schema 또는 rules에서 만들어진 메시지다.

### zod

- `z.string().min(1)`은 빈 문자열 검증에 적합하다.
- 값이 `undefined`이면 `.min(1)`보다 "값 없음" 검증이 먼저 걸릴 수 있다.
- 비필수값은 `.optional()`로 처리한다.
- 웹 에디터처럼 HTML 문자열을 다루는 값은 `.refine()`으로 커스텀 검증할 수 있다.

### TypeScript

- `z.infer<typeof schema>`는 zod schema에서 TypeScript 타입을 뽑아준다.
- `type`은 union, literal, infer 결과처럼 계산된 타입에 적합하다.
- `interface`는 객체 구조를 표현할 때 자연스럽다.
- 지금처럼 schema에서 타입을 추론하는 경우에는 `type`이 더 자연스럽다.

### ReactQuill

- 값은 단순 텍스트가 아니라 HTML 문자열이다.
- 빈 화면이어도 `<p><br></p>` 같은 값이 남을 수 있다.
- 검증은 HTML 태그를 제거한 실제 텍스트 기준으로 해야 한다.
- 높이는 wrapper가 아니라 내부 `.ql-container`, `.ql-editor`까지 고려해야 한다.

## 현재 코드에서 다음에 점검할 부분

1. `page.tsx`의 `export const schema` 정리

Next.js App Router의 `page.tsx`는 임의 named export에 민감할 수 있다. 현재는 아래처럼 되어 있다.

```ts
export const schema = z.object(...)
```

필요 없다면 `export`를 제거하거나, schema를 별도 파일로 분리하는 것이 좋다.

2. `ReactQuill` 높이 스타일 정리

현재 Tailwind arbitrary variant를 사용하고 있다.

```tsx
<div className="relative [&_.ql-container]:h-[300px]">
```

동작은 가능하지만 가독성은 떨어진다. 나중에 `styles.module.css`로 분리하면 더 읽기 좋다.

3. disabled 필드와 필수 검증의 관계

`zipcode`는 현재 disabled input인데 필수값으로 검증 중이다.

```ts
zipcode: z.string().min(1, { message: "주소를 입력해주세요." })
```

주소 검색 기능으로 값을 채우기 전까지는 submit이 막힐 수 있다. 주소 검색 구현 전에는 optional 처리하거나 임시값 흐름을 고려해야 한다.

4. 실제 GraphQL 연결

현재는 form 검증과 submit 로그 확인 단계다.

```ts
const onSubmit = (data: FormData) => console.log(data);
```

다음 단계에서는 `createTravelproduct` mutation에 맞게 data 구조를 변환해야 한다.

## 오늘의 정리

오늘 오전은 TypeScript와 라이브러리 조합 때문에 꽤 낯선 내용이 많았다.

하지만 막힌 지점의 성격은 비교적 명확했다.

```txt
React를 모르는 문제라기보다
react-hook-form + zod + antd + ReactQuill을 어떻게 연결하는지의 문제
```

이번에 가져가야 할 핵심은 아래 정도다.

```txt
기본 input은 register
외부 UI 컴포넌트는 Controller
검증 메시지는 zod schema에 모으기
초기값은 defaultValues로 명확히 주기
에디터 값은 HTML이라 실제 텍스트 기준으로 검증하기
schema에서 타입은 z.infer로 뽑기
```

아직 TypeScript는 난처하게 느껴지지만, `z.infer`, `type`, `interface`가 실제 코드에서 왜 나오는지 한 번 더 연결해서 본 시간이었다.

