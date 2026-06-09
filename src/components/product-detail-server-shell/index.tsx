import { FetchTravelproductForDetailQuery } from "@/commons/graphql/graphql";

import ProductDetailClientShell from "../product-detail-client-shell";
import { ProductDetailSummaryComponent } from "./summary";

export default function ProductDetailServerShell({
  productData,
}: {
  productData: FetchTravelproductForDetailQuery;
}) {
  return (
    <>
      <ProductDetailClientShell
        productData={productData}
        summary={<ProductDetailSummaryComponent data={productData} />}
      />
    </>
  );
}
