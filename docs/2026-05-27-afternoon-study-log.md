# 2026-05-27 오후 스터디 일지

## 작업 범위

오늘 오후에는 `homework26`의 여행상품 등록 페이지를 계속 진행했다.

오전에는 `react-hook-form`, `zod`, `antd`, `ReactQuill`을 연결하는 form 기초를 잡았다면, 오후에는 실제 등록 흐름을 더 넓게 다뤘다.

- `createTravelproduct` GraphQL mutation 연결
- Apollo `variables` 구조와 GraphQL 변수명 정리
- accessToken 인증 헤더와 Apollo Link 흐름 확인
- Kakao 주소 검색 결과를 Kakao Maps Geocoder로 좌표 변환
- 지도 DOM 렌더링 타이밍과 `useEffect` 흐름 정리
- 상품 등록 컴포넌트 구조 분리 점검
- 다중 파일 업로드의 기본 개념 확인

오늘은 라이브러리 압박이 컸다. 하지만 그만큼 외부 라이브러리와 React 흐름을 연결하는 감각을 많이 확인한 시간이었다.

## 진행한 작업

### 1. 상품 등록 컴포넌트 구조 분리

기존에 페이지 파일 안에 있던 상품 등록 로직을 아래처럼 분리했다.

```txt
src/app/homework26/products/new/page.tsx
-> 페이지 조립

src/components/product-write/hook.ts
-> form 상태
-> 주소 검색
-> 지도 좌표 변환
-> createTravelproduct mutation 실행

src/components/product-write/index.tsx
-> 화면 렌더링
-> Controller로 input 연결
-> 에러 메시지 출력
-> 파일 선택 UI

src/components/product-write/queries.ts
-> GraphQL mutation 문서

src/components/product-write/types.ts
-> zod schema
-> FormData
-> props 타입
```

이 구조는 `page`가 얇고, hook이 로직을 담당하며, component가 UI를 담당하는 형태다.

현재 기준으로는 과제 학습용 구조로 충분히 괜찮다. 다만 나중에 수정 페이지까지 붙이면 `isEdit`, `fetchTravelproduct`, `updateTravelproduct`, 기존값 세팅 흐름이 추가될 예정이다.

## GraphQL 정리

### 1. CreateTravelproductInput과 변수명

GraphQL에서 가장 헷갈렸던 부분은 아래 이름들이었다.

```txt
CreateTravelproductInput   -> 타입 이름
createTravelproductInput   -> mutation 인자 이름
$createTravelproductInput  -> GraphQL 변수 이름
createTravelproduct        -> mutation 필드 이름
```

기준은 아래처럼 잡았다.

```txt
대문자로 시작 -> 타입
소문자로 시작 -> 필드/인자
$로 시작 -> GraphQL 변수
```

서버 스키마가 아래와 같다면:

```graphql
createTravelproduct(createTravelproductInput: CreateTravelproductInput!): Travelproduct!
```

클라이언트 mutation은 이렇게 쓰는 것이 자연스럽다.

```graphql
mutation createTravelproduct(
  $createTravelproductInput: CreateTravelproductInput!
) {
  createTravelproduct(createTravelproductInput: $createTravelproductInput) {
    _id
    name
    remarks
    contents
    price
    tags
    images
  }
}
```

처음에는 `$name`, `$remarks`, `$contents`처럼 개별 변수를 mutation 내부에서 사용했다. 하지만 operation 선언부에는 `$createTravelproductInput`만 선언되어 있었기 때문에 아래 에러가 발생했다.

```txt
Variable "$name" is not defined by operation "createTravelproduct"
```

정리하면:

```txt
GraphQL 문서에서 $name을 쓰려면 $name을 선언해야 한다.
input 객체 하나로 보낼 거면 mutation 내부에서도 그 input 변수 하나만 써야 한다.
```

### 2. Apollo variables

Apollo에서 mutation을 실행할 때는 보통 `variables`로 감싼다.

