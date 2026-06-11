import { HttpResponse, graphql } from "msw";

// 테스트용 GraphQL endpoint다.
// page.test.tsx에서 만드는 ApolloClient의 HttpLink uri와 반드시 같아야 요청을 가로챌 수 있다.
const gql = graphql.link("http://mock.com/graphql");

export const apis = [
  // 기본 성공 시나리오: createTravelproduct mutation이 오면 등록 성공 응답을 돌려준다.
  gql.mutation("createTravelproduct", ({ variables }) => {
    // 실제 프론트 코드가 mutation variables로 보낸 입력값이다.
    const inputs = variables.createTravelproductInput;

    // 이 mock은 응답 스펙 검증보다 "성공 응답을 받았을 때 프론트가 반응하는가"를 보는 용도다.
    return HttpResponse.json({
      data: {
        createTravelproduct: {
          _id: "qqq",
          name: inputs.name,
          remarks: inputs.remarks,
          contents: inputs.contents,
          price: inputs.price,
          images: inputs.images ?? [],
          tags: inputs.tags ?? [],
          travelproductAddress: inputs.travelproductAddress ?? null,
          __typename: "Travelproduct",
        },
      },
    });
  }),
];
