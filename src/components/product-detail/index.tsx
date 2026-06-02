import {
  DeleteOutlined,
  LinkOutlined,
  PushpinOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import ProductDetailQuestionWriteComponent from "@/components/product-detail/comment-write";
import ProductDetailQuestionListComponent from "@/components/product-detail/comment-list";
import { IProductDetail } from "./types";
import { ProductDetailModalComponent } from "./modal";

export function ProductDetailComponentPage({
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
}: IProductDetail) {
  return (
    <>
      <ProductDetailModalComponent
        isBuyModalOpen={isBuyModalOpen}
        setIsBuyModalOpen={setIsBuyModalOpen}
        modalData={modalData}
        handlePurchase={handlePurchase}
        handleBuyConfirm={handleBuyConfirm}
      />
      <div className="flex items-center w-full mb-2">
        <div className="text-2xl font-bold">
          {data?.fetchTravelproduct?.name}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button className="flex items-center w-6 h-6 text-gray-800 text-sm">
            <DeleteOutlined />
          </button>
          <button className="flex items-center w-6 h-6 text-gray-800 text-sm">
            <LinkOutlined />
          </button>
          <button className="flex items-center w-6 h-6 text-gray-800 text-sm">
            <PushpinOutlined />
          </button>
          <div
            onClick={handlePinned}
            className="flex items-center py-1 px-2 text-white shadow-md text-sm bg-black bg-opacity-40 rounded-lg cursor-pointer"
          >
            <TagOutlined />
            <span className="ml-1">
              {data?.fetchTravelproduct?.pickedCount ?? 0}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-gray-600 text-base font-medium">
          {data?.fetchTravelproduct?.remarks}
        </p>
        <div className="tags flex items-center gap-2">
          {data?.fetchTravelproduct?.tags?.map((tag: string) => (
            <span key={tag} className="text-blue-500 text-base font-medium">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex w-full items-start gap-10">
        <div className="flex w-full flex-col">
          <div className="flex items-start gap-6">
            <div className="rounded-lg overflow-hidden w-[511px] h-[400px] relative flex-grow border border-gray-300">
              {data ? (
                <div className="w-full h-full bg-gray-200  rounded-lg flex items-center justify-center">
                  <img
                    src={
                      currentImage ||
                      `https://storage.googleapis.com/${data.fetchTravelproduct.images[0]}`
                    }
                    alt="Product Image"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">이미지가 없습니다.</span>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              {data && (
                <Swiper
                  loop={false}
                  slidesPerView={3}
                  spaceBetween={20}
                  direction={"vertical"}
                  className="w-[180px] h-[400px]"
                >
                  {data?.fetchTravelproduct?.images?.map(
                    (el: string, index: number) => {
                      return (
                        <SwiperSlide
                          key={el}
                          className={`relative w-full h-full rounded-lg overflow-hidden border border-gray-300 cursor-pointer ${index !== currentIndex ? "opacity-50" : ""}`}
                          onClick={() => {
                            setCurrentIndex(index);
                            setCurrentImage(
                              `https://storage.googleapis.com/${el}`,
                            );
                          }}
                        >
                          <img
                            src={`https://storage.googleapis.com/${el}`}
                            alt="배너이미지"
                            className="w-full h-full object-cover"
                          />
                        </SwiperSlide>
                      );
                    },
                  )}
                </Swiper>
              )}
            </div>
          </div>
          <div className="border-t border-gray-300 mt-10 pt-10">
            <h2 className="mb-5 font-bold text-2xl">상세 설명</h2>
            <p dangerouslySetInnerHTML={{ __html: safeContents }} />
          </div>

          <div className="border-t border-gray-300 mt-10 pt-10">
            <h2 className="mb-5 font-bold text-2xl">상세 위치</h2>
            <div id="map" className="border rounded-lg w-full h-[280px]"></div>
          </div>
        </div>
        <div className="flex items-center gap-6 ">
          <div className="flex flex-col">
            <div className="border border-gray-300 rounded-lg p-6">
              <strong>
                {formatPriceToKRW(data?.fetchTravelproduct?.price)}원
              </strong>
              <ul>
                <li className="text-gray-600 text-sm mt-2">
                  숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.
                </li>
                <li className="text-gray-600 text-sm mt-2">
                  상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.
                </li>
              </ul>
              <Button
                type="primary"
                size="large"
                className="mt-4 w-full"
                onClick={handleBuyConfirm}
              >
                구매하기
              </Button>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 mt-4">
              <strong>판매자</strong>
              <div className="flex items-center gap-1 mt-1">
                <div>
                  <UserOutlined />
                </div>
                <div className="text-gray-600 text-sm ml-1">
                  {data?.fetchTravelproduct?.seller?.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="mb-5 text-base">문의하기</h2>

        {questionData?.fetchTravelproductQuestions?.length === 0 && (
          <div className="mt-10 w-full h-24 border border-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">등록된 문의가 없습니다.</span>
          </div>
        )}

        {questionData?.fetchTravelproductQuestions?.map(
          (question: {
            _id: string;
            contents: string;
            createdAt: string;
            user: { name: string };
          }) => (
            <ProductDetailQuestionListComponent
              key={question._id}
              question={question}
              handleDeleteQuestion={handleDeleteQuestion}
              isMine={isMine}
            />
          ),
        )}
        <ProductDetailQuestionWriteComponent isEdit={false} />
      </div>
    </>
  );
}
