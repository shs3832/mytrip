import {
  CreateBoardCommentDocument,
  FetchBoardCommentsDocument,
  UpdateBoardCommentDocument,
} from "./queries";
import { ApolloError, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useParams } from "next/navigation";
import { useState } from "react";
import { IBoardCommentWriteProps } from "./types";

export default function useBoardCommentWrite({
  setIsCommentEdit,
  el,
}: IBoardCommentWriteProps = {}) {
  const params = useParams();
  const [comment_write] = useMutation(CreateBoardCommentDocument);

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [rating, setRating] = useState(3);

  const [isWriterEmpty, setIsWriterEmpty] = useState<boolean>(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState<boolean>(false);
  const [isContentsEmpty, setIsContentsEmpty] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRate = (value: number) => {
    setRating(value);
  };

  const handleWriteComment = async () => {
    setIsSubmitted(true);
    if (!isWriterEmpty || !isPasswordEmpty || !isContentsEmpty) return;
    try {
      await comment_write({
        variables: {
          createBoardCommentInput: {
            writer: writer,
            password: password,
            contents: contents,
            rating: rating,
          },
          boardId: String(params.boardId),
        },

        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: {
              page: 1,
              boardId: String(params.boardId),
            },
          },
        ],
      });
      setContents("");
      setPassword("");
      setWriter("");
      setIsSubmitted(false);
    } catch {}
  };

  const [comment_update] = useMutation(UpdateBoardCommentDocument);
  const handleCommentEdit = async () => {
    if (el === undefined) return;

    try {
      await comment_update({
        variables: {
          updateBoardCommentInput: {
            contents: contents,
            rating: rating,
          },
          password: password,
          boardCommentId: el._id,
        },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: {
              page: 1,
              boardId: String(params.boardId),
            },
          },
        ],
      });
      Modal.success({
        content: "댓글이 수정되었습니다.",
      });
      setIsCommentEdit?.(false);
    } catch (error) {
      if (error instanceof ApolloError) {
        const message = error.graphQLErrors[0]?.message;
        Modal.error({
          content: message ?? "에러가 발생했습니다.",
        });
      }
    }
  };

  const handleEditCommentCancel = () => {
    setIsCommentEdit?.(false);
  };

  return {
    writer,
    password,
    contents,
    setWriter,
    rating,
    setRating,
    setPassword,
    setContents,
    isContentsEmpty,
    isWriterEmpty,
    isPasswordEmpty,
    isSubmitted,
    setIsContentsEmpty,
    setIsPasswordEmpty,
    setIsWriterEmpty,
    handleWriteComment,
    handleRate,
    handleCommentEdit,
    handleEditCommentCancel,
  };
}
