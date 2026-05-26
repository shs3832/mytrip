import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import {
  DeleteBoardDocument,
  FetchBoardsCountDocument,
  FetchBoardsDocument,
} from "@/commons/graphql/graphql";
import { Modal } from "antd";
import { useMemo, useState } from "react";
import _ from "lodash";
import type { Dayjs } from "dayjs";

export default function useBoardList() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const paginationArray = new Array(10).fill(0);

  const { data, refetch } = useQuery(FetchBoardsDocument, {
    variables: {
      page: 1,
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
      refetchQueries: [FetchBoardsDocument],
    });
    Modal.success({
      content: "삭제되었습니다.",
    });
  };

  const { data: count, refetch: refetchCount } = useQuery(
    FetchBoardsCountDocument,
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
    // debounce(keyword);
    setPage(1);
    setCurrentPage(1);
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
    setPage(page - 10);
    setCurrentPage(page - 10);
    refetch({ page: page - 10, search, ...date });
    refetchCount({
      search,
      startDate,
      endDate,
    });
  };
  const handleNextBtn = () => {
    if (page + 10 <= lastPage) {
      setPage(page + 10);
      setCurrentPage(page + 10);
      refetch({ page: page + 10, search, ...date });
      refetchCount({
        search,
        startDate,
        endDate,
      });
    }
  };

  const handleGoPage = async (page: number) => {
    await refetch({ page, search, ...date });
    await refetchCount({
      search,
      startDate,
      endDate,
    });
  };

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
