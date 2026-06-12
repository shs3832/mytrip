import { FetchBoardQuery } from "@/commons/graphql/graphql";

export interface IBoardDetailProps {
  data?: FetchBoardQuery;
  handleBackToList: () => void;
  handleEditPage: () => void;
  getYoutubeID: (value: string) => string | null;
  handleLike: () => void;
  handleDislike: () => void;
  header: React.ReactNode;
  likeCount: number;
  disLikeCount: number;
}
