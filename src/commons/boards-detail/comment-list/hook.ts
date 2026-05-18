import { FetchBoardCommentsDocument } from "./queries";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
export default function useBoardCommentList() {
  const params = useParams();
  const { data } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      page: 1,
      boardId: String(params.boardId),
    },
  });
  return { data };
}
