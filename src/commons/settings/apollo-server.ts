import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// const cache = new InMemoryCache();

type IserverCacheMode = "no-store" | "revalidate";

export function createServerApolloClient(
  cacheOptions: IserverCacheMode = "no-store",
) {
  const fetchOptions =
    cacheOptions === "no-store"
      ? { cache: "no-store" }
      : { next: { revalidate: 60 } };
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://main-practice.codebootcamp.co.kr/graphql",
      fetchOptions,
    }),
    cache: new InMemoryCache(),
    ssrMode: true,
  });
}
