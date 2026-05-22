import { db } from "@/commons/libraries/firebase";

import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IFetchData } from "./types";

export default function useMyApisList() {
  const [data, setData] = useState<IFetchData[]>([]);
  const travelWishlists = query(
    collection(db, "travelWishlists"),
    orderBy("createdAt", "desc"),
    // limit(10),
  );

  const router = useRouter();

  const onClickFetch = async () => {
    const result = await getDocs(travelWishlists);

    const datas = result.docs.map((el) => ({
      id: el.id,
      ...(el.data() as Omit<IFetchData, "id">),
    }));
    setData(datas);
  };

  const handleViewDetail = (id: string) => {
    router.push(`../myapis/${id}`);
  };

  const handleWrite = () => {
    router.push("../myapis/new");
  };

  useEffect(() => {
    onClickFetch();
  }, []);

  return {
    data,
    handleViewDetail,
    handleWrite,
  };
}
