import { IBoardListProps } from "@/components/boards-list/list/types";

export type IBoardListPaginationProps = Pick<
  IBoardListProps,
  | "handleGoPage"
  | "handleNextBtn"
  | "handlePrevBtn"
  | "lastPage"
  | "pageGroupStart"
  | "paginationArray"
  | "currentPage"
>;
