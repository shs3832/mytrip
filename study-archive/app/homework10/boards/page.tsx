"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

const FETCH_BOARDS = gql`
  query fetchBoardsHomework10($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      createdAt
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoardHomework10($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

type BoardSummary = {
  _id: string;
  writer: string | null;
  title: string;
  createdAt: string;
};

export default function BoardListPage() {
  const router = useRouter();

  const { data } = useQuery(FETCH_BOARDS, {
    variables: {
      page: 1,
    },
  });
  const handleViewDetail = (id: string) => {
    router.push(`boards/${id}`);
  };

  const [delete_board] = useMutation(DELETE_BOARD);

  const handleDelete = async (id: string) => {
    await delete_board({
      variables: {
        boardId: id,
      },
      refetchQueries: [FETCH_BOARDS],
    });
    alert("삭제되었습니다");
  };

  return (
    <>
      <div className="shadow-md rounded-3xl py-6 px-12 ">
        <div className="w-full text-center ">
          <div>
            <div className="table-title flex items-center w-full font-medium text-base text-gray-900">
              <span className="px-6 py-3 w-[100px] shrink-0">번호</span>
              <span className="px-6 py-3 grow text-left">제목</span>
              <span className="px-6 py-3 w-1/6">작성자</span>
              <span className="px-6 py-3 w-1/6">날짜</span>
              <span className="px-6 py-3 w-20">&nbsp;</span>
            </div>
          </div>
          <div>
            {data?.fetchBoards?.map((el: BoardSummary, index: number) => {
              return (
                <div
                  key={`el` + index}
                  className="group flex items-center w-full my-2 rounded-md border border-gray-100 hover:bg-gray-50 cursor-pointer"
                >
                  <span className="px-6 py-3 text-gray-500 font-light w-[100px] shrink-0">
                    {index + 1}
                  </span>
                  <span
                    className="px-6 py-3 grow text-left font-medium text-gray-900"
                    onClick={() => {
                      handleViewDetail(el._id);
                    }}
                  >
                    {el.title}
                  </span>
                  <span className="px-6 py-3 w-1/6">{el.writer}</span>
                  <span className="px-6 py-3 w-1/6 text-gray-500">
                    {new Date(el.createdAt).toISOString().slice(0, 10)}
                  </span>
                  <span className="px-6 py-3 w-20">
                    <span
                      onClick={() => {
                        handleDelete(el._id);
                      }}
                      className="invisible inline-block group-hover:visible"
                    >
                      삭제
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
