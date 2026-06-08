import type { Metadata } from "next";
import ProductDetailPageComponent from "@/components/product-detail-page";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

const cache = new InMemoryCache();
const serverApolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://main-practice.codebootcamp.co.kr/graphql",
  }),
  cache,
  ssrMode: true,
});

const METADATA_FETCH_TRAVEL_PRODUCT = gql`
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

export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}): Promise<Metadata> {
  const { data } = await serverApolloClient.query({
    query: METADATA_FETCH_TRAVEL_PRODUCT,
    variables: {
      travelproductId: params.productId,
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
export default function ProductDetailPage() {
  return <ProductDetailPageComponent />;
}
