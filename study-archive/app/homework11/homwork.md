1. 공통
   - [ ] 완성된 `homework10`폴더를 활용하여 `homework11`을 완성해 주세요.
2. 게시글등록/수정
   - [ ] 게시글등록/수정페이지에서 렌더링 되는 게시글작성 컴포넌트를 리팩토링 합니다.
     - [ ] src/components/boards-write/hook.ts 파일을 만들고 코드를 적절히 이동합니다.
     - [ ] src/components/boards-write/index.tsx 파일을 만들고 코드를 적절히 이동합니다.
     - [ ] src/components/boards-write/queries.ts 파일을 만들고 코드를 적절히 이동합니다.
     - [ ] src/components/boards-write/styles.module.css 파일을 만들고 코드를 적절히 이동합니다.
     - [ ] src/components/boards-write/types.ts 파일을 만들고 코드를 적절히 이동합니다.
3. 게시글상세
   - [ ] 게시글상세페이지에서 게시글상세 컴포넌트를 불러오도록 리팩토링 합니다.
     - [ ] src/component/boards-detail 경로에 게시글상세 컴포넌트를 만듭니다. 기존 app/boards/[boardId]/page.tsx 에서는 새롭게 만든 컴포넌트가 렌더링 될 수 있도록 변경합니다.
     - [ ] src/components/boards-detail/hook.ts 파일을 만들고 코드를 적절히 이동합니다
     - [ ] src/components/boards-detail/index.tsx 파일을 만들고 코드를 적절히 이동합니다.
     - [ ] src/components/boards-detail/queries.ts 파일을 만들고 코드를 적절히 이동합니다.
     - [ ] src/components/boards-detail/styles.module.css 파일을 만들고 코드를 적절히 이동합니다.
     - [ ] src/components/boards-detail/types.ts 파일을 만들고 코드를 적절히 이동합니다.
4. 게시글목록
   - [ ] 게시글목록페이지에서 게시글목록 컴포넌트를 불러오도록 리팩토링 합니다.
     - [ ] src/components/boards-list/hook.ts 파일을 만들고 코드를 적절히 이동합니다.
     - [ ] src/components/boards-list/index.tsx 파일을 만들고 코드를 적절히 이동합니다.
     - [ ] src/components/boards-list/queries.ts 파일을 만들고 코드를 적절히 이동합니다.
     - [ ] src/components/boards-list/styles.module.css 파일을 만들고 코드를 적절히 이동합니다.
     - [ ] src/components/boards-list/types.ts 파일을 만들고 코드를 적절히 이동합니다.
5. 타입스크립트
   - [ ] API와 관련된 데이터의 타입을 모두 보완합니다.
   - [ ] `yarn add --dev @graphql-codegen/cli` 명령을 사용하여 graphql-codegen을 설치해 주세요.
   - [ ] codegen.ts 파일을 복사해 주세요.
     - [ ] 아래 항목은 변경해주세요.
           schema: "http://main-practice.codebootcamp.co.kr/graphql",
   - [ ] package.json 의 script에 실행 명령을 추가해 주세요. => "codegen": "graphql-codegen --config codegen.ts"
   - [ ] 해당 명령으로 실행된 타입이 적용된 Document로 모든 useQuery, useMutation을 변경하고, 기존에 작성했던 any 타입이 있다면 모두 지워주세요.
     - ex1: 게시글등록 => useMutation(CreateBoardDocument)
     - ex2: 게시글수정 => useMutation(UpdateBoardDocument)
     - ex3: 게시글삭제 => useMutation(DeleteBoardDocument)
     - ex3: 게시글상세 => useQuery(FetchBoardDocument)
     - ex4: 게시글목록 => useQuery(FetchBoardsDocument)
