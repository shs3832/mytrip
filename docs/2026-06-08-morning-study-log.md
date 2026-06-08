# 2026-06-08 오전 스터디 일지

## 작업 범위

오늘 오전에는 `homework35`의 남은 과제 요구사항 중 `cache.modify`를 이용한 삭제 갱신 흐름을 중심으로 정리했다.

주요 작업 범위는 아래와 같다.

- 트립토크 메인 게시판 삭제를 `refetchQueries`에서 `cache.modify`로 변경
- 게시판 목록 삭제 시 `fetchBoards` 목록과 `fetchBoardsCount`를 함께 갱신
- 마이페이지 `거래내역 & 북마크` 영역에서 나의 상품 삭제 API 확인
- `deleteTravelproduct` mutation으로 나의 상품 글 삭제 흐름 구현
- `fetchTravelproductsISold` 목록과 `fetchTravelproductsCountISold` 캐시 갱신 시도
- 마이페이지 공통 사용자 정보 영역과 탭 메뉴 컴포넌트 위치 정리
- URL 마지막 경로 조각을 이용한 마이페이지 메뉴 활성 상태 표시 방식 확인
- 북마크 삭제는 아직 남은 작업으로 분리

오늘 작업은 새로운 큰 기능을 붙이는 것보다, 이미 배운 Apollo 캐시 수정 패턴을 다른 목록에 옮겨 적용하는 연습에 가까웠다.

## homework35 요구사항 확인

`homework35`의 핵심 요구사항은 `refetchQueries`로 다시 서버에 요청하던 흐름을 `cache.modify`로 바꾸는 것이다.

요구사항은 크게 아래처럼 나뉜다.

```txt
트립토크 상세
-> 좋아요 optimistic UI

여행상품 상세
-> 댓글 등록 cache.modify
-> 댓글 삭제 cache.modify
-> 스크랩 cache.modify

마이페이지
-> 나의 상품 글 삭제 cache.modify

트립토크 메인
-> 게시판 글 삭제 cache.modify
```

이미 좋아요, 여행상품 댓글 등록/삭제, 스크랩은 어느 정도 구현해둔 상태였고, 오늘은 마이페이지 나의 상품 삭제와 트립토크 메인 게시판 삭제를 중심으로 확인했다.

## 트립토크 메인 글 삭제

`src/components/boards-list/list/hook.ts`의 게시글 삭제 로직을 `cache.modify` 방식으로 바꿨다.

핵심 흐름은 아래와 같다.

```ts
update: (cache, { data }) => {
  const deleteId = data?.deleteBoard;
  if (!deleteId) return;

  cache.modify({
    fields: {
      fetchBoards(existingData = [], { readField }) {
        return existingData.filter((item) => {
          return readField("_id", item) !== deleteId;
        });
      },
      fetchBoardsCount(existingData = 0) {
        return existingData - 1;
      },
    },
  });
}
```

`deleteBoard` mutation은 삭제된 게시글 id를 반환한다.

그 id를 이용해 `fetchBoards` 목록에서 같은 `_id`를 가진 항목을 제거한다.

Apollo 캐시의 배열 항목은 실제 객체가 아니라 참조값일 수 있으므로 아래처럼 직접 접근하지 않는다.

```ts
item._id
```

대신 Apollo가 제공하는 `readField`를 사용한다.

```ts
readField("_id", item)
```

목록에서 삭제된 항목을 제거하면 화면의 게시글 행은 사라진다.

하지만 게시판 화면은 전체 개수로 번호와 마지막 페이지를 계산하므로, `fetchBoardsCount`도 같이 `-1` 처리해야 자연스럽다.

오늘 다시 확인한 삭제 패턴은 아래와 같다.

```txt
삭제 mutation 실행
-> 삭제된 id 반환
-> 목록 query field에서 해당 id 제거
-> count query field도 1 감소
```

## 마이페이지 나의 상품 삭제

마이페이지의 `거래내역 & 북마크 > 나의 상품 > 글 삭제` 문구는 처음에는 의미가 모호했다.