```ts
await travelProductCreate({
  variables: {
    createTravelproductInput: {
      name: data.name,
      remarks: data.remarks,
      contents: data.contents,
      price: data.price,
      tags: data.tags ? [data.tags] : [],
      images: [],
      travelproductAddress: {
        zipcode: data.zipcode,
        address: data.address,
        addressDetail: data.addressDetail,
        lat: data.lat,
        lng: data.lng,
      },
    },
  },
});
```

중요한 점은 아래와 같다.

```txt
data를 함수에 바로 넣는 것과
variables 안에 넣는 것은 다르다.
```

잘못된 형태:

```ts
await travelProductCreate(data);
```

올바른 형태:

```ts
await travelProductCreate({
  variables: {
    createTravelproductInput: data,
  },
});
```

다만 form data와 서버 input 구조가 완전히 같지 않다면, 서버 input 모양으로 한 번 가공해야 한다.

## 인증과 Apollo Link

상품 등록 시 아래 메시지도 확인했다.

```txt
회원정보 인증에 실패하였습니다.
```

이 메시지는 보통 accessToken이 없거나, 만료되었거나, 요청 헤더에 제대로 붙지 않았을 때 발생한다.

Apollo에서는 요청이 나가기 전에 `authLink`를 사용해 토큰을 붙일 수 있다.

```ts
const authLink = new ApolloLink((operation, forward) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});
```

이 코드의 흐름은 아래와 같다.

```txt
GraphQL 요청 발생
-> authLink 실행
-> localStorage에서 token 읽음
-> Authorization 헤더 추가
-> forward(operation)으로 다음 link에 넘김
-> uploadLink가 실제 서버 요청 전송
```

`ApolloLink.from([authLink, uploadLink])`는 배열 순서대로 실행된다.

```txt
authLink -> uploadLink
```

즉 인증 헤더를 붙이고, 그 다음 서버로 요청을 보내는 구조다.

또한 `"use client"`가 있어도 파일 최상단에서 `localStorage`를 바로 읽는 것은 조심해야 한다.

```ts
const accessToken = localStorage.getItem("token");
```

이 방식은 파일이 처음 로드될 때 한 번만 실행된다. 로그인 이후 token이 바뀌어도 최신 token이 반영되지 않을 수 있다.

그래서 요청 시점마다 token을 읽는 `authLink` 방식이 더 안전하다.

## ReactQuill과 dynamic import

`ReactQuill`은 브라우저의 `window`, `document`를 사용하는 라이브러리라 Next SSR과 충돌할 수 있다.

그래서 아래처럼 dynamic import를 사용했다.

```ts
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
```

의미는 아래와 같다.

```txt
서버에서는 ReactQuill을 렌더링하지 말고
브라우저에서만 불러와라.
```

이 패턴은 `ReactQuill`, 지도 SDK처럼 브라우저 전용 기능을 가진 라이브러리에서 자주 사용된다.

## Kakao 주소 검색과 지도

### 1. 주소 검색과 좌표 변환

`react-daum-postcode`는 주소 문자열과 우편번호는 제공하지만, `lat`, `lng`는 직접 제공하지 않는다.

따라서 주소를 좌표로 바꾸려면 Kakao Maps SDK의 Geocoder를 사용해야 한다.

흐름은 아래와 같다.

```txt
주소 검색 완료
-> fullAddress 생성
-> setValue("zipcode", zoneCode)
-> setValue("address", fullAddress)
-> Kakao Geocoder로 fullAddress 검색
-> result[0].y -> lat
-> result[0].x -> lng
-> setValue("lat", lat)
-> setValue("lng", lng)
```

Kakao Maps SDK를 사용할 때는 `libraries=services`와 `autoload=false`가 중요했다.

```tsx
<Script
  src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services&autoload=false`}
  strategy="afterInteractive"
