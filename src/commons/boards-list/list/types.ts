import { FetchBoardsQuery } from "@/commons/graphql/graphql";

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
}