처음에는 거래내역 삭제인지, 북마크 삭제인지, 상품 글 삭제인지 구분이 어려웠다.

원격 GraphQL 스키마를 확인해보니 아래 mutation이 존재했다.

```graphql
deleteTravelproduct(travelproductId: ID!): ID!
```

따라서 과제의 `나의 상품 글 삭제`는 내가 등록한 여행상품 글을 삭제하는 의미로 보는 것이 가장 자연스럽다.

마이페이지 나의 상품 목록은 아래 쿼리로 조회한다.

```graphql
fetchTravelproductsISold(search: $search, page: $page)
```

삭제 흐름은 아래처럼 잡았다.

```txt
나의 상품 목록 조회
-> 삭제 버튼 클릭
-> deleteTravelproduct 실행
-> 삭제된 travelproductId 반환
-> fetchTravelproductsISold 목록에서 해당 id 제거
-> fetchTravelproductsCountISold 1 감소
```

이 패턴은 게시글 삭제와 거의 같다.

```txt
deleteBoard
-> fetchBoards에서 제거
-> fetchBoardsCount -1

deleteTravelproduct
-> fetchTravelproductsISold에서 제거
-> fetchTravelproductsCountISold -1
```

## refetch와 cache.modify 판단

오늘도 다시 느낀 점은, 모든 삭제를 `cache.modify`로 바꾸는 것이 항상 더 좋은 것은 아니라는 점이다.

특히 마이페이지 나의 상품 삭제는 아래 요소가 함께 얽힌다.

- 현재 페이지
- 전체 개수
- 검색어
- 삭제 후 현재 페이지가 비는 경우
- 판매 완료 상품 삭제 가능 여부
- 서버 권한 정책

이런 경우 실무에서는 `refetchQueries`가 더 안전하고 이해하기 쉬울 수 있다.

하지만 이번 과제는 `refetchQueries`를 `cache.modify`로 바꾸는 연습이 목적이므로, 목록과 count를 직접 수정하는 방식으로 접근했다.

오늘 기준으로 판단한 기준은 아래와 같다.

```txt
단순 목록에서 한 항목 제거
-> cache.modify 연습 가능

목록 정렬, 페이지, 검색 조건, 권한 정책이 복잡함
-> refetchQueries가 더 안전할 수 있음
```

## 마이페이지 공통 컴포넌트 정리

기존에는 포인트 페이지 내부에 있던 마이페이지 사용자 정보와 탭 메뉴 관련 컴포넌트를 공통 위치로 옮겼다.

현재 구조는 아래처럼 정리됐다.

```txt
src/components/mypage/myinfo
src/components/mypage/tab-menu
src/components/mypage/trading
src/components/mypage/types.ts
```

포인트 페이지 전용이었던 `myinfo`, `tab-menu`, `types`를 `mypage` 공통 영역으로 올려서 거래내역 페이지에서도 재사용할 수 있게 만든 흐름이다.

공통 컴포넌트로 빼면서 import 경로도 바뀌었다.

예를 들어 포인트 하위 컴포넌트에서는 기존의 `../types`가 아니라 공통 타입 경로를 보게 된다.

```ts
import { IMypagePointsComponents } from "@/components/mypage/types";
```

이런 정리는 처음에는 파일 이동이 많아 보이지만, 마이페이지 안에서 같은 사용자 정보와 탭 구조를 여러 페이지가 공유하게 되면 더 자연스럽다.

## URL 기반 활성 메뉴

마이페이지 좌측 메뉴 활성 상태는 `usePathname`을 사용해 현재 URL에서 판단했다.

처음에는 고정 인덱스로 경로를 가져오는 방식을 생각했다.

```ts
pathname.split("/")[3]
```

하지만 이 방식은 route 깊이가 바뀌면 깨질 수 있다.

마지막 경로 조각을 가져오는 방식은 아래처럼 쓸 수 있다.

```ts
pathname.split("/").at(-1)
```

