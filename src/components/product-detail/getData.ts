import { createServerApolloClient } from "@/commons/settings/apollo-server";
import { FETCH_TRAVEL_PRODUCT } from "./queries";

export async function ProductDetailGetData(id: string) {
  const client = createServerApolloClient();

  const { data: productData } = await client.query({
    query: FETCH_TRAVEL_PRODUCT,
    variables: {
      travelproductId: id,
    },
  });
  return productData;
}
