import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

import { FetchBoardDocument } from "../graphql/graphql";

export default function useBoardDetail() {
  const params = useParams();
  const router = useRouter();
  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: String(params.boardId),
    },
  });

  const handleBackToList = () => {
    router.push("../boards/new");
  };

  const handleEditPage = () => {
    router.push(`../boards/${params.boardId}/edit`);
  };
  return {
    data,
    handleBackToList,
    handleEditPage,
  };
}
