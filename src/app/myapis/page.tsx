"use client";

import MyApisList from "@/components/myapis-list";
import useMyApisList from "@/components/myapis-list/hook";

export default function MyApisPage() {
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
