# 2026-05-20 오후 스터디 일지

## 작업 범위

오늘 오후에는 `homework19`의 나만의 콘텐츠 목록 과제를 시작했다. 주제는 여행 위시리스트로 정했고, Firebase Firestore를 연결해 목록, 등록, 상세 조회 흐름을 직접 구성했다. 기존 GraphQL/Apollo 기반 과제와 달리 Firestore는 `collection`, `doc`, `getDocs`, `getDoc`, `addDoc`를 직접 조합해야 해서 처음에는 데이터 흐름과 타입 지정이 낯설었다.

## 진행한 작업

### 1. Firebase 연결

- `src/commons/libraries/firebase.ts`에 Firebase 앱 초기화와 Firestore 인스턴스를 구성했다.
- `initializeApp(firebaseConfig)`로 앱을 만들고, `getFirestore(app)` 결과를 `db`로 export했다.
- 예전 강의 코드의 `17-01-firebase` 경로 대신 현재 프로젝트의 공통 라이브러리 경로를 사용하도록 방향을 잡았다.
- `getAnalytics`는 브라우저의 `window`에 의존하므로 Next.js SSR 환경에서 바로 실행하면 `window is not defined`가 날 수 있다는 점을 확인했다.

### 2. 여행 위시리스트 등록 페이지

- `src/app/myapis/new/page.tsx`에서 여행 위시리스트 등록 폼을 작성했다.
- 입력 필드는 `place`, `country`, `memo`, `season`, `priority`로 잡았다.
- `Input`, `TextArea`, `Select`, `Button`, `Modal`을 사용해 Ant Design 기반의 간단한 등록 UI를 만들었다.
- `inputState` 하나로 여러 input 값을 관리하고, input의 `name` 값을 이용해 공통 변경 함수에서 state를 업데이트했다.
- Ant Design `Select`는 일반 input처럼 `event.target.name`을 받지 않으므로, `handleSelectChange("season", value)`처럼 필드 이름을 직접 넘기는 방식으로 처리했다.
- 필수값인 여행지 이름과 국가/지역이 비어 있으면 `Modal.warning`을 보여주고 등록을 막았다.
- `addDoc(collection(db, "travelWishlists"), inputState)` 흐름으로 Firestore에 문서를 추가했다.

### 3. 테스트 데이터 생성

- 목록 화면을 확인하기 위해 `travelWishlists` 컬렉션에 테스트 데이터 84개를 생성했다.
- 데이터는 `place`, `country`, `memo`, `season`, `priority` 필드 구조를 맞춰 넣었다.
- 계절은 `봄`, `여름`, `가을`, `겨울`, 우선순위는 `상`, `중`, `하`가 섞이도록 만들었다.
- 생성 후 Firestore 조회 결과 전체 문서 수가 88개인 것을 확인했다.
- 기존에 있던 데이터가 4개 정도 있었고, 새로 84개가 추가된 상태로 판단했다.

### 4. 목록 조회 페이지

- `src/app/myapis/page.tsx`에서 `getDocs(collection(db, "travelWishlists"))`로 전체 목록을 조회했다.
- Firestore의 `doc.data()`에는 문서 id가 포함되지 않으므로, 목록용 데이터에는 `id: doc.id`를 직접 붙였다.

```ts
const datas = result.docs.map((el) => ({
  id: el.id,
  ...(el.data() as Omit<IFetchData, "id">),
}));
```

- `useState<IFetchData[]>([])`로 목록 state의 타입을 지정했다.
- `data.map()`으로 테이블 행을 렌더링하고, 클릭한 행의 `el.id`를 상세 페이지 이동에 사용했다.
- `router.push("../myapis/new")`로 등록 페이지 이동 버튼을 연결했다.

### 5. 상세 조회 페이지

- `src/app/myapis/[myapiId]/page.tsx`에서 URL 파라미터를 읽어 상세 데이터를 조회했다.
- 여러 문서를 가져오는 목록에서는 `collection + getDocs`를 쓰고, 문서 하나를 가져오는 상세에서는 `doc + getDoc`을 써야 한다는 점을 확인했다.

```ts
const docRef = doc(db, "travelWishlists", String(params.myapiId));
const result = await getDoc(docRef);
```

- Firestore 상세 조회 결과도 `result.data()` 안에는 id가 없으므로, `result.id`를 직접 합쳐 `detailData`를 만들었다.
- 문서가 없을 수도 있으므로 `result.exists()`로 존재 여부를 먼저 확인했다.
- 상세 화면에는 `place`, `country`, `memo`, `season`, `priority`를 표시하고, 목록/수정 버튼을 연결했다.

## 확인한 개념

### 1. Firestore의 `collection`과 `doc`

Firestore에서는 컬렉션과 문서를 명확히 구분한다.

```txt
collection(db, "travelWishlists")
= travelWishlists 컬렉션 전체

doc(db, "travelWishlists", id)
= travelWishlists 컬렉션 안의 특정 문서 하나
```

그래서 조회 함수도 나뉜다.

