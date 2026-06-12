# MyTrip 리팩토링 TODO

보드 영역을 시작으로 과제형 코드에서 포트폴리오형 코드로 다듬기 위한 작업 메모입니다.

## 현재 기준

- `homework40` 흐름은 `mytrip` 라우트 중심으로 이동 중
- 과거 homework 코드는 `study-archive`에 보관
- generated 파일은 직접 수정하지 않음
- 기능 추가보다 구조 정리, 타입 안정성, 빌드 검증을 우선

## 1순위: 보드 목록 페이지네이션

- `page`, `currentPage`, URL query의 역할 분리
- 검색어/날짜 변경 시 1페이지 초기화 흐름 정리
- `refetch`, `fetchMore`, `fetchBoardsCount` 호출 책임 점검
- 새로고침/공유 URL에서도 같은 목록 상태가 재현되는지 확인

검증 기준:

```bash
npx tsc --noEmit
npm test -- --runInBand
npm run build
```

## 2순위: 보드 목록 검색/필터

- 검색 input, 날짜 range, 검색 버튼의 데이터 흐름 정리
- debounce 사용 여부 결정
- 검색 조건이 비어 있을 때 URL query 초기화 방식 확인
- Ant Design 초기 스타일 깜빡임 대응 방식 결정

## 3순위: 보드 상세 상호작용

- 좋아요/싫어요 optimistic UI 흐름 점검
- YouTube URL 파싱 결과가 없을 때 렌더링 조건 정리
- 이미지가 없을 때 빈 영역 또는 fallback 처리 결정
- 댓글 작성/목록 갱신 흐름 확인

## 4순위: 보드 작성/수정

- 작성/수정 공통 hook 책임 점검
- 이미지 업로드 상태와 기존 서버 이미지 구분 유지
- 주소, YouTube URL, 파일 payload 변환 흐름 정리
- mutation 성공 후 이동 경로가 모두 `/mytrip` 기준인지 확인

## 보류/확인 항목

- 삭제 기능은 현재 API가 password 검증을 제공하지 않으므로 UI 노출 여부만 결정
- `modal-pararell` 폴더명은 연습용 보관인지, 실제 parallel route로 복구할지 결정
- `fetchPolicy: "no-cache"`와 Next fetch 캐시 전략은 별개로 관리
- README는 채용 담당자용 요약 문서로 짧게 유지

## 최근 검증 상태

2026-06-12 기준:

- `npx tsc --noEmit` 통과
- `npm test -- --runInBand` 통과
- `npm run build` 통과

