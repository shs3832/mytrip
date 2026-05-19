import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import {
  DeleteBoardDocument,
  FetchBoardsCountDocument,
  FetchBoardsDocument,
} from "@/commons/graphql/graphql";
import { Modal } from "antd";
import { useState } from "react";

export default function useBoardList() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const paginationArray = new Array(10).fill(0);

  const { data, refetch } = useQuery(FetchBoardsDocument, {
    variables: {
      page: 1,
    },
  });
  const handleViewDetail = (id: String) => {
    router.push(`boards/${id}`);
  };

  const [delete_board] = useMutation(DeleteBoardDocument);

  const handleDelete = async (id: String) => {
    await delete_board({
      variables: {
        boardId: String(id),
      },
      refetchQueries: [FetchBoardsDocument],
    });
    Modal.success({
      content: "삭제되었습니다.",
    });
  };

  const { data: count } = useQuery(FetchBoardsCountDocument);
  const totalCount = count?.fetchBoardsCount ?? 10;
  const lastPage = Math.ceil(totalCount / 10);

  const handlePrevBtn = () => {
    if (page === 1) return;
    setPage(page - 10);
    setCurrentPage(page - 10);
    refetch({ page: page - 10 });
  };
  const handleNextBtn = () => {
    if (page + 10 <= lastPage) {
      setPage(page + 10);
      setCurrentPage(page + 10);
      refetch({ page: page + 10 });
    }
  };

  const handleGoPage = async (page: number) => {
    await refetch({ page });
  };

  return {
    data,
    refetch,
    handleViewDetail,
    handleDelete,
    handleGoPage,
    handleNextBtn,
    handlePrevBtn,
    lastPage,
    page,
    setPage,
    paginationArray,
    currentPage,
    setCurrentPage,
    totalCount,
  };
}
