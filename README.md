# MyTrip

개인 학습과 과제 수행을 위한 여행 플랫폼 연습 프로젝트입니다.

완성형 서비스라기보다, 강의에서 배운 React, Next.js, TypeScript, GraphQL, 폼 처리, 상태 관리, 파일 업로드, 인증 흐름을 실제 화면과 기능으로 연결해보는 실습 프로젝트입니다.

## 진행 방식

- 과제별로 직접 구현하고, 막힌 부분은 원인과 흐름을 먼저 정리한 뒤 수정합니다.
- 구현한 기능과 배운 내용은 `docs/` 폴더에 날짜별 스터디 로그로 남깁니다.
- 처음부터 완벽한 구조를 만들기보다, 동작 흐름을 먼저 이해하고 필요한 시점에 리팩토링합니다.
- 강의 코드와 현재 패키지 버전이 다를 때는 차이를 확인하고 기록합니다.

## 실행 스크립트

- `npm run dev`: 개발 서버를 실행합니다.
- `npm run build`: 프로덕션 빌드를 생성합니다.
- `npm run start`: 빌드된 앱을 실행합니다.
- `npm run lint`: Next.js lint 검사를 실행합니다.
- `npm run codegen`: `codegen.ts` 설정 기준으로 GraphQL schema와 gql 문서를 읽어 타입과 typed document를 생성합니다.

## 실제로 사용한 패키지

아래 목록은 `package.json`에 설치된 패키지 중 현재 코드에서 실제로 사용했거나, 스터디 로그에서 구현 흐름을 확인한 항목 중심으로 정리했습니다.

### Core

- `next`: App Router 기반 페이지 구성, layout, route segment 학습에 사용했습니다.
- `react`, `react-dom`: 컴포넌트, state, effect, 이벤트 처리 학습에 사용했습니다.
- `typescript`: props, form data, GraphQL 응답, 이미지 상태 타입을 정리하는 데 사용했습니다.
- `tailwindcss`: 페이지와 컴포넌트 마크업 스타일링에 사용했습니다.

### UI

- `antd`: `Input`, `InputNumber`, `Button`, `Modal`, `Rate`, `Tooltip`, `DatePicker` 등 폼과 피드백 UI에 사용했습니다.
- `@ant-design/icons`: 네비게이션, 상세 페이지, 페이지네이션 아이콘에 사용했습니다.
- `swiper`: 공통 배너 캐러셀 구현에 사용했습니다.

### Form / Validation

- `react-hook-form`: `homework26` 상품 등록/수정 폼의 입력값 관리와 submit 처리에 사용했습니다.
- `zod`: 상품 등록/수정 폼의 검증 schema 작성에 사용했습니다.
- `@hookform/resolvers`: `zodResolver`로 `react-hook-form`과 `zod`를 연결하는 데 사용했습니다.

### GraphQL / API

- `@apollo/client`: GraphQL query/mutation, Apollo Client 설정, `authLink`, `errorLink`, 인증 헤더 처리에 사용했습니다.
- `graphql`: Apollo Client와 GraphQL 문서 작성에 필요한 기본 패키지로 사용했습니다.
- `apollo-upload-client`: GraphQL `Upload` 기반 파일 업로드와 `createUploadLink` 설정에 사용했습니다.
- `graphql-request`: `restoreAccessToken`처럼 Apollo hook 바깥에서 가벼운 GraphQL 요청을 보낼 때 사용했습니다.
- `@graphql-codegen/cli`: GraphQL 문서 기반 타입 생성 스크립트에 사용했습니다.

### State

- `zustand`: accessToken 전역 상태 관리에 사용했습니다.

### External Feature Libraries

- `react-daum-postcode`: 게시글/상품 주소 검색에 사용했습니다.
- `react-quill`: 상품 설명 에디터 구현에 사용했습니다.
- `react-youtube`: 게시글 상세의 YouTube 영상 임베드에 사용했습니다.
- `react-infinite-scroll-component`: 댓글/목록 무한 스크롤 실습에 사용했습니다.
- `firebase`: Firestore 기반 커스텀 API 실습에 사용했습니다.
- `lodash`: 게시글 검색/목록 처리에서 debounce 등 유틸 흐름 학습에 사용했습니다.
- `dayjs`: 날짜 범위 타입과 검색 조건 처리에서 사용했습니다.
- `@portone/browser-sdk`: 포인트 충전 결제 요청과 `paymentId` 기반 충전 mutation 연결에 사용했습니다.
- `dompurify`: ReactQuill 등에서 저장된 HTML 문자열을 상품 상세 화면에 안전하게 표시하기 위해 sanitize 처리에 사용했습니다.

