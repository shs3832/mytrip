import type { Metadata } from "next";
import ProductDetailServerShell from "@/components/product-detail-server-shell";
import { ProductDetailDynamicMetaData } from "@/components/product-detail/metadata";
import { ProductDetailGetData } from "@/components/product-detail/getData";

// dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}): Promise<Metadata> {
  return ProductDetailDynamicMetaData(params.productId);
}

// SSR data init
export default async function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const productData = await ProductDetailGetData(params.productId);
  return <ProductDetailServerShell productData={productData} />;
}
