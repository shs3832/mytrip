"use client";
import { FetchTravelproductForDetailQuery } from "@/commons/graphql/graphql";
import { useAccessTokenStore } from "@/commons/stores/accessToken";
import { useLoadStore } from "@/commons/stores/load-store";
import { ProductDetailView } from "@/components/product-detail";
import { useProductDetailHook } from "@/components/product-detail/hook";

function ProductDetailAuthenticatedShell({
  productData,
  summary,
}: {
  productData: FetchTravelproductForDetailQuery;
  summary: React.ReactNode;
}) {
  const {
    safeContents,
    currentImage,
    currentIndex,
    isMine,
    questionData,
    handleDeleteQuestion,
    handlePinned,
    handlePurchase,
    setCurrentImage,
    setCurrentIndex,
    formatPriceToKRW,
    isBuyModalOpen,
    setIsBuyModalOpen,
    modalData,
    handleBuyConfirm,
    isPointModalOpen,
    setIsPointModalOpen,
    handleAddPoints,
    options,
    setPointOptions,
    picked,
    firstImageUrl,
    hasImage,
    hasLocation,
    pinned_loading,
  } = useProductDetailHook({ productData });
  return (
    <ProductDetailView
      safeContents={safeContents}
      currentImage={currentImage}
      currentIndex={currentIndex}
      isMine={isMine}
      data={productData}
      questionData={questionData}
      handleDeleteQuestion={handleDeleteQuestion}
      handlePinned={handlePinned}
      handlePurchase={handlePurchase}
      setCurrentImage={setCurrentImage}
      setCurrentIndex={setCurrentIndex}
      formatPriceToKRW={formatPriceToKRW}
      isBuyModalOpen={isBuyModalOpen}
      setIsBuyModalOpen={setIsBuyModalOpen}
      modalData={modalData}
      handleBuyConfirm={handleBuyConfirm}
      isPointModalOpen={isPointModalOpen}
      setIsPointModalOpen={setIsPointModalOpen}
      handleAddPoints={handleAddPoints}
      options={options}
      setPointOptions={setPointOptions}
      picked={picked}
      summary={summary}
      firstImageUrl={firstImageUrl}
      hasImage={hasImage}
      hasLocation={hasLocation}
      pinned_loading={pinned_loading}
    ></ProductDetailView>
  );
}

export default function ProductDetailClientShell({
  productData,
  summary,
}: {
  productData: FetchTravelproductForDetailQuery;
  summary: React.ReactNode;
}) {
  const { accessToken } = useAccessTokenStore();
  const { isLoaded } = useLoadStore();
  // accessToken 복구가 끝나기 전에는 로그인 여부를 확정할 수 없으므로 상세 UI를 숨긴다.
  if (!isLoaded) return null;

  // 비로그인 상태에서는 상세 hook 자체를 실행하지 않기 위해 여기서 렌더링을 중단한다.
  if (!accessToken) {
    return null;
  }
  return (
    <ProductDetailAuthenticatedShell
      productData={productData}
      summary={summary}
    />
  );
}
