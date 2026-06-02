"use client";

import { ProductDetailComponentPage } from "@/components/product-detail";
import { useProductDetailHook } from "@/components/product-detail/hook";

export default function ProductDetailPage() {
  const {
    safeContents,
    currentImage,
    currentIndex,
    isMine,
    data,
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
  } = useProductDetailHook();
  return (
    <>
      <ProductDetailComponentPage
        safeContents={safeContents}
        currentImage={currentImage}
        currentIndex={currentIndex}
        isMine={isMine}
        data={data}
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
      />
    </>
  );
}
