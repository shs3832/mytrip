import dynamic from "next/dynamic";

import React from "react";

import { createServerApolloClient } from "@/commons/settings/apollo-server";
const ProductListBestItems = dynamic(() => import("./best"), {
  ssr: false,
});
import ProductListCustomBanner from "./custom-banner";
import ProductListClientShell from "./client-shell";

import { FETCH_TRAVEL_PRODUCT_BEST, FETCH_TRAVEL_PRODUCTS } from "./queries";
import ProductListRecentBanner from "./recent";
import ProductListPagination from "./pagination";

async function ProductMainListComponent() {
  const client = createServerApolloClient();
  const { data: bestItem } = await client.query({
    query: FETCH_TRAVEL_PRODUCT_BEST,
  });

  const { data: productItems } = await client.query({
    query: FETCH_TRAVEL_PRODUCTS,
    variables: {
      isSoldout: false,
      search: "",
      page: 1,
    },
  });

  return (
    <>
      <h2 className="font-bold text-2xl">2026 여름의 시작</h2>
      <ProductListBestItems bestItem={bestItem} />
      <ProductListCustomBanner />
      <ProductListClientShell productItems={productItems} />
      <ProductListRecentBanner />
      <ProductListPagination />
    </>
  );
}

export default React.memo(ProductMainListComponent);
