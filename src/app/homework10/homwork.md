1. 공통
   - [ ] 완성된 `homework09`폴더를 활용하여 `homework10`를 완성해 주세요.
2. 게시글수정
   - [ ] src/app/boards/[boardId]/edit/page.tsx 경로에 수정페이지를 만들고 수정 기능을 완성해 주세요.
     - [ ] 기존에 만들었던 등록페이지 src/app/boards/new/page.tsx 경로의 내용을 수정페이지와 재사용 가능하도록 src/components/boards-write/index.tsx 경로의 컴포넌트로 적절히 복사합니다.
     - [ ] 등록하기와 수정하기를 1개의 컴포넌트로 재사용 하기 위해 src/components/boards-write/index.tsx 경로에 컴포넌트를 생성합니다.
       - [ ] 등록하기 화면에 src/components/boards-write/index.tsx 컴포넌트를 렌더링 해주세요
       - [ ] 수정하기 화면도 src/components/boards-write/index.tsx 컴포넌트를 렌더링 해주세요.
       - [ ] 해당 컴포넌트가 등록하기, 수정하기 페이지에서 의도한대로 동작하는지 각각 테스트해주세요.
     - [ ] 상세페이지에서 수정하기 버튼을 눌렀을때, 해당 게시글을 수정하는 화면으로 이동하는 기능을 구현해주세요.
     - [ ] src/app/boards/[boardId]/edit/page.tsx 경로의 수정페이지에 접속하는 경우, 수정을 위한 초기값을 보여주기 위해 GRAPHQL-API(fetchBoard)를 사용하여 기존에 입력했던 값들을 불러와 주세요.
       - [ ] 제목, 내용만 수정할 수 있으며, 수정되지 않은 값은 제외하고, 수정된 값만 API 요청에 포함시켜 주세요.
       - [ ] 작성자와 비밀번호는 수정할 수 없습니다. 수정하기 페이지일 경우 input 태그 disabled 처리해주세요.
     - [ ] src/components/boards-write/index.tsx 경로의 게시글작성 컴포넌트에서 수정하기 버튼을 눌렀을 때 GRAPHQL-API(updateBoard)를 사용하여 데이터를 수정해 보세요.
       - [ ] 수정을 하기 위해서는 글을 입력할때 설정하였던 비밀번호를 입력받아야 합니다.
       - [ ] prompt 창으로 입력받아주세요. 비밀번호가 틀릴경우 수정이 되지 않습니다. try ~ catch 문으로 예외처리 해주세요.

       ```jsx
       // 아래 코드가 실행될 경우 비밀번호를 입력받는 prompt 창이 실행 됩니다.
       const 입력받은 비밀번호 = prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요")
       // 입력받은 비밀번호를 updateBoard 할때 variables에 넣어서 전송해주세요.
       ```

       - [ ] catch 문 안에서 `error.graphQLErrors` 를 확인하여 비밀번호가 틀린경우, 비밀번호가 틀렸다는 alert 창이 뜰 수 있도록 해주세요.
