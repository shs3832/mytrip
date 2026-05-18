import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { DeleteBoardDocument, FetchBoardsDocument } from "../graphql/graphql";

export default function useBoardList() {
  const router = useRouter();

  const { data } = useQuery(FetchBoardsDocument, {
    variables: {
      page: 1,
    },
  });
  console.log(data);
  const handleViewDetail = (id: String) => {
    router.push(`boards/${id}`);
  };

  const [delete_board] = useMutation(DeleteBoardDocument);

  const handleDelete = async (id: String) => {
    const result = await delete_board({
      variables: {
        boardId: String(id),
      },
      refetchQueries: [FetchBoardsDocument],
    });
    console.log(result);
    alert("삭제되었습니다");
  };

  return {
    data,
    handleViewDetail,
    handleDelete,
  };
}
