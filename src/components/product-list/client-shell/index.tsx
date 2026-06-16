"use client";
import { useEffect, useState } from "react";
import ProductListFilters from "./filters";
import ProductListItems from "./productItem";
import ProductListSearch from "./search";
import { useLazyQuery } from "@apollo/client";
import { FETCH_TRAVEL_PRODUCTS } from "../queries";
import { FetchTravelproductsQuery } from "@/commons/graphql/graphql";

export default function ProductListClientShell({
  productItems,
}: {
  productItems: FetchTravelproductsQuery;
}) {
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [data, setData] = useState(productItems.fetchTravelproducts);
  const [fetchProducts] = useLazyQuery(FETCH_TRAVEL_PRODUCTS);
  const handleTabMenu = async (state: boolean) => {
    setIsSoldOut(state);
    const result = await fetchProducts({
      variables: {
        isSoldout: state,
        search: "",
        page: 1,
      },
    });
    setData(result.data?.fetchTravelproducts ?? []);
  };

  return (
    <>
      <ProductListSearch isSoldOut={isSoldOut} handleTabMenu={handleTabMenu} />
      <main className="mt-14">
        <ProductListFilters />
        <section className="grid grid-cols-4 gap-x-9 gap-y-10">
          <ProductListItems data={data} />
        </section>
      </main>
    </>
  );
}
