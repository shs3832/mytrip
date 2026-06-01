"use client";
import {
  DeleteOutlined,
  LinkOutlined,
  PushpinOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Modal } from "antd";
import { useParams, useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import ProductDetailQuestionWriteComponent from "@/components/product-detail/comment-write";
import ProductDetailQuestionListComponent from "@/components/product-detail/comment-list";
import {
  FETCH_TRAVEL_PRODUCT_QUESTIONS,
  DELETE_TRAVEL_PRODUCT_QUESTION,
  FETCH_TRAVEL_PRODUCT,
  FETCH_USER_LOGGED_IN,
} from "@/components/product-detail/queries";

declare global {
  interface Window {
    kakao: any;
  }
}

const formatPriceToKRW = (price?: number | null) => {
  return new Intl.NumberFormat("ko-KR").format(price ?? 0);
};

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [safeContents, setSafeContents] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data } = useQuery(FETCH_TRAVEL_PRODUCT, {
    variables: {
      travelproductId: String(params.productId),
    },
  });

  const { data: questionData } = useQuery(FETCH_TRAVEL_PRODUCT_QUESTIONS, {
    variables: {
      travelproductId: String(params.productId),
      page: 1,
    },
  });

  const { data: userData } = useQuery(FETCH_USER_LOGGED_IN);

  const [deleteTravelproductQuestion] = useMutation(
    DELETE_TRAVEL_PRODUCT_QUESTION,
  );

  const handleDeleteQuestion = async (id: string) => {
    // 문의 삭제 버튼 클릭 시 실행되는 함수
    try {
      await deleteTravelproductQuestion({
        variables: {
          travelproductQuestionId: id,
        },
        refetchQueries: [
          {
            query: FETCH_TRAVEL_PRODUCT_QUESTIONS,
            variables: {
              travelproductId: String(params.productId),
              page: 1,
            },
          },
        ],
      });
      Modal.success({
        content: "문의가 삭제되었습니다.",
      });
      // 문의 목록을 다시 불러오거나 상태를 업데이트하여 UI를 갱신할 수 있습니다.
    } catch (error) {
      console.error("문의 삭제 실패:", error);
    }
  };

  const isMine =
    data?.fetchTravelproduct?.seller?._id === userData?.fetchUserLoggedIn?._id;
  console.log(isMine);
  useEffect(() => {
    if (data?.fetchTravelproduct?.contents) {
      setSafeContents(DOMPurify.sanitize(data.fetchTravelproduct?.contents));
    }
    setZipCode(data?.fetchTravelproduct?.travelproductAddress?.zipcode);
    setAddress(data?.fetchTravelproduct?.travelproductAddress?.address);
    setAddressDetail(
      data?.fetchTravelproduct?.travelproductAddress?.addressDetail,
    );
    setLat(data?.fetchTravelproduct?.travelproductAddress?.lat);
    setLng(data?.fetchTravelproduct?.travelproductAddress?.lng);
  }, [data]);

  useEffect(() => {
    if (!address) return;
    if (!lat || !lng) return;
    if (!window.kakao?.maps) return;

    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      if (!container) return;
      const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      });

      // 마커 표시
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(lat, lng),
      });
      marker.setMap(map);
    });
  }, [address, lat, lng]);

  return (
    <>
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
          <div className="flex items-center py-1 px-2 text-white shadow-md text-sm bg-black bg-opacity-40 rounded-lg">
            <TagOutlined />
            <span className="ml-1">
              {data?.fetchTravelproduct?.tags?.length}
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
              <Button type="primary" size="large" className="mt-4 w-full">
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
