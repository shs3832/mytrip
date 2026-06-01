"use client";
import {
  DeleteOutlined,
  EnterOutlined,
  LinkOutlined,
  PushpinOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Input, Button, Modal } from "antd";
import { useParams, useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const { TextArea } = Input;
const FETCH_TRAVEL_PRODUCT = gql`
  query fetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      price
      contents
      images
      tags
      travelproductAddress {
        address
        addressDetail
        lat
        lng
      }
      buyer {
        _id
        name
        email
      }
      seller {
        _id
        name
        email
      }
    }
  }
`;

const CREATE_TRAVEL_PRODUCT_QUESTION = gql`
  mutation createTravelproductQuestion(
    $createTravelproductQuestionInput: CreateTravelproductQuestionInput!
    $travelproductId: ID!
  ) {
    createTravelproductQuestion(
      createTravelproductQuestionInput: $createTravelproductQuestionInput
      travelproductId: $travelproductId
    ) {
      _id
      contents
      travelproduct {
        _id
      }
      createdAt
      updatedAt
      user {
        _id
        name
        email
      }
    }
  }
`;

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
  const [question, setQuestion] = useState("");

  const { data } = useQuery(FETCH_TRAVEL_PRODUCT, {
    variables: {
      travelproductId: String(params.productId),
    },
  });

  const [createTravelproductQuestion] = useMutation(
    CREATE_TRAVEL_PRODUCT_QUESTION,
  );

  const handleQuestionSubmit = async () => {
    // 문의하기 버튼 클릭 시 실행되는 함수

    if (question.trim() === "") {
      // 질문 내용이 비어있는 경우, 제출하지 않고 함수 종료
      return;
    }
    try {
      const result = await createTravelproductQuestion({
        variables: {
          createTravelproductQuestionInput: {
            contents: question,
          },
          travelproductId: String(params.productId),
        },
      });
      Modal.success({
        content: "문의가 등록되었습니다.",
      });

      setQuestion("");
      console.log(result);
    } catch (error) {
      console.error("문의 등록 실패:", error);
    }
  };

  useEffect(() => {
    if (data?.fetchTravelproduct?.contents) {
      setSafeContents(DOMPurify.sanitize(data.fetchTravelproduct.contents));
    }
    setZipCode(data?.fetchTravelproduct.travelproductAddress.zipcode);
    setAddress(data?.fetchTravelproduct.travelproductAddress.address);
    setAddressDetail(
      data?.fetchTravelproduct.travelproductAddress.addressDetail,
    );
    setLat(data?.fetchTravelproduct.travelproductAddress.lat);
    setLng(data?.fetchTravelproduct.travelproductAddress.lng);
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

  // useEffect(() => {
  //   if (data?.fetchTravelproduct?.images?.length) {
  //     currentImage = `https://storage.googleapis.com/${data.fetchTravelproduct.images[0]}`;
  //   }
  // }, [currentImage, data]);

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
              {/* {data?.fetchTravelproduct?.images?.map(
                (el: string, index: number) => {
                  return (
                    <div className="w-[180px] h-[136px] rounded-lg" key={index}>
                      <img
                        src={`https://storage.googleapis.com/${el}`}
                        alt="Product Image"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  );
                },
              )} */}
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
        <div className="flex flex-col gap-4">
          <TextArea
            placeholder="문의 내용을 입력해주세요."
            rows={4}
            className="w-full h-24 border border-gray-300 rounded-lg p-2"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button
            type="primary"
            size="large"
            className="ml-auto"
            onClick={handleQuestionSubmit}
          >
            문의하기
          </Button>
        </div>

        <div className="mt-10">
          <div className="comment-card mb-5 pb-5 border-b border-gray-200">
            <div>
              <div className="comment-header flex items-center">
                <div className="profile-info flex items-center mt-2">
                  <span className="block w-full h-full rounded-[50%]">
                    <UserOutlined />
                  </span>
                  <span className="text-sm text-gray-700 ml-1 shrink-0">
                    asdasd
                  </span>
                </div>
                <div className="comment-btns ml-auto flex items-center gap-2">
                  <button>수정</button>
                  <button>삭제</button>
                </div>
              </div>
              <div className="comment-body text-base mt-2 text-gray-800">
                asdasd
              </div>
              <p className="comment-date text-xs mt-2 text-gray-700">
                2026.01.01
              </p>
            </div>
            <div className="pl-5 mt-4">
              <div className="flex items-start gap-4">
                <EnterOutlined className="scale-x-[-1] text-sm self-start mt-1" />
                <div className="w-full">
                  <div className="comment-header flex items-center">
                    <div className="profile-info flex items-center ">
                      <span className="block w-full h-full rounded-[50%]">
                        <UserOutlined />
                      </span>
                      <span className="text-sm text-gray-700 ml-1 shrink-0">
                        asdasd
                      </span>
                    </div>
                    <div className="comment-btns ml-auto flex items-center gap-2">
                      <button>수정</button>
                      <button>삭제</button>
                    </div>
                  </div>
                  <div className="comment-body text-base mt-2 text-gray-800">
                    asdasd
                  </div>
                  <p className="comment-date text-xs mt-2 text-gray-700">
                    2026.01.01
                  </p>

                  <div className="flex flex-col gap-4 mt-4">
                    <TextArea
                      placeholder="답변내용을 입력해 주세요"
                      rows={4}
                      className="w-full h-24 border border-gray-300 rounded-lg p-2"
                    />
                    <div className="flex gap-2 mt-2 justify-end">
                      <Button
                        type="default"
                        color="default"
                        variant="outlined"
                        size="large"
                      >
                        취소
                      </Button>
                      <Button
                        type="default"
                        color="default"
                        variant="solid"
                        size="large"
                      >
                        답변하기
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <TextArea
              placeholder="답변내용을 입력해 주세요"
              rows={4}
              className="w-full h-24 border border-gray-300 rounded-lg p-2"
            />
            <div className="flex gap-2 mt-2 justify-end">
              <Button
                type="default"
                color="default"
                variant="outlined"
                size="large"
              >
                취소
              </Button>
              <Button
                type="default"
                color="default"
                variant="solid"
                size="large"
              >
                답변하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
