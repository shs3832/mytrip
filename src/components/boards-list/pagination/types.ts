import { IBoardListProps } from "@/components/boards-list/list/types";

export type IBoardListPaginationProps = Pick<
  IBoardListProps,
  | "handleGoPage"
  | "handleNextBtn"
  | "handlePrevBtn"
  | "lastPage"
  | "page"
  | "paginationArray"
  | "currentPage"
  | "setCurrentPage"
>;
