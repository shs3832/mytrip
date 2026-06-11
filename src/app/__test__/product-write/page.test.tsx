// import JestUnitTestPage from "@/app/__test__/product-write/page.tsx";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import fetch from "cross-fetch";
import { CREATE_TRAVEL_PRODUCT } from "@/components/product-write/queries";

import {
  ApolloClient,
  InMemoryCache,
  useMutation,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { useState } from "react";
import { server } from "@/commons/mocks";
import { graphql, HttpResponse } from "msw";

// 테스트에서 ApolloClient가 요청을 보내는 주소와 mocks/apis.ts의 graphql.link 주소를 맞춘다.
const gql = graphql.link("http://mock.com/graphql");

// 실제 상품 등록 페이지 전체를 테스트하면 ReactQuill, 주소검색, 파일업로드까지 얽혀 무거워진다.
// 그래서 API mocking 개념을 확인하기 위한 작은 테스트용 컴포넌트를 둔다.
function ProductCreateMockButton() {
  // mutation 성공 여부를 화면에서 검증하기 위한 테스트용 상태다.
  const [message, setMessage] = useState("");

  // 실제 상품 등록에서 사용하는 GraphQL mutation 문서를 그대로 사용한다.
  const [createTravelproduct] = useMutation(CREATE_TRAVEL_PRODUCT);

  const onClickCreate = async () => {
    try {
      // 성공 테스트에서는 mocks/apis.ts의 기본 성공 handler가 응답한다.
      // 실패 테스트에서는 server.use(...)로 이 mutation 응답을 실패로 덮어쓴다.
      await createTravelproduct({
        variables: {
          createTravelproductInput: {
            name: "제주도 숙박권",
            remarks: "바다가 보이는 숙소",
            contents: "좋은 숙소입니다",
            price: 10000,
            tags: [],
            images: [],
            travelproductAddress: {
              zipcode: "12345",
              address: "",
              addressDetail: "",
              lat: 0,
              lng: 0,
            },
          },
        },
      });

      setMessage("등록 성공");
    } catch {
      setMessage("등록 실패");
    }
  };

  return (
    <>
      <button onClick={onClickCreate}>상품 등록</button>
      {message && <p>{message}</p>}
    </>
  );
}

it("여행상품 등록 API mocking test", async () => {
  // 테스트 전용 ApolloClient다.
  // HttpLink uri는 src/commons/mocks/apis.ts의 graphql.link 주소와 같아야 한다.
  const client = new ApolloClient({
    link: new HttpLink({
      uri: "http://mock.com/graphql",
      // Jest 환경에서 fetch를 명시적으로 주입한다.
      fetch,
    }),
    cache: new InMemoryCache(),
  });

  // ApolloProvider로 감싸야 useMutation이 ApolloClient를 사용할 수 있다.
  render(
    <ApolloProvider client={client}>
      <ProductCreateMockButton />
    </ApolloProvider>,
  );

  // 사용자가 상품 등록 버튼을 클릭한 상황을 만든다.
  fireEvent.click(screen.getByText("상품 등록"));

  // MSW가 가짜 응답을 돌려주면 컴포넌트에 성공 문구가 나타난다.
  expect(await screen.findByText("등록 성공")).toBeInTheDocument();
});

it("여행상품 등록 API mocking 실패 테스트", async () => {
  // 이 테스트에서만 createTravelproduct 응답을 실패 케이스로 교체한다.
  // 테스트가 끝나면 jest.setup.ts의 resetHandlers가 기본 성공 handler로 되돌린다.
  server.use(
    gql.mutation("createTravelproduct", () => {
      return HttpResponse.json({
        errors: [
          {
            message: "상품 등록에 실패했습니다.",
          },
        ],
      });
    }),
  );

  const client = new ApolloClient({
    link: new HttpLink({
      uri: "http://mock.com/graphql",
      // Jest 환경에서 fetch를 명시적으로 주입한다.
      fetch,
    }),
    cache: new InMemoryCache(),
  });

  // ApolloProvider로 감싸야 useMutation이 ApolloClient를 사용할 수 있다.
  render(
    <ApolloProvider client={client}>
      <ProductCreateMockButton />
    </ApolloProvider>,
  );

  // 사용자가 상품 등록 버튼을 클릭한 상황을 만든다.
  fireEvent.click(screen.getByText("상품 등록"));

  // MSW가 errors 응답을 돌려주면 useMutation이 실패로 처리되고 catch 문이 실행된다.
  expect(await screen.findByText("등록 실패")).toBeInTheDocument();
});
