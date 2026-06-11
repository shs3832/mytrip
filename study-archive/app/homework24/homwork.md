- [ ] 완성된 `homework23`폴더를 활용하여 `homework24`을 완성해 주세요.
- [ ] 로그인/회원가입 페이지를 구현해주세요.
  1. 로그인
     1. 이메일 인풋
     2. 비밀번호 인풋
     3. 로그인 버튼
     4. 회원가입 페이지 이동 버튼
     5. GRAPHQL-API: loginUser
  2. 회원가입
     1. 이메일 인풋
     2. 이름 인풋
     3. 비밀번호 인풋
     4. 비밀번호 확인 인풋
     5. 회원가입 버튼
     6. GRAPHQL-API: createUser
  3. 회원가입 성공 모달
- [ ] 로그인 된 상태일 때 헤더에 로그인 정보를 추가해주세요.
  1. 로그인 상태

     ![스크린샷 2024-10-14 오후 4.55.53.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/9c9b02bc-6cb6-4924-bf38-dad25e0fe77b/d991749b-57f2-4813-bac4-c0e52b2419cd/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-14_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.55.53.png)

  2. 로그아웃 상태

     ![스크린샷 2024-10-14 오후 4.56.16.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/9c9b02bc-6cb6-4924-bf38-dad25e0fe77b/08375114-0050-4113-aac8-8c865140a599/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-14_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.56.16.png)

     해당 로그인 버튼을 누르면 로그인 페이지로 이동합니다.

--
회원가입 결과, graphicQl 로그인 테스트 및 엑세스토큰 발급

email
:
"test16@test.com" // 12345
name
:
"123123"
\_\_typename
:
"User"
\_id
:
"6a155ba8d4299d0029cd4755"

mutation loginUser {
loginUser(
password:"12345",
email: "test16@test.com"
){accessToken}
}

{
"data": {
"loginUser": {
"accessToken": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTE1NWJhOGQ0Mjk5ZDAwMjljZDQ3NTUiLCJwZXJtaXNzaW9uIjowLCJpYXQiOjE3Nzk3ODQ5MzksImV4cCI6MTc3OTc4ODUzOSwic3ViIjoiYWNjZXNzVG9rZW4ifQ.jcdjZ3u88LGbDsyZEQBi0QKC-uP3BoaHTQRGsQt5phLxZDgoDfTDClRdIZjYScLzugfGo1_NcrfbqzWVgOu0yQ"
}
}
}
