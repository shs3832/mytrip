# 2026-06-01 오후 스터디 일지

## 작업 범위

오후에는 `homework26` 여행상품 상세 페이지의 문의 영역을 리팩토링했다.

주요 범위는 아래와 같다.

- 상품 상세 페이지에 있던 문의 관련 코드를 컴포넌트로 분리
- 문의 등록/수정 폼 컴포넌트 분리
- 문의 목록 아이템 컴포넌트 분리
- 문의 아이템별 수정 모드 상태 관리
- 상품 판매자 여부(`isMine`)를 계산해 답변 UI 노출
- 답변 등록/조회 흐름의 뼈대 확인
- GraphQL mutation/query의 변수와 refetch 흐름 점검

오늘 오전에는 개념 질문이 많았다면, 오후에는 직접 리팩토링을 하면서 흐름을 더 많이 확인했다. 질문을 많이 하지 않았지만, 오히려 코드를 직접 옮기고 나누면서 “어떤 값이 어디에 있어야 하는지”가 조금 더 보이기 시작했다.

## 오늘의 큰 흐름

처음에는 상품 상세 페이지 안에 문의 등록, 문의 목록, 문의 수정, 답변 UI가 함께 섞여 있었다.

오후 작업에서는 이 덩어리를 아래처럼 나누기 시작했다.

```txt
ProductDetailPage
-> 상품 상세 데이터 조회
-> 문의 목록 조회
-> 로그인 유저 조회
-> 상품 판매자 여부 계산
-> 문의 작성 컴포넌트 렌더링
-> 문의 목록 컴포넌트 렌더링
```

```txt
comment-write
-> 문의 등록/수정 textarea
-> createTravelproductQuestion
-> updateTravelproductQuestion
```

```txt
comment-list
-> 문의 하나의 카드
-> 수정 모드 열기/닫기
-> 삭제 버튼 연결
-> 판매자인 경우 답변하기 버튼 표시
```

```txt
comment-reply
-> 문의 하나에 달린 답변 목록 표시
-> 답변 조회 query는 내일 이어서 정리
```

## 컴포넌트 분리에서 배운 점

컴포넌트 분리는 단순히 파일을 나누는 일이 아니다.

오늘 더 중요하게 느낀 기준은 아래와 같다.

```txt
이 state를 누가 소유해야 하는가?
이 mutation은 어디에서 실행되는 것이 자연스러운가?
이 값은 페이지 전체 기준인가, 아이템 하나의 기준인가?
이 컴포넌트는 화면만 담당하는가, 동작까지 담당하는가?
```

특히 문의 수정 모드는 문의마다 따로 열려야 한다.

그래서 `isEditQuestion` 같은 값은 페이지 전체에 하나만 두기보다, 문의 카드 컴포넌트 내부에서 관리하는 편이 자연스럽다.

```txt
문의 A 수정 클릭
-> 문의 A 카드만 수정 모드

문의 B 수정 클릭
-> 문의 B 카드만 수정 모드
```

이 구조를 만들기 위해 `comment-list` 컴포넌트가 문의 하나를 책임지도록 분리했다.

## isMine 위치

`isMine`은 로그인 유저가 이 상품의 판매자인지 확인하는 값이다.

```ts
const isMine =
  data?.fetchTravelproduct?.seller?._id === userData?.fetchUserLoggedIn?._id;
```

이 값은 문의마다 달라지는 값이 아니라 상품 상세 페이지 전체 기준의 값이다.

그래서 `comment-list` 안에서 문의 개수만큼 계산하기보다, 부모인 상세 페이지에서 한 번 계산하고 props로 내려주는 쪽이 맞다.

```txt
ProductDetailPage
-> isMine 계산
-> ProductDetailQuestionListComponent에 전달
```

이 기준이 잡히면서 렌더링과 상태 위치가 조금 더 선명해졌다.

## 문의 작성/수정 폼

`comment-write`는 문의 등록과 수정에서 재사용된다.

등록 모드에서는 `question`이 필요 없다.

```tsx
<ProductDetailQuestionWriteComponent isEdit={false} />
```

수정 모드에서는 기존 문의 내용과 수정 모드 종료 함수가 필요하다.

```tsx
<ProductDetailQuestionWriteComponent
  isEdit={true}
  question={question}
  setIsEditQuestion={setIsEditQuestion}
/>
```

이 때문에 `question`과 `setIsEditQuestion`은 상황에 따라 있을 수도 있고 없을 수도 있다.

