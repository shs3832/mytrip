# MyTrip 상품 영역 리팩토링 TODO

상품 영역을 과제형 구현에서 포트폴리오형 기능 흐름으로 다듬기 위한 작업 메모입니다.

## 현재 기준

- 상품 라우트는 `/mytrip/products` 기준으로 정리 필요
- 일부 작성/수정 성공 이동 경로에 과거 `/homework26/products` 경로가 남아 있음
- 상품 작성/수정은 `react-hook-form`, `zod`, 파일 업로드, Kakao Map 주소 좌표를 함께 사용
- 상품 상세는 SSR 데이터, 클라이언트 상호작용, 결제/포인트/찜/문의 기능이 섞여 있음
- generated 파일은 직접 수정하지 않음

## 1순위: 상품 라우트와 기본 흐름 정리

- 상품 작성 성공 후 이동 경로가 `/mytrip/products/:productId` 기준인지 확인
- 상품 수정 성공 후 이동 경로가 `/mytrip/products/:productId` 기준인지 확인
- 목록, 상세, 작성, 수정 페이지 진입 경로 점검
- 과거 homework 경로가 실행 코드에 남아 있는지 확인
- 상품 상세 SSR fetch 캐시 전략 확인

## 2순위: 상품 작성/수정 폼

- `react-hook-form` 입력 state와 별도 state의 역할 구분
- `tags` 문자열 ↔ 배열 변환 흐름 정리
- 주소 검색 결과, 위도/경도, Kakao Map 표시 흐름 확인
- 기존 이미지와 새 이미지 업로드 상태 구분 유지
- `File`, preview URL, 업로드된 URL의 데이터 형태 구분
- 작성/수정 payload 생성 흐름 정리
- 이미지 삭제 시 `URL.revokeObjectURL` 처리와 기존 서버 이미지 처리 확인

## 3순위: 상품 상세 화면

- 서버에서 받은 상품 데이터와 클라이언트 state의 역할 분리
- 이미지가 없을 때 대표 이미지/fallback 처리
- 썸네일 클릭 시 대표 이미지 변경 흐름 확인
- `dangerouslySetInnerHTML` 사용 전 DOMPurify 적용 흐름 유지
- 위치 정보가 없을 때 Kakao Map 렌더링 조건 정리
- 판매자 본인 여부에 따른 버튼 노출 기준 확인

## 4순위: 찜/구매/포인트 상호작용

- 찜 optimistic UI와 Apollo cache 업데이트 흐름 점검
- `pickedCount` 표시 여부와 실제 데이터 연결 확인
- 비로그인 상태에서 찜/구매 클릭 시 동작 확인
- 구매 전 본인 상품 구매 방지 여부 확인
- 포인트 부족 시 충전 모달 흐름 확인
- PortOne 결제 성공/실패/취소 케이스 처리 확인
- 결제 후 유저 포인트 refetch 및 UI 반영 확인

## 5순위: 상품 문의/답글

- 문의 작성 후 목록 갱신 방식 확인
- 문의 삭제 시 cache.modify와 refetchQueries 중 선택 기준 정리
- 답글 작성/수정/삭제 흐름 확인
- 문의와 답글의 권한 기준 확인
- 무한스크롤 또는 페이지네이션 적용 여부 결정
- 질문/답글 컴포넌트와 hook 책임 분리 여부 점검

## 6순위: 상품 목록

- 현재 정적/샘플 UI인지 실제 상품 목록 API 연동 대상인지 결정
- 상품 목록 카드 클릭 경로가 `/mytrip/products/:productId` 기준인지 확인
- 목록 검색/필터/정렬 기능 구현 여부 결정
- 대표 이미지 fallback 처리
- 포트폴리오용 상품 목록 UX 방향 결정

## 보류/확인 항목

- 외부 실습 API의 이미지 수정/삭제 반영 방식 확인
- Kakao Maps SDK 로딩 타이밍과 `autoload=false` 흐름 확인
- PortOne 환경변수 없을 때 결제 버튼 노출/비활성화 여부 결정
- 상품 구매 mutation이 실제 거래 상태를 어떻게 바꾸는지 확인
- 상품 목록을 실제 API 기반으로 만들지, 포트폴리오용 소개 섹션으로 유지할지 결정
- README에는 products 정리 완료 후 핵심 기능만 짧게 반영

## 최근 검증 상태

아직 products 영역 기준 검증 전:

- `npx tsc --noEmit`
- `npm test -- --runInBand`
- `npm run build`
