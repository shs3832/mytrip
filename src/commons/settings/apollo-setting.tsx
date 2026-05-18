"use client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: "https://main-practice.codebootcamp.co.kr/graphql",
  cache,
});

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

loadDevMessages();
loadErrorMessages();

export default function ApolloSetting({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
