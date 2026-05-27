# 2026-05-26 오후 스터디 일지

## 작업 범위

오늘 오후에는 `homework22`, `homework23`에서 진행한 퍼블리싱 커밋을 확인하고, 이어서 `homework24`의 로그인/회원가입 화면과 회원가입 로직을 중심으로 학습했다.

앞선 두 커밋은 별도 질문 없이 마크업 중심으로 진행했다. 이후 `homework24`에서는 로그인과 회원가입 페이지를 분리하고, `createUser` GraphQL mutation을 연결하며 폼 검증, 객체 state, 스프레드 오퍼레이터, 라우팅, 모달 동작을 점검했다.

## 확인한 커밋

### 1. `10aa652 - homework22 마이페이지 마크업`

- `homework22` 폴더를 기준으로 마이페이지 화면을 구성했다.
- 게시글 관련 페이지와 `mypage/page.tsx`를 추가했다.
- 주로 퍼블리싱 작업이었고, 기능 로직보다는 화면 구조를 만드는 데 집중했다.

### 2. `9bb5abe - homework23 숙박권 관련 페이지 및 마이페이지 구현`

- `homework23` 폴더에 숙박권 상품 관련 페이지를 추가했다.
- 상품 목록, 상품 등록, 상품 상세, 마이페이지 화면을 구성했다.
- `commons/layout/hook.ts`도 함께 조정했다.
- 이 작업 역시 질문을 거의 하지 않고 퍼블리싱 중심으로 진행했다.

## 진행한 작업

### 1. Zustand 적용 시점 검토

`homework23` 과제에는 Zustand 전역 상태 관리가 포함되어 있었다.

처음에는 어떤 상태를 전역으로 빼야 할지 고민했지만, 아직 상품 등록/상세 페이지 마크업 중이므로 처음부터 억지로 Zustand를 넣기보다 화면과 클릭 흐름을 먼저 만든 뒤 필요해지는 상태만 전역화하는 것이 더 자연스럽다고 판단했다.

후보로는 아래 상태들이 적절해 보였다.

- 상품 상세의 구매 확인 모달 / 포인트 부족 모달 상태
- 마이페이지의 나의 상품 / 북마크 탭 상태
- 포인트 내역 탭 상태
- 상품 등록/수정 임시 작성 상태

최종 판단은 아래와 같다.

```txt
마크업 먼저
→ 로컬 state로 클릭 흐름 확인
→ 여러 컴포넌트가 공유해야 하는 상태만 Zustand로 이동
```

### 2. 로그인/회원가입 페이지 분리

처음에는 로그인과 회원가입을 한 페이지에서 `isJoin` state로 전환하는 구조를 생각했다.

```ts
const [isJoin, setIsJoin] = useState(false);
```

하지만 로그인과 회원가입은 실제 서비스에서 목적이 다르다.

```txt
로그인: 기존 사용자 인증
회원가입: 새 사용자 생성
```

그래서 한 페이지에서 토글하는 방식보다 페이지를 분리하는 편이 더 자연스럽다고 판단했다.

```txt
/homework24/login
/homework24/signup
```

페이지를 분리하면 URL, 새로고침, 뒤로가기, 직접 접근, 성공 후 이동 흐름이 더 명확해진다.

### 3. Next.js 라우팅 경로 확인

로그인 페이지에서 회원가입 페이지로 이동할 때 처음에는 상대경로를 사용했다.

```ts
router.push("../signup");
```

하지만 실제로는 `http://localhost:3000/signup`으로 이동했다. App Router에서 상대경로는 기대한 대로 항상 현재 homework 폴더를 기준으로 해석된다고 보기 어렵다.

그래서 과제 범위에서는 절대경로를 사용하는 것이 더 안전하다고 판단했다.

```ts
router.push("/homework24/signup");
```

나중에 homework 폴더가 반복되어 경로 수정이 불편해지면 `usePathname()`으로 현재 homework 경로를 추출하는 방법도 고려할 수 있지만, 현재 과제 범위에서는 명시적인 절대경로로 충분하다고 정리했다.

### 4. 회원가입 GraphQL 연결

회원가입 페이지에서 `createUser` mutation을 작성하고 `useMutation`으로 연결했다.