그래서 optional 타입과 optional chaining을 사용했다.

```ts
setIsEditQuestion?: React.Dispatch<React.SetStateAction<boolean>>;
```

```ts
setIsEditQuestion?.(false);
```

핵심은 아래와 같다.

```txt
optional로 선언한 값은 사용할 때도 optional하게 다뤄야 한다.
```

## useEffect 의존성 배열

문의 수정 모드에서는 기존 문의 내용을 textarea 초기값으로 넣어야 한다.

```tsx
useEffect(() => {
  if (isEdit && question) {
    setQuestionText(question.contents);
  } else {
    setQuestionText("");
  }
}, [isEdit, question, setQuestionText]);
```

의존성 배열 기준은 아래처럼 정리했다.

```txt
useEffect 안에서 읽는 외부 값은 의존성 배열에 넣는다.
effect 안에서 바꾸는 state를 무조건 넣는 것은 아니다.
```

여기서는 `isEdit`, `question`, `setQuestionText`를 effect 안에서 사용하므로 의존성 배열에 포함했다.

## 답변 기능은 내일로 넘김

답변 기능은 오늘 뼈대만 확인했다.

API 구조상 답변 조회는 상품 ID가 아니라 문의 ID를 기준으로 한다.

```graphql
fetchTravelproductQuestionAnswers(
  page: Int
  travelproductQuestionId: ID!
)
```

즉 문의마다 답변이 다르기 때문에 각 문의 카드에서 자기 `question._id`로 답변을 조회해야 한다.

```txt
문의 A _id -> A의 답변 조회
문의 B _id -> B의 답변 조회
문의 C _id -> C의 답변 조회
```

다만 이렇게 하면 문의 개수만큼 답변 query가 실행될 수 있다.

과제 단계에서는 API 구조상 자연스러운 접근이지만, 실무에서는 백엔드에서 문의와 답변을 한 번에 내려주는 구조가 더 효율적일 수 있다.

오늘은 여기까지 확인하고, 실제 답변 렌더링/수정/삭제는 내일 이어서 하기로 했다.

## 오늘 정리된 점

오늘 오후 작업으로 정리된 부분은 아래와 같다.

- `product-detail` 폴더를 만들어 상세 페이지 관련 문의 컴포넌트를 분리했다.
- 문의 작성/수정 폼을 `comment-write`로 분리했다.
- 문의 하나의 UI와 수정 상태를 `comment-list`에서 관리하기 시작했다.
- 답변 목록은 `comment-reply`로 분리할 방향을 잡았다.
- `isMine`은 부모에서 계산해서 내려주는 구조로 정리했다.
- 답변 등록 후 refetch에는 query와 variables를 함께 넘겨야 한다는 점을 확인했다.
- 불필요한 `useMutation` 기본 variables와 오타성 이름을 일부 정리했다.

## 다음 점검 항목

내일 이어서 볼 항목은 아래와 같다.

- `comment-reply`에서 더미 텍스트 대신 실제 답변 데이터 렌더링
- 답변 목록 map에 `key` 추가
- 답변 등록 후 refetch 동작 확인
- 답변 수정/삭제 mutation 추가
- 문의 수정/삭제 버튼을 문의 작성자에게만 보여줄지 점검
- 상품 판매자만 답변 버튼을 볼 수 있는지 확인
- 상세 페이지의 unused import 정리
- `console.log` 제거
- `graphql.config.yaml` 커밋 여부 확인
- 타입을 `any` 대신 명확한 타입으로 정리

## 오늘의 메모

오늘은 질문을 많이 하지 않았지만, 오히려 리팩토링을 직접 하면서 흐름이 더 잘 보였다.

예전에는 코드가 길어지면 어디서부터 봐야 할지 막혔는데, 오늘은 아래 기준으로 조금씩 나눠볼 수 있었다.

```txt
페이지 전체 데이터인가?
아이템 하나의 상태인가?
작성 폼의 입력값인가?
서버에 보내는 mutation인가?
서버에서 다시 가져올 query인가?
```

아직 속도는 빠르지 않지만, 구조를 생각하면서 직접 손을 대기 시작했다는 점이 중요하다.

오늘의 핵심은 아래 문장으로 정리할 수 있다.

```txt
컴포넌트 분리는 파일을 나누는 것이 아니라, 상태와 책임의 위치를 정하는 일이다.
```

답변 기능은 내일 이어서 해도 된다. 오늘은 문의 영역 리팩토링의 큰 방향을 잡은 것만으로도 충분히 많이 했다.
