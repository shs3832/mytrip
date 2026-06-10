import { Reference, useMutation, useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DeleteBoardDocument,
  FetchBoardsCountDocument,
  FetchBoardsDocument,
} from "@/commons/graphql/graphql";
import { Modal } from "antd";
import { useEffect, useMemo, useState } from "react";
import _ from "lodash";
import type { Dayjs } from "dayjs";

export default function useBoardList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getSearchParams = searchParams.get("search") ?? "";
  const getPageParamsIsNaN = Number(searchParams.get("page"));
  const getPageParams =
    !getPageParamsIsNaN || Number.isNaN(getPageParamsIsNaN)
      ? 1
      : getPageParamsIsNaN;
  const startPage = Math.floor((getPageParams - 1) / 10) * 10 + 1;
  const [page, setPage] = useState(startPage); // 10 단위 페이지
  const [currentPage, setCurrentPage] = useState(getPageParams); // 현재 페이지 넘버
  const [search, setSearch] = useState(getSearchParams);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const paginationArray = new Array(10).fill(0);

  const { data, refetch } = useQuery(FetchBoardsDocument, {
    variables: {
      search: getSearchParams,
      page: getPageParams,
    },
  });

  const handleViewDetail = (id: String) => {
    router.push(`boards/${id}`);
  };

  const [delete_board] = useMutation(DeleteBoardDocument);

  const handleDelete = async (id: String) => {
    await delete_board({
      variables: {
        boardId: String(id),
      },
      update: (cache, { data }) => {
        const deleteId = data?.deleteBoard;
        if (!deleteId) return;
        cache.modify({
          fields: {
            fetchBoards(
              existingData: readonly Reference[] = [],
              { readField },
            ) {
              return existingData.filter((item) => {
                return readField("_id", item) !== deleteId;
              });
            },
            fetchBoardsCount(existingData = 0) {
              return existingData - 1;
            },
          },
        });
      },
    });
    Modal.success({
      content: "삭제되었습니다.",
    });
  };

  const { data: count, refetch: refetchCount } = useQuery(
    FetchBoardsCountDocument,
    {
      variables: {
        search: getSearchParams,
      },
    },
  );
  const totalCount = count?.fetchBoardsCount ?? 10;
  const lastPage = Math.ceil(totalCount / 10);

  const debounce = useMemo(
    () =>
      _.debounce(async (keyword: string) => {
        await refetch({
          page: 1,
          search: keyword,
          ...date,
        });
        await refetchCount({
          search: keyword,
          ...date,
        });
      }, 500),
    [refetch, refetchCount, startDate, endDate],
  );

  const handleChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const keyword = event.target.value;
    setSearch(keyword);
    // 체인지 이벤트 디바운스 연습용 현재는 쓰지않음
    // debounce(keyword);
    // setPage(1);
    // setCurrentPage(1);
  };

  const handleSearch = async () => {
    try {
      await refetch({
        page: 1,
        search,
        ...date,
      });
      await refetchCount({
        search,
        ...date,
      });
      setPage(1);
      setCurrentPage(1);
      if (search) {
        paramsSet(search, 1);
      } else {
        window.history.pushState(null, "", "?");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const date = {
    startDate,
    endDate,
  };

  const onRangeChange = (dates: null | (Dayjs | null)[]) => {
    if (dates) {
      if (!dates?.[0] || !dates?.[1]) return;
      setStartDate(dates[0].toDate());
      setEndDate(dates[1].toDate());
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handlePrevBtn = () => {
    if (page === 1) return;
    const prevPage = page - 10;
    setPage(prevPage);
    setCurrentPage(prevPage);
    refetch({ page: prevPage, search, ...date });
    refetchCount({
      search,
      startDate,
      endDate,
    });
    paramsSet(search, prevPage);
  };
  const handleNextBtn = () => {
    if (page + 10 <= lastPage) {
      const nextPage = page + 10;
      setPage(nextPage);
      setCurrentPage(nextPage);
      refetch({ page: nextPage, search, ...date });
      refetchCount({
        search,
        startDate,
        endDate,
      });
      paramsSet(search, nextPage);
    }
  };

  const handleGoPage = async (page: number) => {
    await refetch({ page, search, ...date });
    await refetchCount({
      search,
      startDate,
      endDate,
    });

    paramsSet(search, page);
  };

  const paramsSet = (search: string, page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    params.set("page", String(page));
    window.history.pushState(null, "", `?${params}`);
  };

  useEffect(() => {
    const startPage = Math.floor((getPageParams - 1) / 10) * 10 + 1;
    setPage(startPage);
    setCurrentPage(getPageParams);
    setSearch(getSearchParams);
  }, [getSearchParams, getPageParams]);

  return {
    data,
    refetch,
    handleViewDetail,
    handleDelete,
    handleGoPage,
    handleNextBtn,
    handlePrevBtn,
    lastPage,
    page,
    setPage,
    paginationArray,
    currentPage,
    setCurrentPage,
    totalCount,
    handleChangeSearchInput,
    handleSearch,
    search,
    onRangeChange,
  };
}
