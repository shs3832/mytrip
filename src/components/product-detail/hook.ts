import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import { useParams } from "next/navigation";
import DOMPurify from "dompurify";
import { useEffect, useMemo, useState } from "react";
import * as PortOne from "@portone/browser-sdk/v2";

import {
  FETCH_TRAVEL_PRODUCT_QUESTIONS,
  DELETE_TRAVEL_PRODUCT_QUESTION,
  FETCH_USER_LOGGED_IN,
  TOGGLE_TRAVEL_PRODUCT_PICK,
  CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
  CREATE_POINT_TRANSACTION_OF_LOADING,
  FETCH_TRAVEL_PRODUCTS_PICKED,
} from "@/components/product-detail/queries";

declare global {
  interface Window {
    kakao: any;
  }
}

import type {
  DeleteTravelproductQuestionMutation,
  DeleteTravelproductQuestionMutationVariables,
  FetchTravelproductForDetailQuery,
  FetchTravelproductQuestionsQuery,
  FetchTravelproductQuestionsQueryVariables,
  FetchUserLoggedInQuery,
  FetchUserLoggedInQueryVariables,
  ToggleTravelproductPickMutation,
  ToggleTravelproductPickMutationVariables,
} from "@/commons/graphql/graphql";
import { useKaKaoLoadStore } from "@/commons/stores/kakaoMapLoad";

const formatPriceToKRW = (price?: number | null) => {
  return new Intl.NumberFormat("ko-KR").format(price ?? 0);
};

const options = [
  {
    value: 1000,
    label: "1,000원",
  },
  {
    value: 3000,
    label: "3,000원",
  },
  {
    value: 5000,
    label: "5,000원",
  },
  {
    value: 10000,
    label: "10,000원",
  },
  {
    value: 30000,
    label: "30,000원",
  },
  {
    value: 50000,
    label: "50,000원",
  },
];

