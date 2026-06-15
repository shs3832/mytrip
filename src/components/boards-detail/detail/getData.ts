import { createServerApolloClient } from "@/commons/settings/apollo-server";
import { FETCH_BOARD } from "@/components/boards-detail/detail/queries";

export async function BoardsDetailGetData(id: string) {
  const client = createServerApolloClient("no-store");
  const { data } = await client.query({
    query: FETCH_BOARD,
    variables: {
      boardId: id,
    },
  });
  return data;
}
