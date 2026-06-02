import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import { useParams, useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import * as PortOne from "@portone/browser-sdk/v2";

import {
  FETCH_TRAVEL_PRODUCT_QUESTIONS,
  DELETE_TRAVEL_PRODUCT_QUESTION,
  FETCH_TRAVEL_PRODUCT,
  FETCH_USER_LOGGED_IN,
  TOGGLE_TRAVEL_PRODUCT_PICK,
  CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
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
  FetchTravelproductForDetailQueryVariables,
  FetchUserLoggedInQuery,
  FetchUserLoggedInQueryVariables,
  ToggleTravelproductPickMutation,
  ToggleTravelproductPickMutationVariables,
} from "@/commons/graphql/graphql";

const formatPriceToKRW = (price?: number | null) => {
  return new Intl.NumberFormat("ko-KR").format(price ?? 0);
};

export function useProductDetailHook() {
  const params = useParams();
  const router = useRouter();
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
  const { data: questionData } = useQuery<
    FetchTravelproductForDetailQuery,
    FetchTravelproductForDetailQueryVariables
  >(FETCH_TRAVEL_PRODUCT_QUESTIONS, {
    variables: {
      travelproductId: String(params.productId),
    },
  });
  const { data: userData } = useQuery<
    FetchUserLoggedInQuery,
    FetchUserLoggedInQueryVariables
  >(FETCH_USER_LOGGED_IN);
  const [product_pinned] = useMutation<
    ToggleTravelproductPickMutation,
    ToggleTravelproductPickMutationVariables
  >(TOGGLE_TRAVEL_PRODUCT_PICK);
  const [deleteTravelproductQuestion] = useMutation<
    DeleteTravelproductQuestionMutation,
    DeleteTravelproductQuestionMutationVariables
  >(DELETE_TRAVEL_PRODUCT_QUESTION);
  const [product_buy] = useMutation(
    CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
  );
  const isMine =
    data?.fetchTravelproduct?.seller?._id === userData?.fetchUserLoggedIn?._id;
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
  const handlePinned = async () => {
    try {
      await product_pinned({
        variables: {
          travelproductId: String(params.productId),
        },
        refetchQueries: [
          {
            query: FETCH_TRAVEL_PRODUCT,
            variables: {
              travelproductId: String(params.productId),
            },
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

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
    onOk: () => {
      router.push("/homework30/mypage/points");
    },
  };

  const handlePurchase = async () => {
    setIsBuyModalOpen(false);
    try {
      // await product_buy({
      //   variables: {
      //     useritemId: String(params.productId),
      //   },
      // });
      console.log("체크");
      const userPoint = userData?.fetchUserLoggedIn?.userPoint?.amount || 0;
      const productPrice = data?.fetchTravelproduct?.price;
      if (userPoint < productPrice) {
        setModalData(pointData);
        setIsBuyModalOpen(true);
        return;
      }
      console.log("통과");
      return;

      const rsp = await PortOne.requestPayment({
        // 결제 요청 파라미터 입력
        storeId: process.env.NEXT_PUBLIC_STORE_ID,
        paymentId: `payment_${crypto.randomUUID()}`,
        orderName: data?.fetchTravelproduct?.name,
        totalAmount: productPrice,
        currency: "CURRENCY_KRW",
        channelKey: process.env.NEXT_PUBLIC_CHANNEL_KEY,
        payMethod: "EASY_PAY",
        customer: {
          fullName: userData?.fetchUserLoggedIn?.name,
          email: userData?.fetchUserLoggedIn?.email,
        },
      });
      // 결제 성공 시 로직,
      Modal.success({
        content: `결제가 완료되었습니다.`,
      });
      router.push("/homework30/mypage/points");
    } catch (error) {
      console.log(error);
      if (error instanceof ApolloError) {
        const message = error.graphQLErrors[0]?.message;
        Modal.error({
          content: message ?? "에러가 발생했습니다.",
        });
      }
    }
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

  useEffect(() => {
    const product = data?.fetchTravelproduct;
    const addressInfo = product?.travelproductAddress;

    if (!product) return;

    setSafeContents(DOMPurify.sanitize(product.contents ?? ""));
    setZipCode(addressInfo?.zipcode ?? "");
    setAddress(addressInfo?.address ?? "");
    setAddressDetail(addressInfo?.addressDetail ?? "");
    setLat(addressInfo?.lat ?? "");
    setLng(addressInfo?.lng ?? "");
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

  return {
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
  };
}