export function useProductDetailHook({
  productData,
}: {
  productData: FetchTravelproductForDetailQuery;
}) {
  const product = productData?.fetchTravelproduct;
  const addressInfo = product?.travelproductAddress;
  const params = useParams();

  const [currentImage, setCurrentImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [picked, setPicked] = useState(false);
  const { isLoaded } = useKaKaoLoadStore();

  const address = addressInfo?.address ?? "";
  const lat = addressInfo?.lat ?? null;
  const lng = addressInfo?.lng ?? null;
  const [safeContents, setSafeContents] = useState("");

  const firstImage = product?.images?.[0] ?? "";
  const firstImageUrl = firstImage
    ? `https://storage.googleapis.com/${firstImage}`
    : "";
  const mainImage = currentImage || firstImage;
  const hasImage = mainImage !== "";
  const hasLocation = address !== "" && lat !== null && lng !== null;
  // const safeContents = useMemo(() => {
  //   return DOMPurify.sanitize(product?.contents ?? "");
  // }, [product?.contents]);
  const { data: questionData } = useQuery<
    FetchTravelproductQuestionsQuery,
    FetchTravelproductQuestionsQueryVariables
  >(FETCH_TRAVEL_PRODUCT_QUESTIONS, {
    variables: {
      travelproductId: String(params.productId),
    },
  });
  const { data: userData } = useQuery<
    FetchUserLoggedInQuery,
    FetchUserLoggedInQueryVariables
  >(FETCH_USER_LOGGED_IN);
  const { data: userPicked } = useQuery(FETCH_TRAVEL_PRODUCTS_PICKED, {
    variables: {
      search: "",
      page: 1,
    },
  });
  const [product_pinned, { loading: pinned_loading }] = useMutation<
    ToggleTravelproductPickMutation,
    ToggleTravelproductPickMutationVariables
  >(TOGGLE_TRAVEL_PRODUCT_PICK);
  const [deleteTravelproductQuestion] = useMutation<
    DeleteTravelproductQuestionMutation,
    DeleteTravelproductQuestionMutationVariables
  >(DELETE_TRAVEL_PRODUCT_QUESTION);
  // const [product_buy] = useMutation(
  //   CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
  // );
  const isMine =
    productData?.fetchTravelproduct?.seller?._id ===
    userData?.fetchUserLoggedIn?._id;
  const handleDeleteQuestion = async (id: string) => {
    // 문의 삭제 버튼 클릭 시 실행되는 함수
    try {
      await deleteTravelproductQuestion({
        variables: {
          travelproductQuestionId: id,
        },
        update(cache, { data }) {
          // mutation 응답에서 삭제된 문의 id를 꺼낸다.
          const deleteId = data?.deleteTravelproductQuestion;
          if (!deleteId) return;

          cache.modify({
            // Apollo 캐시에 저장된 문의 목록 필드를 직접 수정한다.
            fields: {
              fetchTravelproductQuestions(existingData = [], { readField }) {
                // 캐시 항목은 참조값일 수 있으므로 readField로 _id를 읽어 비교한다.
                return existingData.filter((item: { _id: string }) => {
                  return readField("_id", item) !== deleteId;
                });
              },
            },
          });
        },
      });
      Modal.success({
        content: "문의가 삭제되었습니다.",
      });
      // 문의 목록을 다시 불러오거나 상태를 업데이트하여 UI를 갱신할 수 있습니다.
    } catch (error) {
      console.error("문의 삭제 실패:", error);
    }
  };
  const handlePinned = async () => {
    if (pinned_loading) return;
    try {
      await product_pinned({
        variables: {
          travelproductId: String(params.productId),
        },

        optimisticResponse: {
          toggleTravelproductPick: picked ? 0 : 1,
        },

        update: (cache, { data }) => {
          const isPinned = data?.toggleTravelproductPick;

          if (isPinned === undefined) return;
          setPicked(isPinned === 1);
          cache.modify({
            id: cache.identify({
              __typename: "Travelproduct",
              _id: String(params.productId),
            }),
            fields: {
              pickedCount(existingData = 0) {
                return isPinned === 1 ? existingData + 1 : existingData - 1;
              },
            },
          });
        },
      });
    } catch (error) {
      console.error("스크랩 삭제 실패:", error);
    }
  };

  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isPointModalOpen, setIsPointModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    content: "",
    okText: "",
    cancelText: "",
  });

  const pointData = {
    title: "포인트 부족",
    content: "포인트가 부족합니다. 포인트 충전 후 구매하세요.",
    okText: "확인",
    cancelText: "취소",
    onOK: () => {
      setIsBuyModalOpen(false);
      setIsPointModalOpen(true);
    },
  };

  const handleBuyConfirm = () => {
    const confirmData = {
      title: "해당 숙박권을 구매 하시겠어요?",
      content: "해당 숙박권은 포인트로만 구매 가능합니다.",
      okText: "확인",
      cancelText: "취소",
      onOK: handlePurchase,
    };
    setModalData(confirmData);
    setIsBuyModalOpen(true);
  };

  const [add_point] = useMutation(CREATE_POINT_TRANSACTION_OF_LOADING);
  const [product_buy] = useMutation(
    CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
  );

  const [pointOptions, setPointOptions] = useState(0);
  const handleAddPoints = async () => {
    if (pointOptions === 0) {
      Modal.error({ content: "충전할 금액을 선택해 주세요." });
      return;
    }
    const paymentId = `payment_${crypto.randomUUID()}`;
    try {
      const rsp = await PortOne.requestPayment({
        // 결제 요청 파라미터 입력
        storeId: process.env.NEXT_PUBLIC_STORE_ID ?? "",
        paymentId: paymentId,
        orderName: "유저 포인트 충전",
        totalAmount: pointOptions,
        currency: "CURRENCY_KRW",
        channelKey: process.env.NEXT_PUBLIC_CHANNEL_KEY,
        payMethod: "EASY_PAY",
      });

      if (rsp?.code) {
        Modal.error({ content: rsp.message });
        return;
      }

      if (!rsp?.paymentId) {
        Modal.error({
          content: "결제가 완료되지 않았습니다.",
        });
        return;
      }

      await add_point({
        variables: {
          paymentId: rsp.paymentId,
        },
        refetchQueries: [
          {
            query: FETCH_USER_LOGGED_IN,
          },
        ],
      });

      Modal.success({
        content: "포인트 충전이 완료되었습니다.",
      });
    } catch {
      Modal.error({
        content: `결제가 취소되었거나 실패했습니다.`,
      });
    }

    setIsPointModalOpen(false);
  };

  const handlePurchase = async () => {
    setIsBuyModalOpen(false);
    try {
      const userPoint = userData?.fetchUserLoggedIn?.userPoint?.amount || 0;
      const productPrice = productData?.fetchTravelproduct?.price;

      if (typeof productPrice !== "number") {
        Modal.error({ content: "상품 가격 정보를 불러오지 못했습니다." });
        return;
      }
      if (userPoint < productPrice) {
        setModalData(pointData);
        setIsBuyModalOpen(true);
        return;
      }
      await product_buy({
        variables: {
          useritemId: String(params.productId),
        },
      });
      Modal.success({
        content: `결제가 완료되었습니다.`,
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        const message = error.graphQLErrors[0]?.message;
        Modal.error({
          content: message ?? "에러가 발생했습니다.",
        });
      }
    }
  };

  useEffect(() => {
    if (!isLoaded) return;
    if (!address) return;
    if (lat === null || lng === null) return;
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
  }, [isLoaded, address, lat, lng]);

  useEffect(() => {
    if (!userPicked?.fetchTravelproductsIPicked) return;
    const isUserPicked = userPicked?.fetchTravelproductsIPicked.some(
      (el: { _id: string }) => {
        return el._id === String(params.productId);
      },
    );
    setPicked(isUserPicked);
  }, [userPicked]);

  useEffect(() => {
    setSafeContents(DOMPurify.sanitize(product?.contents ?? ""));
  }, [product?.contents]);

  return {
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
  };
}