/>
```

그리고 `Script`는 import만 한다고 실행되는 것이 아니다. 실제 JSX return 안에 들어가야 script가 삽입된다.

### 2. SDK 로드 에러

처음에는 아래 에러가 발생했다.

```txt
Cannot read properties of undefined (reading 'load')
```

이 에러는 `window.kakao.maps`가 아직 준비되지 않았는데 `window.kakao.maps.load()`를 호출했다는 뜻이다.

확인한 원인은 `Script`가 컴포넌트 return 밖에 있었던 점이었다.

잘못된 형태:

```tsx
<Script ... />;

export default function LayoutComponent() {
  return <>{children}</>;
}
```

올바른 형태:

```tsx
export default function LayoutComponent() {
  return (
    <>
      <Script ... />
      {children}
    </>
  );
}
```

### 3. DOM 타이밍과 useEffect

지도 생성 중 아래 에러도 확인했다.

```txt
kakao.js:31 Uncaught TypeError: Cannot read properties of null (reading 'currentStyle')
```

이 에러는 Kakao Map이 지도 컨테이너 DOM을 찾지 못했을 때 발생할 수 있다.

처음에는 주소 선택 직후 바로 아래 코드를 실행했다.

```ts
setAddress(fullAddress);
const container = document.getElementById("map");
```

하지만 `setAddress`는 즉시 DOM을 바꾸는 것이 아니다. 다음 렌더 이후에야 `address` 조건을 만족해서 `<div id="map">`이 생긴다.

그래서 흐름을 아래처럼 분리했다.

```txt
handleComplete
-> 주소와 좌표 state 업데이트

React 리렌더
-> address가 있으므로 map div 렌더링

useEffect
-> 렌더 이후 document.getElementById("map")
-> Kakao Map 생성
```

현재 핵심 흐름은 아래와 같다.

```ts
useEffect(() => {
  if (!address) return;
  if (!lat || !lng) return;
  if (!window.kakao?.maps) return;

  const container = document.getElementById("map");
  if (!container) return;

  const map = new window.kakao.maps.Map(container, {
    center: new window.kakao.maps.LatLng(lat, lng),
    level: 3,
  });

  const marker = new window.kakao.maps.Marker({
    map,
    position: new window.kakao.maps.LatLng(lat, lng),
  });

  marker.setMap(map);
}, [address, lat, lng]);
```

오늘 가장 중요한 React 감각은 이것이었다.

```txt
state 변경 -> 리렌더 -> DOM 생성 -> useEffect에서 DOM 사용
```

### 4. props 전달 누락

지도 DOM이 계속 잡히지 않았던 또 다른 이유는 `address` prop 전달 누락이었다.

`hook.ts`에서는 `address`를 return하고 있었다.

```ts
return {
  ...
  address,
};
```

하지만 `page.tsx`에서 `address`를 꺼내지 않고, `ProductWriteComponent`에도 넘기지 않았다.

그 결과 `ProductWriteComponent` 안의 `address`는 `undefined`였고, 아래 조건부 렌더링에서 map div가 생성되지 않았다.

```tsx
{address ? (
  <div id="map" className="w-full h-full"></div>
) : (
  <p className="text-gray-600">주소를 먼저 입력해 주세요</p>
)}
```

이 실수를 통해 컴포넌트를 분리할 때는 아래 흐름을 계속 확인해야 한다는 점을 배웠다.

```txt
값을 만든 곳
값을 넘기는 곳
값을 쓰는 곳
```

## InputNumber와 null

antd `InputNumber`는 값을 비우면 `null`을 넘길 수 있다.

그래서 zod schema가 아래처럼 되어 있으면:

```ts
price: z.number().min(1, { message: "판매가격을 입력해주세요." })
```

입력값을 지웠을 때 아래 에러가 나올 수 있다.

```txt
Expected number, received null
```

해결 방향은 `onChange`에서 `null`을 처리하는 것이다.

```tsx
onChange={(value) => field.onChange(value ?? 0)}
```

이 코드는 세 가지가 섞여 있다.

```txt
antd InputNumber: onChange에서 숫자 또는 null을 넘김
react-hook-form: field.onChange로 form 값을 업데이트
JavaScript: value ?? 0으로 null/undefined 처리
```

## 다중 파일 업로드 기초

오늘 다중 파일 업로드는 깊게 구현하지 않고, 개념만 잡았다.

기본 흐름은 아래와 같다.

```txt
input type="file" multiple
-> event.target.files
-> FileList
-> Array.from(files)
-> File[]
-> state에 저장
-> map으로 미리보기
```

현재는 선택한 파일을 `imageFiles` state에 저장하고 있다.

```ts
const [imageFiles, setImageFiles] = useState<File[]>([]);

