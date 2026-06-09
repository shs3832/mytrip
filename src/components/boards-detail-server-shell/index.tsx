import { FetchBoardQuery } from "@/commons/graphql/graphql";
import BoardDetailClientShell from "../boards-detail-client-shell";
import { BoardDetailHeaderServerShell } from "./boards-header";

export default function BoardDetailServerShell({
  data,
}: {
  data: FetchBoardQuery;
}) {
  return (
    <BoardDetailClientShell
      data={data}
      header={<BoardDetailHeaderServerShell data={data} />}
    />
  );
}
