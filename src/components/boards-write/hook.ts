import { useEffect, useState } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
  UploadBoardFileDocument,
} from "@/commons/graphql/graphql";
import { IUpdateBoardInput } from "@/components/boards-write/types";
import { type Address } from "react-daum-postcode";
import { Modal } from "antd";

export const useBoardWrite = ({ isEdit }: { isEdit: Boolean }) => {
  const router = useRouter();
  const params = useParams();

  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: String(params.boardId),
      isIncludeBoardAddress: true,
    },
    skip: !isEdit,
  });

  const [create_post] = useMutation(CreateBoardDocument);
  const [update_post] = useMutation(UpdateBoardDocument);
  const [upload_file] = useMutation(UploadBoardFileDocument);
  const [inputStates, setInputStates] = useState({
    writer: "",
    title: "",
    password: "",
    contents: "",
  });

  const [isWriter, setIsWriter] = useState<boolean>(true);
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [isTitle, setIsTitle] = useState<boolean>(true);
  const [isContents, setIsContents] = useState<boolean>(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [zoneCode, setZoneCode] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [imageUrls, setImageUrls] = useState(["", "", ""]);

  const isChanged =
    inputStates.title !== data?.fetchBoard?.title ||
    inputStates.contents !== data?.fetchBoard?.contents ||
    zoneCode !== (data?.fetchBoard?.boardAddress?.zipcode ?? "") ||
    addressDetail !== (data?.fetchBoard?.boardAddress?.addressDetail ?? "") ||
    youtubeUrl !== (data?.fetchBoard?.youtubeUrl ?? "") ||
    imageUrls.some(
      (url, index) => url !== (data?.fetchBoard?.images?.[index] ?? ""),
    );

  const handleGetPostCode = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = "";
    let zoneCode = data.zonecode;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress);
    setZoneCode(zoneCode);
    setIsModalOpen(false);
  };

  const handleChangeInput = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setInputStates({
      ...inputStates,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormAddressDetail = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAddressDetail(event.target.value);
  };

  const handleFormYoutube = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const handleSubmit = async () => {
    if (inputStates.writer) {
      setIsWriter(true);
    } else {
      setIsWriter(false);
    }
    if (inputStates.password) {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }
    if (inputStates.title) {
      setIsTitle(true);
    } else {
      setIsTitle(false);
    }
    if (inputStates.contents) {
      setIsContents(true);
    } else {
      setIsContents(false);
    }

    if (
      inputStates.writer &&
      inputStates.password &&
      inputStates.title &&
      inputStates.contents
    ) {
      try {
        const variables = buildCreateBoardInput();
        const result = await create_post({
          variables: {
            ...variables,
          },
        });
        router.push(`/mytrip/boards/${result.data?.createBoard._id}`);
      } catch (error) {
        alert("에러가 발생하였습니다. 다시 시도해 주세요.");
      }
    }
  };

  const buildBoardAddressInput = () => {
    return {
      zipcode: zoneCode,
      address,
      addressDetail,
    };
  };

  const buildCreateBoardInput = () => {
    const createAddressInput = buildBoardAddressInput();
    return {
      ...inputStates,
      boardAddress: {
        ...createAddressInput,
      },
      youtubeUrl,
      images: imageUrls ? imageUrls : [],
    };
  };

  const handleCancelEdit = () => {
    router.push(isEdit ? `/mytrip/boards/${params.boardId}` : "/mytrip/boards");
  };

  const handleFileFileBox = (target: string) => {
    const targetInput = document.getElementById(target) as HTMLInputElement;
    if (!targetInput) return;
    targetInput.click();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = event.target.files?.[0];
    if (file && file.size > 5 * 1024 * 1024) {
      Modal.warn({
        title: "파일 크기 초과",
        content: "5MB 이하의 파일만 업로드 가능합니다.",
      });
      return;
    }
    if (file === undefined) return;
    const { data } = await upload_file({
      variables: {
        file,
      },
    });

    setImageUrls((prev) => {
      const image = [...prev];
      image[index] = data?.uploadFile?.url ?? "";
      return image;
    });
  };

  const handleDeleteImage = (index: number) => {
    setImageUrls((prev) => {
      const image = [...prev];
      image[index] = "";
      return image;
    });
  };

  const buildUpdateBoardInput = () => {
    const nextInput: IUpdateBoardInput = {};
    const nextAddress: IUpdateBoardInput["boardAddress"] = {};
    const isImageChanged = imageUrls.some(
      (url, index) => url !== (data?.fetchBoard?.images?.[index] ?? ""),
    );

    if (inputStates.title !== data?.fetchBoard?.title) {
      nextInput.title = inputStates.title;
    }
    if (inputStates.contents !== data?.fetchBoard?.contents) {
      nextInput.contents = inputStates.contents;
    }

    if (zoneCode !== data?.fetchBoard?.boardAddress?.zipcode) {
      nextAddress.zipcode = zoneCode;
      nextAddress.address = address;
    }

    if (addressDetail !== data?.fetchBoard?.boardAddress?.addressDetail) {
      nextAddress.addressDetail = addressDetail;
    }

    if (youtubeUrl !== data?.fetchBoard?.youtubeUrl) {
      nextInput.youtubeUrl = youtubeUrl;
    }

    if (isImageChanged) {
      nextInput.images = imageUrls;
    }

    if (Object.keys(nextAddress).length > 0) {
      nextInput.boardAddress = nextAddress;
    }

    return nextInput;
  };

  const handleEdit = async () => {
    const updateBoardInput = buildUpdateBoardInput();

    const getPassword = prompt(
      "글을 입력할때 입력하셨던 비밀번호를 입력해주세요",
    );
    if (!getPassword) {
      return;
    }
    try {
      await update_post({
        variables: {
          boardId: String(params.boardId),
          updateBoardInput,
          password: getPassword,
        },
        refetchQueries: [FetchBoardDocument],
      });
      Modal.success({
        content: isEdit ? "수정이 완료되었습니다." : "작성이 완료되었습니다.",
        onOk: () => {
          router.push(`/mytrip/boards/${params.boardId}`);
        },
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        const message = error.graphQLErrors[0]?.message;
        Modal.warning({
          content: message ?? "에러가 발생했습니다.",
        });
      }
    }
  };

  useEffect(() => {
    if (data?.fetchBoard) {
      setInputStates({
        writer: data.fetchBoard.writer ?? "",
        title: data.fetchBoard.title ?? "",
        password: "",
        contents: data.fetchBoard.contents ?? "",
      });
      setZoneCode(data.fetchBoard.boardAddress?.zipcode ?? "");
      setAddress(data.fetchBoard.boardAddress?.address ?? "");
      setAddressDetail(data.fetchBoard.boardAddress?.addressDetail ?? "");
      setYoutubeUrl(data.fetchBoard.youtubeUrl ?? "");
      setImageUrls(
        data.fetchBoard.images ?? [
          data.fetchBoard.images?.[0] ?? "",
          data.fetchBoard.images?.[1] ?? "",
          data.fetchBoard.images?.[2] ?? "",
        ],
      );
    }
  }, [data]);

  return {
    inputStates,
    handleChangeInput,
    handleSubmit,
    handleEdit,
    isModalOpen,
    handleGetPostCode,
    handleOk,
    handleCancel,
    handleComplete,
    handleCancelEdit,
    handleFileFileBox,
    handleFileUpload,
    handleDeleteImage,
    imageUrls,
    address,
    zoneCode,
    addressDetail,
    handleFormAddressDetail,
    handleFormYoutube,
    youtubeUrl,
    isChanged,
    isWriter,
    isPassword,
    isTitle,
    isContents,
  };
};
