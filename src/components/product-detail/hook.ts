import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import { useParams } from "next/navigation";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

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

const formatPriceToKRW = (price?: number | null) => {
  return new Intl.NumberFormat("ko-KR").format(price ?? 0);
};

export function useProductDetailHook() {
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
  const [product_pinned] = useMutation(TOGGLE_TRAVEL_PRODUCT_PICK);
  const [deleteTravelproductQuestion] = useMutation(
    DELETE_TRAVEL_PRODUCT_QUESTION,
  );
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
      Modal.success({ content: "관심게시물로 등록했습니다" });
    } catch (error) {
      console.log(error);
    }
  };
  const handlePurchase = async () => {
    try {
      await product_buy({
        variables: {
          useritemId: String(params.productId),
        },
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
  };
}
