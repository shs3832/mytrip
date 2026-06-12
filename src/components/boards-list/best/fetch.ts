import { FetchBoardsOfTheBestDocument } from "@/commons/graphql/graphql";

import { createServerApolloClient } from "@/commons/settings/apollo-server";

export async function fetchBoardsOfTheBest() {
  const client = createServerApolloClient();
  const { data } = await client.query({
    query: FetchBoardsOfTheBestDocument,
    fetchPolicy: "no-cache",
  });

  return data;
}
