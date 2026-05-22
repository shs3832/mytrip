"use client";

import MyApisDetail from "@/components/myapis-detail";
import useMyApisDetail from "@/components/myapis-detail/hook";

export default function MyApisDetailPage() {
  const { data, onClickBoard, onClickEdit } = useMyApisDetail();
  return (
    <>
      <MyApisDetail
        data={data}
        onClickBoard={onClickBoard}
        onClickEdit={onClickEdit}
      />
    </>
  );
}
