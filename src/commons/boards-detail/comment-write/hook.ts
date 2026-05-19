import {
  CreateBoardCommentDocument,
  FetchBoardCommentsDocument,
} from "./queries";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function useBoardCommentWrite() {
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

  return {
    writer,
    password,
    contents,
    setWriter,
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
  };
}
