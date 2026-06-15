import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";
import { ApolloError, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useParams } from "next/navigation";
import { useState } from "react";
import { DELETE_BOARD_COMMENT } from "./queries";

export default function useCommentListItem() {
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const [deleteComment] = useMutation(DELETE_BOARD_COMMENT);
  const handleCommentEdit = () => {
    setIsCommentEdit(true);
  };
  const params = useParams();
  const handleCommentDelete = async (id: string) => {
    const checkPassword = window.prompt(
      "댓글을 삭제하시겠습니까? 댓글입력시 입력했던 비밀번호를 입력해주세요",
    );
    if (checkPassword === null) return;
    try {
      await deleteComment({
        variables: {
          password: checkPassword,
          boardCommentId: id,
        },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: {
              boardId: String(params.boardId),
              page: 1,
            },
          },
        ],
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        const message = error.graphQLErrors[0]?.message;
        Modal.error({
          content: message ?? "에러가 발생했습니다.",
        });
      }
    }
  };

  return {
    isCommentEdit,
    setIsCommentEdit,
    handleCommentEdit,
    handleCommentDelete,
  };
}
