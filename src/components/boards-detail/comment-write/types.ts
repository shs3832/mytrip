import { FetchBoardCommentsQuery } from "@/commons/graphql/graphql";

export interface IBoardCommentWriteProps {
  isCommentEdit?: boolean;
  setIsCommentEdit?: (value: boolean) => void;
  el?: FetchBoardCommentsQuery["fetchBoardComments"][0];
}
