"use client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

const cache = new InMemoryCache();

const authLink = new ApolloLink((operation, forward) => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";
  operation.setContext({
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });
  return forward(operation);
});

const uploadLink = createUploadLink({
  uri: "https://main-practice.codebootcamp.co.kr/graphql",
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, uploadLink]),
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
