"use client";
import { LeftOutlined, RightOutlined, TagOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";

import DOMPurify from "dompurify";
// Import Swiper styles
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { useRouter } from "next/navigation";
import { FetchTravelproductsOfTheBestQuery } from "@/commons/graphql/graphql";

export default function ProductListBestItems({
  bestItem,
}: {
  bestItem: FetchTravelproductsOfTheBestQuery;
}) {
  const formatNumberWithComma = (value?: number | null) => {
    return new Intl.NumberFormat("ko-KR").format(value ?? 0);
  };
  const router = useRouter();
  return (
    <div className="relative mt-5">
      <button className="product-prev absolute -left-[20px] top-1/2 z-10 bg-white rounded-full w-10 h-10 text-black text-xl">
        <LeftOutlined />
      </button>

      <button className="product-next absolute -right-[20px] top-1/2 z-10 bg-white rounded-full w-10 h-10 text-black text-xl">
        <RightOutlined />
      </button>
      <Swiper
        slidesPerView={2}
        spaceBetween={32}
        pagination={{
          clickable: true,
        }}
        loop={true}
        className="h-full"
        modules={[Navigation]}
        navigation={{
          prevEl: ".product-prev",
          nextEl: ".product-next",
        }}
      >
        {bestItem?.fetchTravelproductsOfTheBest.map((el) => {
          return (
            <SwiperSlide
              key={el._id}
              className="relative h-full cursor-pointer"
              onClick={() => {
                router.push(`/mytrip/products/${el._id}`);
              }}
              role="link"
              tabIndex={0}
            >
              <div className="rounded-xl overflow-hidden">
                <div className="relative">
                  <div
                    className="relative aspect-[4/3] object-cover w-[628px] h-[628px]
            after:content-[''] after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-gradient-to-t after:to-transparent after:from-black after:opacity-50"
                  >
                    {el?.images?.[0] !== "" ? (
                      <img
                        src={`https://storage.googleapis.com/${el?.images?.[0]}`}
                        width={"100%"}
                        height={"100%"}
                        className="h-full w-full object-cover"
                        alt={`${el.name} 이미지`}
                      />
                    ) : (
                      <img src="/images/product-01.png" />
                    )}
                  </div>
                  <div className="absolute top-6 right-6">
                    <div className="flex items-center py-1 px-2 text-white shadow-md text-sm bg-black bg-opacity-40 rounded-lg cursor-pointer">
                      <TagOutlined />
                      <span className="ml-1">{el.pickedCount}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 w-full p-6">
                    <h3 className="text-2xl text-white font-bold">{el.name}</h3>
                    <p
                      className="text-xl line-clamp-2 font-bold text-white mt-2"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(el.contents ?? ""),
                      }}
                    />
                    <p className="text-right mt-2 text-2xl text-white font-bold">
                      {formatNumberWithComma(el.price)}원
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
