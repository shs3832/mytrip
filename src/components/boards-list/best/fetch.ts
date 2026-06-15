import { FetchBoardsOfTheBestDocument } from "@/commons/graphql/graphql";

import { createServerApolloClient } from "@/commons/settings/apollo-server";

export async function fetchBoardsOfTheBest() {
  const client = createServerApolloClient("revalidate");
  const { data } = await client.query({
    query: FetchBoardsOfTheBestDocument,
  });

  return data;
}