더 안전하게는 빈 문자열을 제거한 뒤 마지막 값을 가져온다.

```ts
pathname.split("/").filter(Boolean).at(-1)
```

현재 코드에서는 `pathname.includes(menu.activeNav)` 방식도 사용했다.

이 방식은 간단하지만, 메뉴 이름이 다른 경로 문자열과 우연히 겹칠 가능성도 있으므로 나중에는 실제 path 기준으로 더 명확히 비교하는 것이 좋다.

## 북마크 남은 작업

북마크 삭제는 아직 남은 작업이다.

API 의미를 기준으로 보면 북마크 삭제는 별도 delete API가 아니라 `toggleTravelproductPick`을 사용해 스크랩을 해제하는 흐름으로 보는 것이 자연스럽다.

필요한 쿼리는 아래와 같다.

```graphql
fetchTravelproductsIPicked(search: String, page: Int)
fetchTravelproductsCountIPicked
```

삭제 역할은 아래 mutation을 사용할 수 있다.

```graphql
toggleTravelproductPick(travelproductId: ID!): Int!
```

북마크 삭제의 예상 흐름은 아래와 같다.

```txt
북마크 목록 조회
-> 삭제 버튼 클릭
-> toggleTravelproductPick 실행
-> fetchTravelproductsIPicked 목록에서 해당 id 제거
-> fetchTravelproductsCountIPicked 1 감소
```

다만 이 작업은 UI 탭 구조와 목록 렌더링 구조를 더 정리한 뒤 붙이는 것이 좋다.

오늘은 북마크까지 억지로 밀어붙이기보다, 나의 상품 삭제와 게시판 삭제 패턴을 먼저 확실히 이해하는 것으로 범위를 나눴다.

## 오늘 배운 핵심

오늘 오전에 다시 정리한 핵심은 아래와 같다.

- `cache.modify`는 화면이 보고 있는 query field를 직접 수정해야 한다.
- mutation 이름을 수정하는 것이 아니라, 캐시에 저장된 query field 이름을 수정해야 한다.
- 삭제 mutation이 반환한 id와 캐시 목록 항목의 `_id`를 비교한다.
- 캐시 항목은 참조값일 수 있으므로 `readField("_id", item)`를 사용한다.
- 목록만 제거하면 부족할 수 있고, 화면 번호나 pagination에 쓰이는 count도 같이 수정해야 한다.
- API 설명이 부족하면 GraphQL 스키마와 실제 반환값을 확인해야 한다.
- 과제에서는 `cache.modify`를 요구하지만, 실무에서는 `refetchQueries`가 더 안전한 경우도 많다.

## 남은 작업

- 북마크 탭 UI와 목록 렌더링 구조 정리
- 북마크 삭제를 `toggleTravelproductPick` + `cache.modify`로 연결
- `fetchTravelproductsCountIPicked` 캐시 감소 처리
- 마이페이지 path 이동 경로 정리
- `console.log(error)`를 사용자 피드백으로 바꾸기
- 삭제 성공/실패 Modal 처리
- cache.modify 적용 후 refetchQueries가 남아 있는 부분 정리 여부 판단
- 현재 페이지에서 마지막 항목 삭제 시 pagination 처리 방식 고민

## 오전 결론

오늘 오전 작업은 쉽지는 않았지만, 이전에 학습한 Apollo 캐시 삭제 패턴을 다른 화면에 적용해본 시간이었다.

처음에는 `cache.modify`가 낯설었지만, 반복해서 보면 결국 패턴은 비슷하다.

```txt
삭제된 id를 받는다
-> 목록에서 같은 id를 제거한다
-> 필요하면 count도 같이 수정한다
```

다만 이 패턴이 항상 실무적으로 최선인 것은 아니다.

페이지네이션, 검색, 권한, 서버 정책이 얽힌 화면에서는 refetch가 더 명확할 수 있다.

오늘은 과제 의도에 맞춰 `cache.modify`를 연습했고, 북마크는 다음 작업에서 같은 패턴을 한 번 더 적용해보면 된다.
