import { FetchBoardQuery } from "../graphql/graphql";

export interface IBoardDetailProps {
  data?: FetchBoardQuery;
  handleBackToList: () => void;
  handleEditPage: () => void;
}
