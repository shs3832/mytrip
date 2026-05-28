"use client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  fromPromise,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { useAccessTokenStore } from "@/commons/stores/accessToken";
import { onError } from "@apollo/client/link/error";

const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  // 1. 에러를 캐치
  if (typeof graphQLErrors !== "undefined") {
    for (const err of graphQLErrors) {
      // 1-2. 해당 에러가 토큰만료 에러인지 체크(UNAUTHENTICATED)
      if (
        err.extensions?.code === "INTERNAL_SERVER_ERROR" ||
        err.message === "회원정보 인증에 실패하였습니다."
      ) {
        return fromPromise(
          // 2. refreshToken으로 accessToken을 재발급 받기

          getAccessToken().then((newAccessToken) => {
            if (!newAccessToken) {
              useAccessTokenStore.setState({ accessToken: "" });

              if (typeof window !== "undefined") {
                window.location.href = "/homework26/login";
              }

              throw new Error("No access token");
            }
            useAccessTokenStore.setState({
              accessToken: newAccessToken ?? "",
            });

            operation.setContext({
              headers: {
                ...operation.getContext().headers, // Authorization: Bearer qklqkjdkjafsklj => 만료된 토큰이 추가되어 있는 상태
                Authorization: `Bearer ${newAccessToken ?? ""}`, // 3-2. 토큰만 새걸로 바꿔치기
              },
            });
          }),
        ).flatMap(() => forward(operation));
      }
    }
  }
});

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = useAccessTokenStore.getState().accessToken;
  operation.setContext({
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });
  return forward(operation);
});

const uploadLink = createUploadLink({
  uri: "https://main-practice.codebootcamp.co.kr/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, uploadLink]),
  cache,
});

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { getAccessToken } from "../libraries/getAccessToken";

loadDevMessages();
loadErrorMessages();

export default function ApolloSetting({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
