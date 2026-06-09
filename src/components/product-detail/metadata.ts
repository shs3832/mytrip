import { gql } from "@apollo/client";
import { createServerApolloClient } from "@/commons/settings/apollo-server";

export async function ProductDetailDynamicMetaData(id: string) {
  const client = createServerApolloClient();
  const FETCH_TRAVEL_PRODUCT_METADATA = gql`
    query FetchTravelProduct($travelproductId: ID!) {
      fetchTravelproduct(travelproductId: $travelproductId) {
        _id
        name
        contents
        images
      }
    }
  `;

  const removeHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>/g, "");
  };

  const { data } = await client.query({
    query: FETCH_TRAVEL_PRODUCT_METADATA,
    variables: {
      travelproductId: id,
    },
  });
  const images =
    "https://storage.googleapis.com/" + data.fetchTravelproduct.images[0];

  return {
    title: data.fetchTravelproduct.name,
    description: removeHtmlTags(data.fetchTravelproduct.contents),
    openGraph: {
      title: data.fetchTravelproduct.name,
      description: removeHtmlTags(data.fetchTravelproduct.contents),
      images: images,
    },
  };
}
