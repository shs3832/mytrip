# 2026-06-15 리팩토링 학습노트

보드 영역을 중심으로 과제형 코드에서 포트폴리오형 코드로 다듬으며 정리한 판단 기준입니다.

## 오늘 정리한 핵심

- 과거 homework 라우트를 `/mytrip` 기준 라우트로 옮기며 이동 경로를 점검했다.
- 보드 목록에서 검색어, 날짜, 페이지 상태와 URL query의 역할을 분리했다.
- Ant Design `DatePicker`가 `Dayjs` 값을 넘기고, 서버 요청과 URL query에서는 `Date` 또는 문자열로 변환해야 함을 확인했다.
- SSR로 받은 데이터와 클라이언트에서 즉시 바뀌는 state의 책임을 구분했다.
- 댓글 작성, 수정, 삭제 후 목록 갱신 방식으로 `refetchQueries`와 `cache.modify`의 선택 기준을 비교했다.
- 이미지 업로드에서 `File`, preview URL, 서버 URL을 구분해야 함을 다시 확인했다.
- 보드 수정 과정에서 `updateBoard` mutation 응답과 `fetchBoard` 조회 결과가 일시적으로 불일치할 수 있음을 로그로 확인했다.
- 작성/수정 form에서 서버로 보낼 payload를 만드는 함수를 분리하면 handler의 책임이 더 명확해진다는 점을 확인했다.
- products 영역도 같은 방식으로 정리하기 위해 별도 TODO 문서를 만들었다.

## refetchQueries와 cache.modify

`refetchQueries`가 더 어울리는 경우:

- 작성/삭제처럼 목록 개수나 페이지 경계가 바뀔 수 있을 때
- 서버 정렬 기준을 다시 맞추는 편이 안전할 때
- 캐시를 직접 수정하는 로직이 더 복잡해질 때

`cache.modify`가 어울리는 경우:

- 이미 목록 안에 있는 항목 하나의 필드만 바뀔 때
- 수정 후 스크롤 위치를 유지하고 싶을 때
- mutation 응답으로 변경 범위가 명확하게 내려올 때

오늘 기준으로는 댓글 작성/삭제는 `refetchQueries`를 유지하고, 댓글 수정은 나중에 `cache.modify` 후보로 볼 수 있다고 판단했다.

## 서버 캐시와 Apollo 캐시

Next 서버 fetch 캐시와 Apollo 클라이언트 캐시는 같은 "캐시"라는 이름을 쓰지만 역할이 다르다.

- 서버 fetch 캐시: 서버 컴포넌트에서 받아온 응답을 얼마나 재사용할지 결정한다.
- Apollo 클라이언트 캐시: 브라우저에서 조회한 GraphQL 데이터를 화면 상태와 맞추는 데 사용한다.

좋아요 수처럼 새로고침 후 최신성이 중요한 데이터는 서버 fetch 캐시 전략을 조심해야 한다. 반면 댓글 목록처럼 화면 갱신이 필요한 데이터는 `refetchQueries`나 Apollo cache update를 상황에 맞게 선택한다.

## 이미지 업로드에서 구분할 데이터

이미지 기능에서는 비슷해 보이는 값들이 서로 다른 의미를 가진다.

- `File`: 사용자가 새로 선택한 실제 파일 객체
- preview URL: 브라우저에서 미리보기를 위해 만든 임시 URL
- 서버 URL: 업로드 mutation 후 서버가 반환한 저장 경로
- 제출 images 배열: create/update mutation에 보낼 최종 이미지 경로 목록

보드 이미지는 슬롯 위치 유지가 필요하므로 `["url", "", "url"]`처럼 빈 문자열을 포함할 수 있다. 이 경우 저장 state는 슬롯을 유지하고, 상세 화면에서는 빈 문자열만 렌더링에서 제외한다.

## payload builder를 분리하는 이유

함수를 나누는 목적이 항상 중복 제거는 아니다. 이번 정리에서는 handler가 너무 많은 책임을 갖지 않도록 의도를 분리하는 쪽에 가까웠다.

정리 전:

- 변경 비교
- 주소 객체 조립
- 이미지 변경 판단
- 비밀번호 입력
- mutation 실행
- 성공/실패 처리

정리 후:

- `buildUpdateBoardInput`: 서버에 보낼 수정 payload 생성
- `handleEdit`: 비밀번호 확인 후 mutation 실행

반복 사용되지 않더라도 복잡한 payload 조립은 별도 함수로 빼면 디버깅할 때 "무엇을 보냈는지" 확인하기 쉬워진다.

## products 영역 다음 정리 방향

- `/homework26/products`로 남아 있는 이동 경로를 `/mytrip/products` 기준으로 정리한다.
- `react-hook-form` 입력 state와 이미지 파일 state의 역할을 구분한다.
- tags 문자열과 배열 변환 흐름을 정리한다.
- 상품 상세의 찜, 구매, 포인트 충전 흐름을 점검한다.
- 상품 문의와 답글의 작성, 수정, 삭제 후 목록 갱신 방식을 정리한다.

## 다음 검증

products 정리 전후로 아래 명령을 기준으로 확인한다.

```bash
npx tsc --noEmit
npm test -- --runInBand
npm run build
```
