import { FetchBoardsQuery } from "@/commons/graphql/graphql";
import type { Dayjs } from "dayjs";
export interface IBoardListProps {
  data: FetchBoardsQuery | undefined;
  handleViewDetail: (id: string) => void;
  handleDelete: (id: string) => void;
  handleNextBtn: () => void;
  handlePrevBtn: () => void;
  lastPage: number;
  handleGoPage: (page: number) => Promise<void>;
  page: number;
  setPage: (page: number) => void;
  paginationArray: number[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalCount: number;
  handleChangeSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => Promise<void>;
  search: string;
  onRangeChange: (
    dates: null | (Dayjs | null)[],
    dateStrings: string[],
  ) => void;
}
