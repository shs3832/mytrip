# 2026-05-25 오전 스터디 일지

## 작업 범위

오늘 오전에는 `homework20`의 이미지 업로드 과제를 중심으로 진행했다. 강의 노트를 참고해 Apollo 업로드 세팅을 적용하고, 게시글 등록/수정/상세 화면에 이미지 업로드, 미리보기, 삭제, 전송 흐름을 연결했다. 직접 처음부터 전부 설계했다기보다는 강의 코드와 AI가 제안한 코드를 읽고, 흐름을 따라가며 필요한 부분을 이해하고 보완하는 방식으로 진행했다.

이번 과제는 기존 게시글 CRUD에 파일 업로드가 추가되면서 난이도가 올라갔다. 단순 input 값 관리가 아니라 숨겨진 file input, div 클릭 이벤트, GraphQL `Upload` 타입, 이미지 URL 배열, index 기반 미리보기, 수정 모드 초기값, 상세 이미지 렌더링까지 여러 개념이 함께 얽혀 있었다.

## 진행한 작업

### 1. Apollo 이미지 업로드 세팅

- 기존 Apollo Client 설정에 `apollo-upload-client`를 적용했다.
- `createUploadLink`를 사용해 GraphQL `Upload` 타입 파일 전송이 가능하도록 설정했다.
- 강의 코드에서는 `apollo-upload-client/createUploadLink.mjs`를 직접 import하는 방식이 나왔고, 현재 패키지 버전에서는 타입 패키지와 import 경로 차이를 함께 확인했다.
- `@types/apollo-upload-client` 버전 호환 문제를 점검했고, 현재 프로젝트에서는 타입체크가 통과하는 상태까지 확인했다.

### 2. GraphQL 문서 보완

- 게시글 등록 mutation에 `images` 필드를 추가했다.
- `createBoard` 호출 시 업로드된 이미지 URL 문자열 배열을 함께 전송하도록 수정했다.
- `uploadFile` mutation을 추가했다.

```ts
mutation uploadFile($file: Upload!) {
  uploadFile(file: $file) {
    url
    _id
    size
    createdAt
    updatedAt
  }
}
```

- `uploadFile`은 실제 파일을 서버에 저장하고, 게시글에는 파일 자체가 아니라 서버에서 받은 `url` 문자열을 저장하는 흐름이라는 점을 정리했다.
- `queries.ts`의 gql 문서를 수정한 뒤 codegen 결과가 generated GraphQL 파일에 반영되는 흐름을 다시 확인했다.

### 3. 게시글 등록 이미지 업로드 구현

- `src/components/boards-write/hook.ts`에서 이미지 URL 상태를 배열로 관리했다.

```ts
const [imageUrls, setImageUrls] = useState(["", "", ""]);
```

- 이미지 업로드 박스가 3개이므로, 각 칸을 별도 state로 만들기보다 배열과 `index`를 사용했다.
- 파일 선택 시 `uploadFile` mutation을 실행하고, 응답으로 받은 이미지 URL을 해당 index 위치에 저장했다.

```ts
setImageUrls((prev) => {
  const image = [...prev];
  image[index] = data.uploadFile.url;
  return image;
});
```

- 이 코드는 배열에 계속 추가하는 방식이 아니라, 선택한 위치의 값만 교체하는 방식이라는 점을 확인했다.
- 이미지가 필수값은 아니므로, 게시글 등록 시에는 빈 문자열을 제외한 URL만 전송하도록 `filter(Boolean)`을 적용했다.

```ts
images: imageUrls.filter(Boolean);
```

### 4. div 클릭으로 file input 실행

- 화면에는 네모난 업로드 박스를 보여주고, 실제 파일 선택은 숨겨진 `<input type="file">`이 담당하도록 구성했다.
- div를 클릭하면 해당 id의 input을 찾아 `.click()`을 실행하는 방식으로 연결했다.

```ts
const targetInput = document.getElementById(target) as HTMLInputElement;
if (!targetInput) return;
targetInput.click();
```

- 처음에는 div 클릭과 input change 이벤트의 역할이 헷갈렸지만, 흐름을 아래처럼 정리했다.

```txt
div 클릭
→ 숨겨진 input 클릭
→ 파일 선택창 열림
→ 파일 선택
→ input onChange 실행
→ uploadFile mutation 실행
→ imageUrls[index] 갱신
→ 미리보기 렌더링
```

- input을 찾지 못할 수 있으므로 `if (!targetInput) return;` 같은 방어 코드가 있으면 더 안전하다는 점도 확인했다.

### 5. 미리보기와 삭제 기능

