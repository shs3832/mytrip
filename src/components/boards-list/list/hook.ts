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
import dayjs from "dayjs";

export default function useBoardList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getSearchParams = searchParams.get("search") ?? "";
  const getStartDateParams = searchParams.get("startDate") ?? "";
  const getEndDateParams = searchParams.get("endDate") ?? "";

  const getPageParamsIsNaN = Number(searchParams.get("page"));
  const pageFromUrl =
    !getPageParamsIsNaN || Number.isNaN(getPageParamsIsNaN)
      ? 1
      : getPageParamsIsNaN;
  const startPage = Math.floor((pageFromUrl - 1) / 10) * 10 + 1;
  const [pageGroupStart, setPageGroupStart] = useState(startPage); // 10 단위 페이지
  const [currentPage, setCurrentPage] = useState(pageFromUrl); // 현재 페이지 넘버
  const [search, setSearch] = useState(getSearchParams);
  const initialStartDate = getStartDateParams
    ? new Date(getStartDateParams)
    : null;
  const initialEndDate = getEndDateParams ? new Date(getEndDateParams) : null;
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);
  const [appliedStartDate, setAppliedStartDate] = useState<Date | null>(
    startDate,
  );
  const [appliedEndDate, setAppliedEndDate] = useState<Date | null>(endDate);

  const paginationArray = new Array(10).fill(0);

  const {
    data,
    refetch,
    loading: listLoading,
  } = useQuery(FetchBoardsDocument, {
    variables: {
      search: getSearchParams,
      page: pageFromUrl,
      startDate: appliedStartDate ?? undefined,
      endDate: appliedEndDate ?? undefined,
    },
  });

  const handleViewDetail = (id: string) => {
    router.push(`/mytrip/boards/${id}`);
  };

  const [delete_board] = useMutation(DeleteBoardDocument);

  const handleDelete = async (id: string) => {
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
        startDate: appliedStartDate ?? undefined,
        endDate: appliedEndDate ?? undefined,
      },
    },
  );
  const totalCount = count?.fetchBoardsCount ?? 10;
  const lastPage = Math.ceil(totalCount / 10);

  const handleChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const keyword = event.target.value;
    setSearch(keyword);
  };
  const date = {
    startDate,
    endDate,
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
      setPageGroupStart(1);
      setCurrentPage(1);
      const nextStartDates = date.startDate;
      const nextEndDates = date.endDate;
      setAppliedStartDate(nextStartDates);
      setAppliedEndDate(nextEndDates);

      if (search || nextStartDates || nextEndDates) {
        updateUrlQuery(search, 1, nextStartDates, nextEndDates);
      } else {
        window.history.pushState(null, "", "?");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRangeChange = (dates: null | (Dayjs | null)[]) => {
    if (!dates || !dates?.[0] || !dates?.[1]) {
      setStartDate(null);
      setEndDate(null);
      return;
    }

    const nextStartDates = dates?.[0].toDate();
    const nextEndDates = dates?.[1].toDate();
    setStartDate(nextStartDates);
    setEndDate(nextEndDates);
  };

  const handlePrevBtn = () => {
    if (pageGroupStart === 1) return;
    movePageGroup("prev");
  };
  const handleNextBtn = () => {
    if (pageGroupStart + 10 <= lastPage) {
      movePageGroup("next");
    }
  };

  const handleGoPage = async (page: number) => {
    await refetch({
      page,
      search,
      startDate: appliedStartDate,
      endDate: appliedEndDate,
    });
    await refetchCount({
      search,
      startDate: appliedStartDate,
      endDate: appliedEndDate,
    });
    setCurrentPage(page);
    updateUrlQuery(search, page, appliedStartDate, appliedEndDate);
  };

  const movePageGroup = (direction: "prev" | "next") => {
    const targetPage =
      direction === "prev" ? pageGroupStart - 10 : pageGroupStart + 10;
    setPageGroupStart(targetPage);
    setCurrentPage(targetPage);
    refetch({
      page: targetPage,
      search,
      startDate: appliedStartDate,
      endDate: appliedEndDate,
    });
    refetchCount({
      search,
      startDate: appliedStartDate,
      endDate: appliedEndDate,
    });
    updateUrlQuery(search, targetPage, appliedStartDate, appliedEndDate);
  };

  const updateUrlQuery = (
    search: string,
    page: number,
    nextStartDates: Date | null,
    nextEndDates: Date | null,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    if (nextStartDates === null || nextEndDates === null) {
      params.delete("startDate");
      params.delete("endDate");
      setStartDate(null);
      setEndDate(null);
    } else {
      params.set("startDate", nextStartDates.toISOString());
      params.set("endDate", nextEndDates.toISOString());
    }

    params.set("page", String(page));

    window.history.pushState(null, "", `?${params}`);
  };

  useEffect(() => {
    const startPage = Math.floor((pageFromUrl - 1) / 10) * 10 + 1;
    setPageGroupStart(startPage);
    setCurrentPage(pageFromUrl);
    setSearch(getSearchParams);
  }, [getSearchParams, pageFromUrl]);

  return {
    data,
    refetch,
    handleViewDetail,
    handleDelete,
    handleGoPage,
    handleNextBtn,
    handlePrevBtn,
    lastPage,
    pageGroupStart,
    setPageGroupStart,
    paginationArray,
    currentPage,
    setCurrentPage,
    totalCount,
    handleChangeSearchInput,
    handleSearch,
    search,
    onRangeChange,
    listLoading,
    startDate,
    endDate,
  };
}
