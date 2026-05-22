import { Modal } from "antd";
import { doc, getDoc } from "firebase/firestore/lite";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IFetchData } from "./types";
import { db } from "@/commons/libraries/firebase";

export default function useMyApisDetail() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<IFetchData>();
  const travelWishlists = doc(db, "travelWishlists", String(params.myapiId));
  const onClickFetch = async () => {
    const result = await getDoc(travelWishlists);
    if (!result.exists()) {
      Modal.error({
        content: "문서가 없습니다.",
      });
      return;
    }
    const detailData = {
      id: result.id,
      ...(result.data() as Omit<IFetchData, "id">),
    };
    setData(detailData);
    console.log(detailData);
  };

  const onClickBoard = () => {
    router.push("../myapis");
  };

  const onClickEdit = () => {
    router.push(`../myapis/${params.myapiId}/edit`);
  };

  useEffect(() => {
    onClickFetch();
  }, []);
  return {
    data,
    onClickBoard,
    onClickEdit,
  };
}