## 실제 스터디 기록

### GraphQL 게시판 CRUD

- `createBoard`, `fetchBoard`, `fetchBoards`, `updateBoard`, `deleteBoard` 흐름을 Apollo Client로 연결했습니다.
- 게시글 작성/수정에서 주소 검색, 유튜브 URL, 이미지 업로드 흐름을 다뤘습니다.
- GraphQL `variables`, input type, mutation 인자 이름의 차이를 반복해서 확인했습니다.

### 댓글과 목록 UI

- 댓글 등록, 댓글 목록 조회, 별점 UI, 등록 후 refetch 흐름을 구현했습니다.
- 페이지네이션에서는 현재 페이지, 시작 페이지, 마지막 페이지, 전체 게시글 수를 나누어 관리했습니다.
- 무한 스크롤을 사용해 댓글/목록 데이터를 이어서 불러오는 흐름을 학습했습니다.

### Firebase / Open API 실습

- Firestore 기반 커스텀 데이터 조회/등록 흐름을 실습했습니다.
- Open API 목록과 무한 스크롤 화면을 구성했습니다.

### 공통 레이아웃

- `children`, `usePathname`, 공통 navigation, banner 노출 조건을 정리했습니다.
- 로그인/회원가입/상품 등록 같은 페이지에서는 공통 레이아웃을 숨기는 조건을 관리했습니다.

### homework26 여행상품 등록/수정

- `react-hook-form`과 `zod`로 상품 등록/수정 폼을 구성했습니다.
- `Controller`로 Ant Design input, `InputNumber`, `ReactQuill`을 연결했습니다.
- `fetchTravelproduct`로 기존 상품을 조회하고 `setValue`로 수정 폼 초기값을 세팅했습니다.
- `createTravelproduct`와 `updateTravelproduct` mutation에 서버 input 형태를 맞춰 전송했습니다.
- tags input 문자열을 `split -> trim -> filter(Boolean)`으로 `string[]`로 변환했습니다.
- Daum 주소 검색 후 Kakao geocoder로 위도/경도를 구하고 지도에 표시했습니다.

### 다중 이미지 업로드/수정

- 기존 서버 이미지와 새로 첨부한 `File` 객체의 차이를 정리했습니다.
- `ImagePreview` 타입으로 기존 이미지와 신규 이미지를 하나의 배열에서 관리했습니다.
- `previewUrl`은 화면 미리보기용, `uploadedUrl`은 서버 전송용으로 구분했습니다.
- 수정 시 기존 이미지 URL과 신규 업로드 URL을 합쳐 최종 `images: string[]` 형태로 보냈습니다.
- 이미지 URL 추출 과정에서 `filter((url): url is string => Boolean(url))` 타입가드 패턴을 학습했습니다.

### homework30/31 포인트 결제와 숙박권 구매 화면

- 숙박권 구매 메인 화면의 퍼블리싱을 진행했습니다.
- 상품 배너, 광고 배너, 상품 리스트, 필터, 최근 본 상품 UI를 구성했습니다.
- 트립토크 게시판을 카드형 목록과 검색 UI 중심으로 다시 정리했습니다.
- 공통 레이아웃에서 `/homework31/products` 경로에만 상품 배너가 나오도록 조건을 분리했습니다.
- 상품 상세에서 포인트 기반 구매 확인 모달과 포인트 부족 시 충전 모달 흐름을 연결했습니다.
- PortOne 결제 SDK를 사용해 포인트 충전 요청 후 `paymentId`를 서버 mutation으로 전달하는 흐름을 학습했습니다.
- `fetchPointTransactions`, `fetchPointTransactionsOfLoading`, `fetchPointTransactionsOfBuying`, `fetchPointTransactionsOfSelling`로 전체/충전/구매/판매 포인트 내역을 나누어 조회했습니다.
- 마이페이지 포인트 화면을 전체, 충전, 구매, 판매 내역 컴포넌트로 분리했습니다.
- 포인트 충전용 `paymentId`와 상품 구매용 포인트 차감 흐름을 구분했습니다.
- 금액과 포인트 표시는 `Intl.NumberFormat("ko-KR")` 기반 유틸로 정리했습니다.

