import { useEffect, useState } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
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
    },
    skip: !isEdit,
  });

  const [create_post] = useMutation(CreateBoardDocument);
  const [update_post] = useMutation(UpdateBoardDocument);

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
        const result = await create_post({
          variables: {
            ...inputStates,
            boardAddress: {
              zipcode: zoneCode,
              address,
              addressDetail,
            },
            youtubeUrl,
          },
        });
        router.push(`../boards/${result.data?.createBoard._id}`);
      } catch (error) {
        alert("에러가 발생하였습니다. 다시 시도해 주세요.");
      }
    }
  };

  const handleCancelEdit = () => {
    router.push(isEdit ? `../${params.boardId}` : "../boards");
  };

  const updateBoardInput: IUpdateBoardInput = {};
  const updateBoardAddress: NonNullable<IUpdateBoardInput["boardAddress"]> = {};

  const handleEdit = async () => {
    if (inputStates.title !== data?.fetchBoard?.title) {
      updateBoardInput.title = inputStates.title;
    }
    if (inputStates.contents !== data?.fetchBoard?.contents) {
      updateBoardInput.contents = inputStates.contents;
    }

    if (zoneCode !== data?.fetchBoard?.boardAddress?.zipcode) {
      updateBoardAddress.zipcode = zoneCode;
      updateBoardAddress.address = address;
    }

    if (addressDetail !== data?.fetchBoard?.boardAddress?.addressDetail) {
      updateBoardAddress.addressDetail = addressDetail;
    }

    if (youtubeUrl !== data?.fetchBoard?.youtubeUrl) {
      updateBoardInput.youtubeUrl = youtubeUrl;
    }

    if (Object.keys(updateBoardAddress).length > 0) {
      updateBoardInput.boardAddress = updateBoardAddress;
    }

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
          updateBoardInput: {
            ...updateBoardInput,
          },
          password: getPassword,
        },
        refetchQueries: [FetchBoardDocument],
      });
      Modal.success({
        content: isEdit ? "수정이 완료되었습니다." : "작성이 완료되었습니다.",
        onOk: () => {
          router.push(`../${params.boardId}`);
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

  const isChanged =
    inputStates.title !== data?.fetchBoard?.title ||
    inputStates.contents !== data?.fetchBoard?.contents ||
    zoneCode !== (data?.fetchBoard?.boardAddress?.zipcode ?? "") ||
    addressDetail !== (data?.fetchBoard?.boardAddress?.addressDetail ?? "") ||
    youtubeUrl !== (data?.fetchBoard?.youtubeUrl ?? "");

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
