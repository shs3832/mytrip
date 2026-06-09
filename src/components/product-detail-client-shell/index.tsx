"use client";
import { FetchTravelproductForDetailQuery } from "@/commons/graphql/graphql";
import { ProductDetailView } from "@/components/product-detail";
import { useProductDetailHook } from "@/components/product-detail/hook";

export default function ProductDetailClientShell({
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
  } = useProductDetailHook({ productData });
  return (
    <>
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
      ></ProductDetailView>
    </>
  );
}
