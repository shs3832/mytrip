import { FetchBoardsQuery } from "../graphql/graphql";

export interface IBoardListProps {
  data?: FetchBoardsQuery;
  handleViewDetail: (id: string) => void;
  handleDelete: (id: string) => void;
}