const handleFileUpload = async (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  const files = event.target.files;
  if (!files) return;

  const fileArray = Array.from(files);
  setImageFiles(fileArray);
};
```

`File` 객체는 이미지 URL이 아니기 때문에 `<img src={file}>`처럼 바로 사용할 수 없다.

미리보기에는 `URL.createObjectURL(file)`을 사용한다.

```tsx
<img src={URL.createObjectURL(file)} alt={file.name} />
```

개념적으로는 아래와 같다.

```txt
File 객체
-> URL.createObjectURL(file)
-> blob URL 생성
-> img src에 넣어 미리보기
```

이미지 삭제는 `filter`를 사용한다.

```ts
const handleDeleteImage = (index: number) => {
  setImageFiles((prev) => {
    return prev.filter((_, i) => {
      return i !== index;
    });
  });
};
```

`filter`는 "삭제한다"기보다 "남길 것만 고른다"고 이해하면 쉽다.

```txt
삭제할 index와 같은 것은 제외
다른 index는 유지
```

다만 실제 업로드까지는 내일 다시 진행하기로 했다.

내일 이어갈 흐름은 아래처럼 나누면 좋다.

```txt
1. 파일 선택
2. 미리보기
3. 삭제
4. uploadFile 한 개
5. uploadFile 여러 개
6. createTravelproduct images 배열에 연결
```

## 오늘 어려웠던 점

오늘은 라이브러리가 많이 겹쳤다.

```txt
react-hook-form
zod
antd
ReactQuill
Apollo Client
GraphQL
Kakao Maps SDK
react-daum-postcode
Next Script
dynamic import
브라우저 File API
```

각각 하나씩만 해도 낯선데, 상품 등록 페이지에서는 이 라이브러리들이 한 화면에 동시에 등장했다.

그래서 오늘의 어려움은 단순히 문법을 몰라서라기보다 아래 문제에 가까웠다.

```txt
각 라이브러리가 값을 언제 만들고,
그 값을 어디에 저장하고,
언제 DOM이 생기고,
어느 시점에 외부 SDK를 호출해야 하는지 맞추는 문제
```

## 오늘의 핵심 정리

오늘 오후의 핵심은 아래 한 줄로 정리할 수 있다.

```txt
외부 라이브러리는 값을 언제 만들고, 언제 넘기고, 언제 DOM에 반영되는지를 맞춰야 제대로 동작한다.
```

특히 중요했던 개념은 아래와 같다.

```txt
GraphQL은 타입/변수/인자 이름을 정확히 구분해야 한다.
Apollo mutation은 variables로 값을 전달한다.
인증이 필요한 요청은 Authorization 헤더에 accessToken이 필요하다.
브라우저 전용 라이브러리는 Next에서 로드 타이밍을 조심해야 한다.
Kakao Map은 SDK 로드, services 라이브러리, maps.load 흐름이 필요하다.
DOM을 직접 잡는 코드는 렌더 이후 useEffect에서 실행하는 것이 안전하다.
컴포넌트 분리 후에는 props 전달 경로를 확인해야 한다.
File 객체는 이미지 주소가 아니므로 미리보기에는 createObjectURL이 필요하다.
```

오늘은 다중 파일 업로드를 끝까지 밀어붙이지 않고 여기서 멈추기로 했다. 내일은 파일 업로드를 별도 주제로 잡고, 기초부터 다시 정리하면서 이어간다.

