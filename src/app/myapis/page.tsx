"use client";

import MyApisList from "@/components/myapis-list";
import useMyApisList from "@/components/myapis-list/hook";
import { Suspense } from "react";

function MyApisPageContents() {
  const { data, handleViewDetail, handleWrite } = useMyApisList();
  return (
    <>
      <MyApisList
        data={data}
        handleViewDetail={handleViewDetail}
        handleWrite={handleWrite}
      />
    </>
  );
}

export default function MyApisPage() {
  return (
    <Suspense fallback={null}>
      <MyApisPageContents />
    </Suspense>
  );
}
