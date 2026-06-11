import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import {
  DeleteBoardDocument,
  FetchBoardsDocument,
} from "@/commons/graphql/graphql";
import { Modal } from "antd";

export default function useBoardList() {
  const router = useRouter();

  const { data } = useQuery(FetchBoardsDocument, {
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

  return {
    data,
    handleViewDetail,
    handleDelete,
  };
}
