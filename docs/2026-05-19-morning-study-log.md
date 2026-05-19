# 2026-05-19 오전 스터디 일지

## 작업 범위

오늘 오전에는 `homework13`을 중심으로 게시글 목록과 상세 화면에 UI 라이브러리를 적용했다. 전날 만든 게시글 목록, 게시글 상세, 댓글 등록/목록 구조 위에 배너 캐러셀, Ant Design 아이콘, 별점 입력/표시 기능을 붙였고, 댓글 입력값 검증 UX와 컴포넌트 분리 구조를 함께 정리했다.

## 커밋 흐름

### 10:29 - homework13 antd, swiper 라이브러리 활용 및 오류 수정

- `homework13` 폴더를 추가하고 기존 `homework12` 흐름을 기반으로 게시글 목록, 등록, 수정, 상세 페이지를 연결했다.
- `swiper`를 사용해 게시글 목록 상단 배너 캐러셀을 만들었다.
- `public/images/banner-image-01.png`, `banner-image-02.png`, `banner-image-03.png`를 추가하고, `next/image`의 `fill` 방식으로 배너 이미지를 렌더링했다.
- `Swiper`, `SwiperSlide`, `Pagination`을 사용해 1장씩 넘겨지는 배너를 구성했다.
- 게시글 목록 컴포넌트를 `boards-list/list`와 `boards-list/banner`로 나누었다.
- `boards-list/list` 아래에 `hook.ts`, `index.tsx`, `queries.ts`, `types.ts`를 추가해 목록 조회와 삭제 로직을 분리했다.
- 게시글 상세의 좋아요, 싫어요 표시를 Ant Design 아이콘 기반으로 정리했다.
- 댓글 등록 화면에 Ant Design `Rate`를 적용해 별점 입력 UI를 추가했다.
- 댓글 목록에서도 `Rate`를 사용해 댓글의 별점을 읽기 전용으로 보여주는 방향을 적용했다.
- 댓글 등록 폼에서 최초 렌더링에는 경고문을 숨기고, 등록 시도 이후 빈 필드에만 "필수입력 사항 입니다." 문구가 보이도록 조건을 정리했다.
- `isSubmitted`와 입력값 존재 여부를 조합해 경고문 노출 타이밍을 제어하는 방식을 연습했다.
- AI와 함께 코드 흐름을 점검하면서 Swiper 이미지가 보이지 않는 문제, Ant Design 아이콘 import/사용법, 별점 값 전달 흐름을 확인했다.

## 확인한 개념

- Next.js의 `public` 폴더에 둔 이미지는 import하지 않고 `src="/images/..."`처럼 경로 문자열로 사용할 수 있다.
- `next/image`에서 `fill`을 쓰려면 부모 요소에 `position: relative`와 명확한 높이가 있어야 한다.
- Swiper 내부에서 이미지가 보이지 않을 때는 Swiper, SwiperSlide, 이미지 부모 요소의 높이가 잡혀 있는지 먼저 확인해야 한다.
- `Image`의 `width`, `height`에는 `auto`를 직접 넣을 수 없고, 비율 유지가 필요하면 `fill`과 `object-cover` 조합을 쓰는 편이 자연스럽다.
- Ant Design 아이콘은 `import { LikeOutlined } from "@ant-design/icons"`처럼 가져오고, JSX에서는 `<LikeOutlined />` 형태로 사용한다.
- Ant Design `Rate`의 `onChange`는 선택된 별점 숫자를 넘겨주므로, hook에서 `handleRate(value: number)`처럼 받아 state에 저장할 수 있다.
- 댓글 검증 UX는 처음부터 에러를 보여주기보다, 사용자가 등록을 시도한 뒤 빈 필드에만 보여주는 방식이 더 자연스럽다.
- `&&`는 앞 조건이 참일 때만 뒤 JSX를 렌더링할 때 자주 쓰인다.
- `||`는 여러 조건 중 하나라도 참이면 전체가 참이 되는 조건식에 적합하다.
- boolean 이름은 실제 의미와 맞아야 코드를 읽기 쉽다. 예를 들어 `isSubmitted`는 제출 시도가 있었는지, `isWriterEmpty`는 작성자가 비었는지처럼 true/false 의미가 명확해야 한다.

## 정리한 코드 품질

- 게시글 목록 컴포넌트를 배너 영역과 목록 영역으로 나누어 역할을 분리했다.
- 목록 관련 query, hook, types를 `boards-list/list` 하위로 옮기며 과제의 컴포넌트 분리 구조에 맞췄다.
- 별점 SVG를 직접 반복하던 흐름에서 라이브러리 컴포넌트 사용으로 전환했다.
- 댓글 등록 입력값 검증을 submit 시점과 입력값 상태를 기준으로 정리했다.
- 라이브러리를 붙일 때 단순히 import만 보는 것이 아니라, 실제 렌더링 조건과 부모 레이아웃까지 같이 확인해야 한다는 점을 점검했다.

## 남은 점검 포인트

- `styles.module.css` 파일은 만들어졌지만 Tailwind 중심으로 작성되어 실제 스타일 분리 역할은 아직 크지 않다.
- `comment-write`의 boolean 이름은 이후 `hasWriter`, `hasPassword`, `hasContents`처럼 의미가 더 직접적인 이름으로 바꾸면 읽기 쉬울 수 있다.
- Swiper 배너 컴포넌트의 unused import나 빈 CSS 파일은 이후 정리 대상이다.
- `homework13`까지는 UI 라이브러리 적용이 중심이었고, 이후 `homework14`에서는 주소 검색, 유튜브 URL, alert 모달화처럼 외부 입력값과 GraphQL 필드 확장 흐름을 더 신경 써야 한다.
