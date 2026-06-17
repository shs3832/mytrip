"use client";

import ProductListFilters from "./filters";
import ProductListItems from "./productItem";
import ProductListSearch from "./search";
import { FetchTravelproductsQuery } from "@/commons/graphql/graphql";
import ProductListPagination from "./pagination";
import ProductListRecentBanner from "./recent";
import useProductListClientShell from "./hook";

export default function ProductListClientShell({
  productItems,
}: {
  productItems: FetchTravelproductsQuery;
}) {
  const { searchProps, filterProps, itemProps, paginationProps } =
    useProductListClientShell({ productItems });

  return (
    <>
      <ProductListSearch {...searchProps} />
      <main className="mt-14">
        <ProductListFilters {...filterProps} />

        <ProductListItems {...itemProps} />
      </main>
      <ProductListPagination {...paginationProps} />
      <ProductListRecentBanner />
    </>
  );
}
