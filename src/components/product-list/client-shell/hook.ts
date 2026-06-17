import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { FETCH_TRAVEL_PRODUCTS } from "../queries";
import { Modal } from "antd";
import { filters } from "./constants";
import { FetchTravelproductsQuery } from "@/commons/graphql/graphql";
import { IpageMove } from "./types";
export default function useProductListClientShell({
  productItems,
}: {
  productItems: FetchTravelproductsQuery;
}) {
  const router = useRouter();
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [data, setData] = useState(productItems.fetchTravelproducts);
  const [fetchProducts] = useLazyQuery(FETCH_TRAVEL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const handleTabMenu = async (state: boolean) => {
    setIsSoldOut(state);
    const result = await fetchProducts({
      variables: {
        isSoldout: state,
        search: "",
        page: 1,
      },
    });
    setData(result.data?.fetchTravelproducts ?? []);
    setSearch("");
    setCurrentPage(1);
    setHasNextPage(true);
    setSelectedFilter([]);
  };

  const handleGoToCreateProduct = () => {
    router.push(`/mytrip/products/new`);
  };

  const handleSearchProducts = async (search: string) => {
    try {
      const { data } = await fetchProducts({
        variables: {
          isSoldout: isSoldOut,
          search: search,
          page: 1,
        },
      });
      setData(data?.fetchTravelproducts ?? []);
      setCurrentPage(1);
      setHasNextPage(true);
    } catch (error) {
      if (error instanceof ApolloError) {
        const message = error.graphQLErrors[0]?.message;
        Modal.error({
          content: message ?? "에러가 발생했습니다.",
        });
      }
    }
  };

  const handlePageMove = async (state: IpageMove["state"]) => {
    const nextPage = state === "next" ? currentPage + 1 : currentPage - 1;
    try {
      const { data } = await fetchProducts({
        variables: {
          isSoldout: isSoldOut,
          search: search,
          page: nextPage,
        },
      });
      if (data?.fetchTravelproducts.length === 0) {
        setHasNextPage(false);
        return;
      }

      setData(data?.fetchTravelproducts ?? []);
      setCurrentPage(nextPage);
      setHasNextPage(true);
    } catch (error) {
      if (error instanceof ApolloError) {
        const message = error.graphQLErrors[0]?.message;
        Modal.error({
          content: message ?? "에러가 발생했습니다.",
        });
      }
    }
  };

  // 필터 구현 스텝
  // 클릭한 필터가 이미 선택 목록에 있으면 제거한다.
  // 없으면 선택 목록에 추가한다.
  // 선택 목록이 비어 있으면 전체 상품을 보여준다.
  // 선택 목록이 있으면 상품 태그와 하나라도 겹치는 상품만 보여준다.

  const handleSetFilter = (filterIndex: number) => {
    setSelectedFilter((prev) => {
      // 클릭한 버튼의 index로 filters 배열에서 실제 필터 이름을 꺼낸다.
      // 예: filterIndex가 2라면 filters[2].label 값인 "호텔"을 가져온다.
      const filterLabel = String(filters[filterIndex].label);

      // prev는 이전에 선택되어 있던 필터 이름들의 전체 배열이다.
      // 예: ["호텔", "불멍"]
      const nextSelectedFilter = prev.includes(filterLabel)
        ? // 이미 선택된 필터를 다시 클릭한 경우: 선택 해제한다.
          // selectedLabel은 prev 배열에서 하나씩 꺼낸 현재 값이다.
          // filter는 true인 값만 남기므로, 클릭한 filterLabel과 다른 값만 남긴다.
          prev.filter((selectedLabel) => {
            return selectedLabel !== filterLabel;
          })
        : // 아직 선택되지 않은 필터를 클릭한 경우: 기존 선택값 뒤에 새 필터를 추가
          [...prev, filterLabel];
      return nextSelectedFilter;
    });
  };

  // filteredData는 state가 아니라 data와 selectedFilter로 계산한 화면용 목록이다.
  // 원본 data를 덮어쓰지 않기 때문에 필터를 해제하면 다시 전체 목록으로 돌아갈 수 있다.
  const filteredData =
    selectedFilter.length === 0
      ? // 선택된 필터가 없으면 아무것도 거르지 않고 전체 상품을 보여준다.
        data
      : data.filter((productItem) => {
          // productItem은 data 배열에서 하나씩 꺼낸 현재 상품이다.
          // data.filter는 true를 반환한 상품만 화면 목록에 남긴다.
          return selectedFilter.some((selectedLabel) => {
            // selectedLabel은 selectedFilter 배열에서 하나씩 꺼낸 현재 필터 이름이다.
            // some은 하나라도 true가 나오면 true를 반환한다.
            // 예: productItem.tags에 selectedLabel이 하나라도 들어 있으면 이 상품은 남는다.
            return productItem?.tags?.includes(selectedLabel);
          });
        });
  // 최근 본 상품은 처음에 localStorage 기반으로도 생각했지만,
  // 컴포넌트 간 공유가 필요해서 Zustand store로 분리했다.
  // const handleRecentViewItems = (id: string) => {
  //   setRecentView((prev) => {
  //     const checkItem = prev.includes(id);
  //     if (checkItem) {
  //       return prev;
  //     }
  //     const nextRecentItem = [id, ...prev].slice(0, 3);
  //     return nextRecentItem;
  //   });
  // };

  return {
    searchProps: {
      isSoldOut,
      handleTabMenu,
      handleGoToCreateProduct,
      handleSearchProducts,
      search,
      setSearch,
    },
    filterProps: {
      handleSetFilter,
      filters,
      selectedFilter,
    },
    itemProps: {
      data: filteredData,
    },
    paginationProps: {
      currentPage,
      handlePageMove,
      hasNextPage,
    },
  };
}