```txt
getDocs(collection(...)) = 여러 문서 조회
getDoc(doc(...)) = 문서 하나 조회
```

### 2. `doc.id`와 `doc.data()`

Firestore 문서는 id와 데이터가 분리되어 있다.

```txt
doc.id = 문서의 고유 id
doc.data() = 문서 안에 저장된 필드 데이터
```

따라서 목록이나 상세에서 페이지 이동, 수정, 삭제에 id가 필요하면 직접 합쳐야 한다.

```ts
{
  id: doc.id,
  ...doc.data(),
}
```

처음에는 번거롭게 느껴졌지만, Firestore에서는 이 패턴이 공식 사용법에 가깝다.

### 3. 비동기 데이터와 초기 렌더링

목록 데이터는 처음부터 들어있는 값이 아니라, 페이지가 먼저 렌더링된 뒤 `useEffect`에서 Firestore 요청이 끝나야 들어온다.

```txt
1. 첫 렌더링
2. data는 []
3. useEffect 실행
4. getDocs 요청
5. setData(datas)
6. 다시 렌더링
7. data에 목록이 들어옴
```

그래서 `data[0].id`처럼 바로 첫 번째 값을 꺼내면, 초기 렌더링에서는 `data[0]`이 `undefined`일 수 있다.

목록에서는 `data.map()`으로 렌더링하고, 클릭한 행의 `el.id`를 넘기는 방식이 더 안전하다.

### 4. Firestore 데이터 타입 지정

`useState()`를 빈 값으로만 쓰면 TypeScript가 state의 모양을 알 수 없다. 목록 데이터는 배열이므로 아래처럼 타입을 지정했다.

```ts
interface IFetchData {
  id: string;
  place: string;
  country: string;
  memo?: string;
  season: string;
  priority: string;
}

const [data, setData] = useState<IFetchData[]>([]);
```

`IFetchData`는 여행지 데이터 한 개의 모양이고, `IFetchData[]`는 그 데이터가 여러 개 들어있는 배열이라는 뜻이다.

Firestore의 `data()`는 TypeScript 입장에서는 구체적인 필드 구조를 모르는 값이기 때문에, 현재 프로젝트에서 기대하는 타입으로 알려주는 처리가 필요했다.

```ts
el.data() as Omit<IFetchData, "id">
```

여기서 `Omit<IFetchData, "id">`는 `IFetchData`에서 `id`만 뺀 타입이다. Firestore의 `data()`에는 id가 없고, id는 `el.id`로 따로 붙이기 때문에 이 형태가 자연스럽다.

## 아직 남은 작업

- `src/components/myapis-list/index.tsx`, `src/components/myapis-write/index.tsx`, `src/components/myapis-detail/index.tsx` 파일은 만들어져 있지만 아직 실제 구현은 비어 있다.
- 현재 목록, 등록, 상세 구현은 `src/app/myapis` 하위 page 파일에 직접 들어가 있다.
- 과제 요구사항에 맞추려면 page 파일은 컴포넌트를 조립하는 역할로 줄이고, 실제 UI와 로직은 `components/myapis-*` 쪽으로 분리해야 한다.
- 수정 페이지인 `src/app/myapis/[myapiId]/edit/page.tsx`는 아직 본격 구현 전이다.
- 수정 기능에는 `getDoc`으로 기존 값을 불러와 폼에 채우고, `updateDoc(doc(...))`으로 변경값을 저장하는 흐름이 필요하다.
- 삭제 기능까지 넣는다면 `deleteDoc(doc(...))`으로 문서를 삭제하고 목록으로 이동하는 흐름을 추가할 수 있다.
- 현재 목록 조회는 전체 문서를 한 번에 가져오므로, 데이터가 많아지면 페이지네이션이나 limit/query 조건을 고민할 수 있다.
- `handleViewDetail`의 `id` 파라미터 타입, 등록 페이지의 unused import, `console.log` 정리는 이후 타입 점검 때 같이 처리하면 좋다.

## 오늘 마무리 정리

오늘은 GraphQL/Apollo와 다른 Firestore식 데이터 흐름을 처음으로 익힌 시간이었다.

```txt
GraphQL/Apollo
= 서버 query/mutation 문서 중심

Firestore
= collection/doc 참조를 직접 만들고 getDocs/getDoc/addDoc 호출
```

특히 헷갈렸던 부분은 id 처리였다. GraphQL에서는 보통 `_id`가 응답 데이터 안에 들어오지만, Firestore에서는 문서 id와 문서 데이터가 분리되어 있다.

```txt
문서 주소 = doc.id
문서 내용 = doc.data()
문서 존재 여부 = result.exists()
```

오늘 기준으로 목록 조회, 등록, 상세 조회의 핵심 흐름은 잡혔다. 다음 단계는 지금 page 파일 안에 들어간 구현을 과제 요구사항에 맞게 컴포넌트와 hook/types 파일로 분리하고, 수정/삭제 흐름까지 이어가는 것이다.