### homework33 메모이제이션

- 여행상품 등록/수정 페이지에서 `useCallback`을 적용할 후보를 검토했습니다.
- 이미지 업로드, 이미지 삭제, 모달 열기/닫기처럼 props로 전달되는 이벤트 핸들러를 중심으로 메모이제이션을 적용했습니다.
- `useMemo`, `useCallback`, `React.memo`의 차이를 정리했습니다.
- 상품 목록 컴포넌트에 `React.memo`를 적용해 컴포넌트 메모이제이션 과제를 진행했습니다.
- 실제 성능 최적화는 무조건 적용하기보다 렌더 비용, props 안정성, React Profiler 측정 결과를 근거로 판단해야 한다는 점을 학습했습니다.

### homework35 Apollo 캐시와 optimistic UI

- 트립토크 상세 페이지의 좋아요/싫어요 기능에 `optimisticResponse`와 `cache.modify`를 적용했습니다.
- `writeQuery`는 쿼리 결과 전체를 다시 쓰는 방식이고, `cache.modify`는 캐시의 특정 필드만 수정하는 방식이라는 차이를 정리했습니다.
- 여행상품 문의 등록에서 `createTravelproductQuestion` mutation 응답을 `fetchTravelproductQuestions` 목록 앞에 추가하도록 변경했습니다.
- 여행상품 문의 삭제에서 삭제된 id와 캐시 항목의 `_id`를 비교해 목록에서 제거하도록 변경했습니다.
- Apollo 캐시 항목은 참조값일 수 있으므로 `item._id` 대신 `readField("_id", item)`로 필드를 읽는 패턴을 학습했습니다.
- 스크랩 기능에서 `toggleTravelproductPick`의 0/1 응답값은 사용자 스크랩 상태로, `pickedCount`는 전체 스크랩 수로 구분해 처리했습니다.
- `refetchQueries`, `cache.modify`, `optimisticResponse`를 언제 선택하면 좋을지 장단점을 비교했습니다.
- 마이페이지 사이드 메뉴 활성 상태를 `usePathname`으로 현재 URL에서 계산하는 흐름을 실험했습니다.
- 마이페이지 거래내역/북마크 화면을 조립 컴포넌트, hook, 거래내역 목록, 북마크 목록, 타입 파일로 분리했습니다.
- `fetchTravelproductsISold`, `fetchTravelproductsIPicked`의 무한 스크롤에서 `fetchMoreResult`가 배열이 아니라 쿼리 응답 객체라는 점을 확인했습니다.
- `hasMore`처럼 원본 데이터로 계산 가능한 값은 state 대신 파생 변수로 관리하는 흐름을 정리했습니다.
- 상품 1개 타입과 GraphQL 목록 응답 타입을 분리해 TypeScript 타입 오류를 해결했습니다.

### homework36 Open Graph

- Open Graph 태그가 링크 공유 미리보기에서 어떤 역할을 하는지 정리했습니다.
- 강의노트의 `<meta property="og:...">` 예시는 OG 원리를 설명하는 자료이고, Next.js App Router에서는 `metadata`와 `generateMetadata`를 사용하는 흐름이 더 적절하다는 점을 확인했습니다.
- 전역 static Open Graph는 `layout.tsx`의 `metadata`로, 여행상품 상세 dynamic Open Graph는 `[productId]/page.tsx`의 `generateMetadata`로 나누어 생각했습니다.
- `generateMetadata`는 서버 컴포넌트에서만 사용할 수 있으므로, 기존 상품 상세 hook 화면은 클라이언트 컴포넌트로 분리하는 구조를 검토했습니다.
- 서버에서 `params.productId`를 받고 Apollo `client.query()`로 상품 데이터를 조회해 `title`, `description`, `openGraph.images`로 변환하는 흐름을 정리했습니다.
- 상품 설명의 HTML 태그 제거, 상품 이미지가 없을 때 기본 OG 이미지 사용, OG 이미지의 절대 URL 필요성을 확인했습니다.

