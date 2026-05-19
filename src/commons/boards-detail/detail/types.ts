import { FetchBoardQuery } from "@/commons/graphql/graphql";

export interface IBoardDetailProps {
  data?: FetchBoardQuery;
  handleBackToList: () => void;
  handleEditPage: () => void;
}
