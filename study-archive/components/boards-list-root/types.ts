import { FetchBoardsQuery } from "@/commons/graphql/graphql";

export interface IBoardListProps {
  data?: FetchBoardsQuery;
  handleViewDetail: (id: string) => void;
  handleDelete: (id: string) => void;
}
