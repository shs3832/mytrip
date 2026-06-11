"use client";
import BoardWriteComponent from "@/components/boards-write";
import { loginCheck } from "@/commons/hoc/login/login";

function Home() {
  return <BoardWriteComponent isEdit={false} />;
}

export default loginCheck(Home);