- `src/components/boards-write/index.tsx`에서 `new Array(3).fill(0).map(...)`으로 이미지 업로드 박스 3개를 렌더링했다.
- 각 박스는 `imageUrls[index]` 값이 있으면 미리보기 이미지를 보여주고, 값이 없으면 업로드 아이콘을 보여준다.
- 미리보기 이미지의 `src`는 서버에서 받은 URL에 Google Storage base URL을 붙여 구성했다.

```tsx
src={`https://storage.googleapis.com/${imageUrls[index]}`}
```

- 삭제 버튼을 누르면 해당 index의 이미지만 빈 문자열로 되돌리도록 처리했다.
- 삭제 버튼 클릭이 부모 div 클릭으로 이어져 파일 선택창이 다시 열리는 문제를 막기 위해 `event.stopPropagation()`을 사용했다.

```tsx
onClick={(event) => {
  event.stopPropagation();
  handleDeleteImage(index);
}}
```

### 6. 이미지 용량 제한

- 파일 선택 시 5MB를 초과하면 업로드하지 않고 경고 모달을 보여주도록 처리했다.

```ts
if (file && file.size > 5 * 1024 * 1024) {
  Modal.warn({
    title: "파일 크기 초과",
    content: "5MB 이하의 파일만 업로드 가능합니다.",
  });
  return;
}
```

- 파일 크기는 byte 단위이므로 `5 * 1024 * 1024`가 5MB라는 점을 확인했다.

### 7. 게시글 수정 이미지 처리

- 수정 페이지에서는 `fetchBoard`로 기존 게시글 데이터를 불러오고, 기존 이미지 배열을 `imageUrls`에 연결했다.
- 기존 이미지가 있으면 업로드 아이콘 대신 미리보기를 보여주고, 없는 칸은 기존처럼 업로드 박스를 보여주는 구조로 구현했다.
- 수정 시 현재 이미지 배열과 기존 이미지 배열을 비교해 이미지가 변경되었는지 확인했다.

```ts
const isImageChanged = imageUrls.some(
  (url, index) => url !== (data?.fetchBoard?.images?.[index] ?? ""),
);
```

- 이미지가 변경된 경우에만 `updateBoardInput.images`에 이미지 배열을 넣도록 구성했다.
- 단, 기존 이미지가 1개만 있는 경우에도 화면은 3칸을 렌더링하므로, 수정 모드 초기값은 항상 3칸 배열로 맞추는 것이 더 안정적이라는 점을 확인했다.

```ts
setImageUrls([
  data.fetchBoard.images?.[0] ?? "",
  data.fetchBoard.images?.[1] ?? "",
  data.fetchBoard.images?.[2] ?? "",
]);
```

### 8. 게시글 상세 이미지 표시

- 게시글 상세 화면에서 `fetchBoard` 결과의 `images`를 사용해 이미지를 내용 위쪽에 세로로 보여주도록 구성했다.
- 이미지가 없는 경우에는 렌더링하지 않도록 빈 문자열을 제외하는 방향을 확인했다.
- React의 `map` 렌더링에서는 반복되는 최상위 요소에 `key`가 있어야 하므로, 상세 이미지 렌더링은 `filter(Boolean).map(...)` 형태로 정리하면 더 깔끔하다는 점을 확인했다.

## 오늘 확인한 개념

### 1. 파일 업로드는 input 값 전송과 다르다

일반 게시글 등록은 문자열 값을 서버에 보내면 됐다.

```txt
title
contents
writer
password
```

하지만 이미지 업로드는 한 단계가 더 있다.

```txt
파일 선택
→ uploadFile로 파일 저장
→ 서버가 이미지 url 반환
→ createBoard/updateBoard에는 url 문자열 배열 전송
```

즉, 게시글에 저장되는 것은 파일 자체가 아니라 이미지 URL이다.

### 2. 숨겨진 input과 div 클릭

파일 input은 기본 UI가 제한적이라 실제 서비스에서는 숨겨두고, 사용자가 보기 좋은 div나 버튼을 클릭하게 만드는 경우가 많다.

```txt
보이는 것 = div
실제 파일 선택 = input type="file"
둘을 연결하는 것 = input.click()
```

이 흐름은 처음에는 낯설지만, 이미지 업로드 UI에서 자주 쓰이는 패턴이다.

### 3. index 기반 배열 state

이미지 업로드 칸이 3개라면 state도 3칸 배열로 맞추면 생각하기 쉽다.

```ts
["첫 번째 이미지", "두 번째 이미지", "세 번째 이미지"]
```

가운데 이미지를 바꿨다면 `imageUrls[1]`만 바뀌면 된다. 이때 `map`의 `index`가 화면의 칸 번호와 state의 위치를 이어주는 역할을 한다.

### 4. `filter(Boolean)`

이미지를 1개만 올리면 state는 아래처럼 될 수 있다.

```ts
["a.jpg", "", ""]
```

서버에 보낼 때 빈 문자열까지 보낼 필요는 없으므로 아래처럼 정리한다.

```ts
imageUrls.filter(Boolean);
```

결과는 의미 있는 값만 남는다.

```ts
["a.jpg"]
```

### 5. 이벤트 버블링

삭제 버튼은 이미지 박스 안에 있다. 그래서 삭제 버튼을 누르면 부모 div의 클릭 이벤트까지 같이 실행될 수 있다.

```txt
삭제 버튼 클릭
→ 버튼 onClick 실행
→ 부모 div onClick 실행
→ 파일 선택창이 다시 열림
```

이 흐름을 막기 위해 `event.stopPropagation()`을 사용했다.

### 6. 수정 모드는 초기값이 중요하다

등록 모드는 빈 값에서 시작하지만, 수정 모드는 서버에서 기존 값을 가져와 state에 넣어야 한다.

```txt
fetchBoard
→ inputStates 초기화
→ 주소 초기화
→ youtubeUrl 초기화
→ imageUrls 초기화
```

이미지처럼 3칸 UI를 가진 값은 서버 데이터가 1개만 있더라도 state는 3칸으로 맞춰두는 편이 안정적이다.

## 현재 구현 상태

- `src/commons/settings/apollo-setting.tsx`: Apollo upload link 세팅
- `src/components/boards-write/queries.ts`: `uploadFile`, `createBoard images`, `fetchBoard images` 관련 GraphQL 문서 보완
- `src/components/boards-write/hook.ts`: 이미지 업로드, 삭제, 수정 여부 비교, 등록/수정 전송 로직
- `src/components/boards-write/index.tsx`: 이미지 업로드 박스 3개, 미리보기, 삭제 버튼 UI
- `src/components/boards-detail/detail/index.tsx`: 상세 화면 이미지 표시
- `src/components/boards-write/types.ts`: 이미지 배열을 포함할 수 있도록 수정 타입 보완
- `codegen.ts`: codegen이 generated 파일이나 `.d.ts` 파일을 잘못 읽지 않도록 제외 범위 정리

## 검증 결과

오늘 오전 기준으로 TypeScript 타입체크를 실행했고 통과했다.

```bash
npx tsc --noEmit --incremental false
```

## 남은 정리 포인트

- 수정 모드에서 `setImageUrls`는 항상 3칸 배열로 정규화하는 형태가 더 좋다.
- 상세 화면 이미지 map은 `filter(Boolean).map(...)` 형태로 정리하면 React key 경고 가능성을 줄일 수 있다.
- `uploadFile` 응답의 `data?.uploadFile?.url`이 없을 경우에 대한 방어 코드를 추가하면 더 안전하다.
- `console.log(data)` 같은 디버깅 로그는 마무리 전에 제거하는 것이 좋다.
- `dataconnect`, `src/dataconnect-generated` 관련 변경은 homework20 이미지 업로드와 직접 관련이 적어 보이므로 커밋 전에 포함 여부를 따로 판단하는 것이 좋다.

## 오늘 마무리

오늘은 완전히 처음부터 스스로 설계했다기보다는, 강의 노트와 AI가 제안한 코드를 보면서 흐름을 읽고 이해하는 방식으로 진행했다. 그래도 단순히 복사만 한 것은 아니었다. `index`, `imageUrls`, `filter(Boolean)`, `event.stopPropagation()`, 수정 모드 초기값 같은 부분을 하나씩 질문하고 확인하면서 코드가 왜 그렇게 생겼는지 조금씩 따라갔다.

특히 이번 과제는 코드량이 길어지면서 `index.tsx`, `hook.ts`, `queries.ts`, `types.ts`, generated GraphQL 파일이 함께 움직였다. 그래서 한 파일만 보는 방식으로는 흐름이 잘 보이지 않았다. 앞으로 복잡한 기능을 볼 때는 아래 순서로 좁혀서 보는 것이 도움이 될 것 같다.

```txt
1. 이 기능의 state는 무엇인가?
2. 그 state를 바꾸는 함수는 어디 있는가?
3. 그 함수는 어떤 이벤트에서 실행되는가?
4. 서버 요청은 어디서 나가는가?
5. 응답값은 어디에 저장되는가?
6. 화면은 어떤 조건으로 바뀌는가?
```

오늘 얻은 가장 큰 감각은 "AI가 제안한 코드를 보고 흐름을 읽을 수 있다"는 것이다. 아직 완전히 익숙하지는 않지만, 이상한 부분을 질문하고 고치는 단계로 조금씩 넘어가고 있다.
