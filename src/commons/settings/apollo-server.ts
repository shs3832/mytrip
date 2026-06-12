import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// const cache = new InMemoryCache();
export function createServerApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://main-practice.codebootcamp.co.kr/graphql",
      fetchOptions: {
        next: { revalidate: 60 },
      },
    }),
    cache: new InMemoryCache(),
    ssrMode: true,
  });
}
