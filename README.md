# MyTrip

여행 상품 탐색, 트립토크 게시판, 마이페이지, 포인트 결제 흐름을 구현한 Next.js 포트폴리오 프로젝트입니다.

강의 과제에서 시작했지만, 현재는 기능 구현 경험을 정리하고 서비스형 프론트엔드 구조로 다듬는 데 초점을 두고 있습니다.

## 핵심 기능

- 여행 상품 목록, 상세, 등록, 수정
- 트립토크 게시판 목록, 상세, 작성, 수정
- 로그인 기반 인증 흐름과 accessToken 상태 관리
- 상품 문의, 댓글, 답글, 좋아요/스크랩 등 사용자 상호작용
- 마이페이지 포인트 내역, 거래내역, 북마크 목록
- PortOne 결제 SDK를 활용한 포인트 충전 흐름
- 서버 컴포넌트와 클라이언트 컴포넌트 분리
- Open Graph metadata, parallel route modal, URL query 기반 검색/페이지네이션
- Jest, Testing Library, MSW 기반 GraphQL mutation 테스트
- Dockerfile, docker-compose 기반 컨테이너 실행 환경 구성

## 기술 스택

| 영역 | 사용 기술 |
| --- | --- |
| Framework | Next.js 14, React 18, TypeScript |
| Data | GraphQL, Apollo Client, GraphQL Code Generator |
| State | Zustand, Apollo Cache |
| Form | React Hook Form, Zod |
| UI | Tailwind CSS, Ant Design, Swiper |
| External | PortOne, Firebase, Daum Postcode, Kakao Maps, React Quill |
| Test | Jest, Testing Library, MSW |
| Deploy Study | AWS EC2, PM2, Docker |

## 구현 포인트

- App Router 기반으로 `page`, `layout`, dynamic route, parallel route를 분리했습니다.
- 서버에서 먼저 필요한 데이터를 조회하고, 사용자 입력과 mutation은 클라이언트 컴포넌트에서 처리하도록 경계를 나눴습니다.
- Apollo `authLink`, `errorLink`, refreshToken cookie 흐름을 연결해 인증 실패 시 accessToken을 재발급받는 구조를 실습했습니다.
- GraphQL fragment와 codegen으로 서버 응답 타입을 재사용하고, generated 파일과 수동 작성 파일의 경계를 분리했습니다.
- 이미지 업로드에서는 기존 서버 이미지와 신규 `File` 객체를 구분해 등록/수정 payload를 구성했습니다.
- 테스트는 전체 화면보다 작은 검증 단위부터 시작해 MSW로 GraphQL 요청 성공/실패 흐름을 확인했습니다.

## 주요 경로

```txt
src/app/mytrip          # MyTrip 서비스 라우트
src/components          # 화면별 UI, hook, query 모듈
src/commons             # Apollo, store, layout, 공통 라이브러리
src/commons/graphql     # GraphQL codegen 결과물
src/dataconnect-generated
docs                    # 학습 기록과 배포 기록
study-archive           # 이전 homework 라우트 보관
```

## 실행 방법

```bash
npm install
npm run dev
```

프로덕션 빌드 확인:

```bash
npm run build
npm run start
```

테스트:

```bash
npm test
```

Docker 실행:

```bash
docker compose up --build
```

## 검증 상태

- `npm run build` 통과
- `npx tsc --noEmit` 통과
- `npm test -- --runInBand` 통과
- `npm run lint`는 아직 ESLint 설정 파일이 없어 Next.js 초기 설정 프롬프트가 뜨는 상태입니다.

## 기록

- 상세 학습 기록: [`docs/`](./docs)
- EC2 배포 기록: [`docs/2026-06-11-aws-ec2-deploy-log.md`](./docs/2026-06-11-aws-ec2-deploy-log.md)
- Docker 학습 기록: [`docs/2026-06-12-study-log.md`](./docs/2026-06-12-study-log.md)
- 이전 README 보관본: [`docs/archive/README-before-portfolio-summary-2026-06-12.md`](./docs/archive/README-before-portfolio-summary-2026-06-12.md)
