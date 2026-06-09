import type { Metadata } from "next";
import BoardDetailServerShell from "@/components/boards-detail-server-shell";
import { BoardsMetaData } from "@/components/boards-detail/detail/metadata";
import { BoardsDetailGetData } from "@/components/boards-detail/detail/getData";

// dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}): Promise<Metadata> {
  return BoardsMetaData(params.boardId);
}

export default async function BoardsDetailPage({
  params,
}: {
  params: { boardId: string };
}) {
  const data = await BoardsDetailGetData(params.boardId);

  return (
    <>
      <BoardDetailServerShell data={data} />
    </>
  );
}
