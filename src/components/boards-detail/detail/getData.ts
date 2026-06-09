import { createServerApolloClient } from "@/commons/settings/apollo-server";
import { FETCH_BOARD } from "@/components/boards-detail/queries";

export async function BoardsDetailGetData(id: string) {
  const client = createServerApolloClient();
  const { data } = await client.query({
    query: FETCH_BOARD,
    variables: {
      boardId: id,
    },
    fetchPolicy: "no-cache",
  });
  return data;
}
