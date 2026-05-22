import { db } from "@/commons/libraries/firebase";
import { Input, Modal } from "antd";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ITravelWishInput } from "@/components/myapis-write/types";

export const useMyApisWrite = ({ isEdit }: { isEdit?: boolean }) => {
  const travelWishlists = collection(db, "travelWishlists");
  const router = useRouter();
  const params = useParams();
  const { TextArea } = Input;
  const travelWishlistDoc = doc(db, "travelWishlists", String(params.myapiId));
  const dataSet = {
    place: "",
    country: "",
    memo: "",
    season: "봄",
    priority: "상",
  };
  const getTravelWishDoc = async () => {
    const result = await getDoc(travelWishlistDoc);
    if (!result.exists()) {
      return;
    }
    const data = result.data() as ITravelWishInput;

    if (isEdit) {
      setInputState({
        ...data,
      });
    }
  };

  const [inputState, setInputState] = useState<ITravelWishInput>({
    ...dataSet,
  });
  const [checkState, setCheckState] = useState([true, true]);

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setInputState({
      ...inputState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (name: "season" | "priority", value: string) => {
    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  const onClickSubmit = async () => {
    if ((inputState.place ?? "") === "") {
      setCheckState((prev) => [false, prev[1]]);
    } else {
      setCheckState((prev) => [true, prev[1]]);
    }
    if ((inputState.country ?? "") === "") {
      setCheckState((prev) => [prev[0], false]);
    } else {
      setCheckState((prev) => [prev[0], true]);
    }

    if (!inputState.place || !inputState.country) {
      Modal.warning({
        content: `여행지 이름과 국가/지역을 입력하세요.`,
      });
      return;
    }
    try {
      await addDoc(travelWishlists, {
        ...inputState,
        createdAt: serverTimestamp(),
      });
      Modal.success({
        content: "등록이 완료되었습니다.",
      });
    } catch (error) {
      Modal.error({
        content: `${error}`,
      });
    }

    setCheckState([true, true]);
    setInputState({
      ...dataSet,
    });
    console.log(params.myapiId);

    router.push(`/myapis/`);
  };

  const onClickUpdate = async () => {
    try {
      await updateDoc(travelWishlistDoc, {
        ...inputState,
      });
      Modal.success({
        content: "수정이 완료되었습니다.",
      });
    } catch (error) {
      Modal.error({
        content: `${error}`,
      });
    }
    router.push(`/myapis/${params.myapiId}`);
  };

  const onClickBoard = () => {
    router.push("/myapis");
  };

  useEffect(() => {
    if (isEdit) {
      getTravelWishDoc();
    }
  }, []);

  return {
    inputState,
    handleInputChange,
    handleSelectChange,
    onClickSubmit,
    onClickUpdate,
    onClickBoard,
    checkState,
    TextArea,
  };
};