### homework37 서버 컴포넌트와 클라이언트 컴포넌트

- 상품 상세와 보드 상세를 서버 컴포넌트 중심으로 리팩토링하며 SSR/CSR 경계를 정리했습니다.
- `page.tsx`는 서버 데이터 조회와 route 조립을 담당하고, `metadata.ts`와 `getData.ts`로 dynamic metadata와 서버 조회 로직을 분리했습니다.
- `ServerShell`에서 읽기 전용 서버 컴포넌트 조각을 만들고, `ClientShell`에 `summary` 또는 `header` slot으로 전달하는 composition 방식을 적용했습니다.
- 클라이언트 컴포넌트에서는 hook, state, mutation, router 이동, 댓글, 모달 등 사용자 인터랙션을 유지했습니다.
- 서버에서 내려준 props와 클라이언트 Apollo cache가 자동 동기화되지 않는다는 점을 확인하고, 좋아요/싫어요 수는 client state로 관리하는 흐름을 학습했습니다.
- 서버 Apollo Client를 `createServerApolloClient()`로 요청마다 생성하고, `fetchOptions: { cache: "no-store" }`로 서버 GraphQL 요청 최신성을 확인했습니다.

### accessToken / refreshToken 인증 흐름

- 로그인 성공 후 accessToken을 Zustand에 저장했습니다.
- Apollo `authLink`에서 요청마다 `Authorization: Bearer accessToken` 헤더를 추가했습니다.
- refreshToken은 프론트 코드에 직접 저장하지 않고, 백엔드가 쿠키에 저장하는 흐름으로 이해했습니다.
- `credentials: "include"`가 refreshToken 쿠키 전송에 필요하다는 점을 확인했습니다.
- Apollo `errorLink`에서 인증 실패 에러를 감지하고 `restoreAccessToken`으로 새 accessToken을 받아왔습니다.
- 새 accessToken으로 실패했던 요청의 헤더를 교체한 뒤 `forward(operation)`으로 재시도하는 흐름을 학습했습니다.
- Apollo Client 3의 `graphQLErrors` 방식과 Apollo Client 4의 에러 처리 방식 차이도 확인했습니다.

## 날짜별 학습 로그

자세한 시행착오와 개념 정리는 `docs/` 폴더에 기록합니다.

- `docs/2026-05-18-morning-work-log.md`
- `docs/2026-05-18-afternoon-study-log.md`
- `docs/2026-05-19-morning-study-log.md`
- `docs/2026-05-19-afternoon-study-log.md`
- `docs/2026-05-20-morning-study-log.md`
- `docs/2026-05-20-afternoon-study-log.md`
- `docs/2026-05-22-study-log.md`
- `docs/2026-05-25-morning-study-log.md`
- `docs/2026-05-26-morning-study-log.md`
- `docs/2026-05-26-afternoon-study-log.md`
- `docs/2026-05-27-morning-study-log.md`
- `docs/2026-05-27-afternoon-study-log.md`
- `docs/2026-05-28-study-log.md`
- `docs/2026-06-01-morning-study-log.md`
- `docs/2026-06-01-afternoon-study-log.md`
- `docs/2026-06-02-morning-study-log.md`
- `docs/2026-06-02-afternoon-study-log.md`
- `docs/2026-06-04-morning-study-log.md`
- `docs/2026-06-04-afternoon-study-log.md`
- `docs/2026-06-08-morning-study-log.md`
- `docs/2026-06-08-afternoon-study-log.md`
- `docs/2026-06-09-study-log.md`

## 현재 목표

- 퍼블리싱 중심 구현에서 기능 개발 중심 프론트엔드 흐름으로 확장합니다.
- 화면, 폼 상태, API 요청, 서버 데이터 형태, 인증 흐름을 함께 이해합니다.
- 강의노트나 예제를 참고하더라도 각 줄이 어떤 역할을 하는지 설명할 수 있도록 기록합니다.
- 구현 후에는 어떤 데이터가 어디에서 오고, 어디로 보내지는지 추적할 수 있게 만듭니다.
