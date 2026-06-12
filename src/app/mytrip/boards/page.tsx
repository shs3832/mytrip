import BoardListClientShell from "@/components/boards-list-client-shell";
import BoardListServerShell from "@/components/boards-list-server-shell";

export default function BoardListPage() {
  return (
    <>
      <BoardListServerShell />
      <BoardListClientShell />
    </>
  );
}