```ts
const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
    }
  }
`;
```

회원가입 버튼을 누르면 입력값을 검증한 뒤 `createUser`를 실행한다.

```ts
await createUser({
  variables: {
    createUserInput: userData,
  },
});
```

성공하면 입력값을 초기화하고 회원가입 성공 모달을 보여주도록 구성했다.

### 5. 객체 state와 스프레드 오퍼레이터

회원가입 폼 입력값은 객체 state로 관리했다.

```ts
const [userData, setUserData] = useState({
  email: "",
  name: "",
  password: "",
});
```

각 input의 `name` 속성과 state key를 맞추고, 하나의 `handleChange`로 여러 input을 처리했다.

```ts
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setUserData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};
```

여기서 중요한 개념은 아래와 같다.

```txt
...prevData = 기존 객체 값 유지
[name]: value = 현재 변경된 input key만 덮어쓰기
```

예를 들어 `name="email"`인 input에서 값이 바뀌면 아래와 같은 객체가 된다.

```ts
{
  ...prevData,
  email: value,
}
```

이 패턴은 회원가입, 로그인, 게시글 작성, 상품 등록처럼 input이 많은 폼에서 계속 재사용될 수 있다.

### 6. 폼 검증 흐름 정리

처음에는 각 조건마다 `setIsValid`를 여러 번 호출하는 방식으로 검증했다.

하지만 `setState`는 즉시 값이 바뀌는 것이 아니라 다음 렌더에서 반영되는 예약에 가깝다. 따라서 `setIsValid` 직후 `isValid` state를 읽어서 제출 여부를 판단하면 이전 값으로 판단할 수 있다.

그래서 버튼을 누른 시점의 현재 입력값으로 검증 객체를 바로 계산하고, 그 객체로 제출 여부를 판단하는 흐름을 정리했다.

```ts
const checkInvalid = {
  email: userData.email.includes("@"),
  name: userData.name !== "",
  password: userData.password !== "",
  confirmPassword:
    checkPassword !== "" && userData.password === checkPassword,
};

setIsValid(checkInvalid);

const isFormValid =
  checkInvalid.email &&
  checkInvalid.name &&
  checkInvalid.password &&
  checkInvalid.confirmPassword;

if (!isFormValid) return;
```

정리하면 역할은 아래와 같다.

```txt
checkInvalid = submit을 누른 순간의 즉시 검증 결과
setIsValid(checkInvalid) = 검증 결과를 화면에 표시하기 위해 state에 저장
isValid = 렌더링에서 에러 메시지를 보여주는 기준
```

이름은 `checkInvalid`보다 `nextIsValid` 또는 `checkValid`가 더 정확할 수 있다는 점도 확인했다. 현재 객체의 값은 "유효한가?"를 나타내기 때문이다.

### 7. 회원가입 성공 모달

회원가입 성공 후 Ant Design `Modal`을 사용해 성공 메시지를 보여주었다.

```tsx
<Modal
  open={isModalOpen}
  closable={false}
  maskClosable={false}
  footer={[
    <div className="flex justify-center" key="submit">
      <Button type="primary" onClick={handleGoToLogin}>
        로그인 하기
      </Button>
    </div>,
  ]}
>
  <p className="font-bold text-base text-center">
    회원가입을 축하드립니다
  </p>
</Modal>
```

확인한 내용은 아래와 같다.

- `closable={false}`: 오른쪽 위 X 버튼 제거
- `maskClosable={false}`: 배경 클릭으로 닫히지 않게 막기
- footer 버튼 가운데 정렬: footer 내부를 `flex justify-center`로 감싸기
- 로그인 하기 버튼 클릭 시 `/homework24/login`으로 이동

### 8. Ant Design Input 정리

비밀번호 입력에는 일반 `Input`보다 `Input.Password`가 더 적절하다는 점을 확인했다.

```tsx
<Input.Password
  placeholder="비밀번호를 입력하세요"
  name="password"
  onChange={handleChange}
  value={userData.password}
