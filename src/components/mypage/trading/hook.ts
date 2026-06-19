import { useMutation, useQuery } from "@apollo/client";
import {
  MYPAGE_DELETE_TRAVEL_PRODUCT,
  MYPAGE_FETCH_TRAVEL_PRODUCTS_COUNT_I_PICKED,
  MYPAGE_FETCH_TRAVEL_PRODUCTS_COUNT_I_SOLD,
  MYPAGE_FETCH_TRAVEL_PRODUCTS_I_PICKED,
  MYPAGE_FETCH_TRAVEL_PRODUCTS_I_SOLD,
} from "../queries";
import { useState } from "react";
import { bookMarkMenus as menus } from "../constants";
export function useMypageTradingHook() {
  const [searchKeyWord, setSearchKeyWord] = useState("");

  const {
    data: buyData,
    fetchMore,
    refetch: buyDataRefetch,
  } = useQuery(MYPAGE_FETCH_TRAVEL_PRODUCTS_I_SOLD, {
    variables: {
      search: "",
      page: 1,
    },
  });
  const { data: countData } = useQuery(
    MYPAGE_FETCH_TRAVEL_PRODUCTS_COUNT_I_SOLD,
  );

  const { data: countBookMarkData } = useQuery(
    MYPAGE_FETCH_TRAVEL_PRODUCTS_COUNT_I_PICKED,
  );

  const {
    data: bookMark,
    fetchMore: bookmarkFetchMore,
    refetch: bookMarkRefetch,
  } = useQuery(MYPAGE_FETCH_TRAVEL_PRODUCTS_I_PICKED, {
    variables: {
      search: "",
      page: 1,
    },
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [delete_product] = useMutation(MYPAGE_DELETE_TRAVEL_PRODUCT);

  const totalTradeCount = countData?.fetchTravelproductsCountISold ?? 0;
  const totalBookmarkCount =
    countBookMarkData?.fetchTravelproductsCountIPicked ?? 0;

  const handleDeleteProduct = async (id: string) => {
    try {
      await delete_product({
        variables: {
          travelproductId: id,
        },
        update(cache, { data }) {
          const deletedId = data?.deleteTravelproduct;
          if (!deletedId) return;
          cache.modify({
            fields: {
              fetchTravelproductsISold(existingData = [], { readField }) {
                return existingData.filter((el: any) => {
                  return readField("_id", el) !== deletedId;
                });
              },
              fetchTravelproductsCountISold(existingData = 0) {
                return existingData - 1;
              },
            },
          });
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleMypageSearch = async () => {
    const searchData = {
      search: searchKeyWord.trim(),
      page: 1,
    };
    if (activeIndex === 0) {
      await buyDataRefetch(searchData);
    }
    if (activeIndex === 1) {
      await bookMarkRefetch(searchData);
    }
  };

  const isSearching = searchKeyWord.trim() !== "";

  const tradeHasMore = isSearching
    ? false
    : (buyData?.fetchTravelproductsISold.length ?? 0) < totalTradeCount;
  const bookmarkHasMore = isSearching
    ? false
    : (bookMark?.fetchTravelproductsIPicked.length ?? 0) < totalBookmarkCount;

  const onTradeNext = async () => {
    if (buyData === undefined) return;

    await fetchMore({
      variables: {
        search: searchKeyWord,
        page: Math.ceil(buyData?.fetchTravelproductsISold.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        const nextData = [
          ...prev.fetchTravelproductsISold,
          ...fetchMoreResult.fetchTravelproductsISold,
        ];

        return {
          fetchTravelproductsISold: nextData,
        };
      },
    });
  };

  const onBookmarkNext = async () => {
    if (bookMark === undefined) return;

    await bookmarkFetchMore({
      variables: {
        search: searchKeyWord,
        page: Math.ceil(bookMark?.fetchTravelproductsIPicked.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        const nextData = [
          ...prev.fetchTravelproductsIPicked,
          ...fetchMoreResult.fetchTravelproductsIPicked,
        ];

        return {
          fetchTravelproductsIPicked: nextData,
        };
      },
    });
  };

  const handleClickShow = (index: number) => {
    setActiveIndex(index);
    setSearchKeyWord("");
  };

  return {
    buyData,
    bookMark,
    totalTradeCount,
    totalBookmarkCount,
    tradeHasMore,
    bookmarkHasMore,
    onTradeNext,
    onBookmarkNext,
    menus,
    activeIndex,
    handleClickShow,
    handleDeleteProduct,
    searchKeyWord,
    setSearchKeyWord,
    handleMypageSearch,
  };
}
