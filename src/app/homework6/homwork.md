1. createBoard를 활용해, 게시물을 하나 등록해 주세요.

mutation createBoard {
createBoard(
createBoardInput: {
writer: "asdf"
password: "1234"
title: "테스트1234"
contents: "테스트12345"
}
) {
\_id
writer
title
contents
}
}

---

result

{
"data": {
"createBoard": {
"\_id": "6a06cb6fd4299d0029cd46d1",
"writer": "asdf",
"title": "테스트1234",
"contents": "테스트12345"
}
}
}

2. 등록한 게시글의 제목과 내용은 무엇인가요?

제목 : 테스트1234 , 내용 : 테스트12345

3. 등록한 게시글에 좋아요를 1 올려주세요.

mutation likeBoard {
likeBoard(boardId:"6a06cb6fd4299d0029cd46d1")
}

---

result

{
"data": {
"likeBoard": 1
}
}

4. 등록한 게시글에 싫어요도 1 올려주세요.

mutation dislikeBoard {
dislikeBoard(boardId:"6a06cb6fd4299d0029cd46d1")
}

---

result

{
"data": {
"dislikeBoard": 1
}
}

5. 등록한 게시글의 좋아요와 싫어요는 각각 몇 개 인가요? (fetchBoard를 활용해서 확인해 보세요.)

query {
fetchBoard(boardId: "6a06cb6fd4299d0029cd46d1"){
likeCount
dislikeCount
}
}

---

result

{
"data": {
"fetchBoard": {
"likeCount": 2,
"dislikeCount": 1
}
}
}

6. 현재 등록된 게시글의 총 갯수는 몇 개 인가요? (어떤 API를 활용하면 좋을지 찾아보세요!)

fetchBoards(
endDate: DateTime
startDate: DateTime
search: String
page: Int
): [Board!]!

위 api의 page 값

-- 오답노트 --

query fetchBoardsCount {
fetchBoardsCount
}

7. 등록한 게시글의 제목을 수정해 보세요!

mutation updateBoard {
updateBoard(
updateBoardInput:{
title:"테스트1234"
}
password:"1234"
boardId: "6a06cb6fd4299d0029cd46d1"
){
\_id, title
}
}

---

result
{
"data": {
"updateBoard": {
"\_id": "6a06cb6fd4299d0029cd46d1",
"title": "테스트1234"
}
}
}

8. fetchBoards 전체 게시물 조회를 활용하여 방금 쓴 게시물을 검색해 보세요.(search 변수를 활용해요!)

query fetchBoards {
fetchBoards(search:"테스트1234"){\_id, writer, title, contents, likeCount, dislikeCount}
}

---

result

{
"data": {
"fetchBoards": [
{
"_id": "6a06cb6fd4299d0029cd46d1",
"writer": "asdf",
"title": "테스트1234",
"contents": "테스트12345",
"likeCount": 2,
"dislikeCount": 1
}
]
}
}

9. 등록한 게시글에 댓글을 3개 추가해 보세요.

mutation createBoardComment {
createBoardComment(
createBoardCommentInput:{
writer:"1234"
password:"1234"
contents:"5678"
rating:4.5
}
boardId: "6a06cb6fd4299d0029cd46d1"
){\_id, writer, contents}
}

mutation createBoardComment {
createBoardComment(
createBoardCommentInput:{
writer:"1234-2"
password:"1234"
contents:"5678-2"
rating:4.0
}
boardId: "6a06cb6fd4299d0029cd46d1"
){\_id, writer, contents}
}

mutation createBoardComment {
createBoardComment(
createBoardCommentInput:{
writer:"1234-3"
password:"1234"
contents:"5678-3"
rating:5.0
}
boardId: "6a06cb6fd4299d0029cd46d1"
){\_id, writer, contents}
}

---

result

{
"data": {
"createBoardComment": {
"\_id": "6a06cfd1d4299d0029cd46d2",
"writer": "1234",
"contents": "5678"
}
}
}

{
"data": {
"createBoardComment": {
"\_id": "6a06cfedd4299d0029cd46d3",
"writer": "1234-2",
"contents": "5678-2"
}
}
}

{
"data": {
"createBoardComment": {
"\_id": "6a06cffdd4299d0029cd46d4",
"writer": "1234-3",
"contents": "5678-3"
}
}
}

10. 첫번째 댓글의 내용을 수정해 보세요!

mutation updateBoardComment {
updateBoardComment(updateBoardCommentInput:{
contents:"5678-1"
}
password:"1234"
boardCommentId:"6a06cfd1d4299d0029cd46d2"
){\_id
contents
}
}

---

result

{
"data": {
"updateBoardComment": {
"\_id": "6a06cfd1d4299d0029cd46d2",
"contents": "5678-1"
}
}
}

11. 두번째 댓글을 삭제해 보세요!

mutation deleteBoardComment {
deleteBoardComment(password:"1234",boardCommentId:"6a06cfedd4299d0029cd46d3")
}

---

result

{
"data": {
"deleteBoardComment": "6a06cfedd4299d0029cd46d3"
}
}

12. 등록한 게시글에 달려있는 모든 댓글을 조회해 보세요.(작성자와 내용만 조회합니다.)

query fetchBoardComments {
fetchBoardComments(
boardId:"6a06cb6fd4299d0029cd46d1"
){
\_id
contents
rating
}
}

---

result

{
"data": {
"fetchBoardComments": [
{
"_id": "6a06cffdd4299d0029cd46d4",
"contents": "5678-3",
"rating": 5
},
{
"_id": "6a06cfd1d4299d0029cd46d2",
"contents": "5678-1",
"rating": 4.5
}
]
}
}

13. BEST게시글을 조회해 보세요! (API 이름을 잘 찾아보세요!)

query fetchBoardsOfTheBest {
fetchBoardsOfTheBest
{\_id title contents}
}

---

result

{
"data": {
"fetchBoardsOfTheBest": [
{
"_id": "699539d5d4299d0029cd3f47",
"title": "여수 밤바다 여행 후기",
"contents": "여수 밤바다 정말 예쁘네요. 케이블카 야경 추천드립니다. 숙소는 돌산 쪽이 좋았어요."
},
{
"_id": "699539a9d4299d0029cd3f43",
"title": "경주 1박2일 일정 공유",
"contents": "황리단길, 첨성대, 동궁과월지 코스로 다녀왔습니다. 숙소는 한옥 스테이 추천해요."
},
{
"_id": "69953967d4299d0029cd3f3f",
"title": "제주 렌트카 이용 팁",
"contents": "제주도 렌트카 예약 시 보험 꼭 확인하세요. 완전자차 추천드립니다."
},
{
"_id": "699539fad4299d0029cd3f49",
"title": "강릉 카페 코스 공유 ☕",
"contents": "최근 다녀온 강릉 카페 투어 일정 공유합니다. 바다뷰 카페 위주로 다녀왔어요. 궁금하신 분 댓글 주세요."
}
]
}
}

14. 회원가입을 해보세요! 사용자, 즉 User를 만드는 API입니다!

mutation createUser {
createUser(createUserInput:{
email:"testvv@testvv.com"
password: "1234"
name: "테스트계정"
}){
\_id
email
name
}
}

---

result

{
"data": {
"createUser": {
"\_id": "6a06d57dd4299d0029cd46d5",
"email": "testvv@testvv.com",
"name": "테스트계정"
}
}
}