/>
```

비밀번호 확인 input도 같은 방식으로 변경하는 것이 더 자연스럽다.

## 오늘 확인한 개념

### 1. state는 즉시 판단용이 아니라 렌더링용에 가깝다

`setState` 직후 state를 읽으면 최신값이 아닐 수 있다. submit 시점에서 검증이나 분기 처리를 할 때는 state 업데이트 후 state를 다시 읽기보다, 함수 안에서 방금 계산한 값을 사용하는 것이 안전하다.

```txt
제출 판단 = 함수 안에서 계산한 값
에러 렌더링 = state에 저장된 값
```

### 2. 객체 state는 새 객체로 교체한다

React에서 객체 state를 직접 수정하지 않고, 스프레드 오퍼레이터로 새 객체를 만들어 교체한다.

```ts
setUserData((prev) => ({
  ...prev,
  [name]: value,
}));
```

이 패턴은 form 입력 처리의 핵심이다.

### 3. 동적 key 문법

`[name]: value`는 변수 `name`의 값이 객체 key가 된다는 뜻이다.

```txt
name = "email"이면 email 값 변경
name = "password"이면 password 값 변경
```

input의 `name`과 state key가 정확히 맞아야 이 패턴이 동작한다.

### 4. valid와 invalid 이름을 섞지 않기

boolean 객체를 만들 때는 이름과 값의 의미가 맞아야 한다.

```ts
const nextIsValid = {
  email: true,
};
```

위 값은 유효함을 뜻한다. 반대로 `isInvalid`라는 이름을 쓰려면 값이 에러 여부를 뜻해야 한다.

```ts
const nextIsInvalid = {
  email: true, // 이메일에 에러가 있음
};
```

이름이 반대로 섞이면 렌더링 조건에서 계속 헷갈린다.

### 5. 페이지 분리와 라우팅

로그인/회원가입처럼 목적이 다른 화면은 한 페이지에서 토글하기보다 별도 route로 분리하는 편이 사용자 흐름이 명확하다.

```txt
/homework24/login
/homework24/signup
```

Next.js App Router에서 페이지 이동은 상대경로보다 절대경로가 더 명확하다.

```ts
router.push("/homework24/signup");
```

## 현재 구현 상태

- `src/app/homework24/login/page.tsx`
  - 로그인 페이지 퍼블리싱
  - 회원가입 페이지 이동 버튼
  - 오른쪽 메인 비주얼 이미지

- `src/app/homework24/signup/page.tsx`
  - 회원가입 페이지 퍼블리싱
  - 이메일, 이름, 비밀번호, 비밀번호 확인 input
  - 입력값 객체 state 관리
  - 기본 폼 검증
  - `createUser` mutation 연결
  - 성공 모달
  - 로그인 페이지 이동

- `public/images/logo-large.png`
  - 로그인 화면 로고 이미지

- `public/images/main-visual.png`
  - 로그인/회원가입 화면 우측 비주얼 이미지

## 과제 기준 평가

회원가입 파트는 과제 요구사항을 거의 충족한 상태다.

```txt
이메일 인풋: 완료
이름 인풋: 완료
비밀번호 인풋: 완료
비밀번호 확인 인풋: 완료
회원가입 버튼: 완료
GRAPHQL-API createUser: 완료
회원가입 성공 모달: 완료
```

로그인 파트는 아직 퍼블리싱 중심이며, `loginUser` mutation 연결과 accessToken 처리, 로그인 상태에 따른 헤더 표시가 남아 있다.

## 남은 점검 포인트

- `checkInvalid` 이름을 `nextIsValid` 또는 `checkValid`로 바꿀지 검토하기
- 성공 모달 내부 이미지에 `alt` 추가하기
- 로그인 페이지에서 `loginUser` mutation 연결하기
- 로그인 성공 후 accessToken 저장 흐름 확인하기
- 로그인 상태일 때 헤더에 사용자 정보 표시하기
- 로그아웃 상태일 때 헤더 로그인 버튼 노출하기
- `src/app/page.tsx`, `commons/layout` 변경사항이 homework24 흐름과 맞는지 커밋 전 확인하기

## 오늘의 정리

오후 스터디에서는 퍼블리싱만 하던 흐름에서 다시 로직이 들어오기 시작했다. 특히 회원가입 폼을 만들면서 객체 state, 스프레드 오퍼레이터, 동적 key, submit 시점 검증, 렌더링용 state의 차이를 반복해서 확인했다.

아직 강의노트를 참고하면서 작성하는 단계이지만, 이제는 단순히 따라 치는 것이 아니라 "왜 state를 바로 읽으면 위험한지", "왜 페이지를 나누는 게 나은지", "왜 객체 이름과 boolean 의미가 맞아야 하는지"를 질문하며 코드 흐름을 보고 있다.

오늘의 핵심은 아래 문장으로 정리할 수 있다.

```txt
submit 판단은 현재 입력값으로 즉시 계산하고,
화면 표시를 위해 그 결과를 state에 저장한다.
```
