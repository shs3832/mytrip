import { useEffect, useState } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
} from "../graphql/graphql";
import { IUpdateBoardInput } from "@/commons/boards-write/types";
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

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

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

  const handleFormWriter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const handleFormPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFormTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFormAddressDetail = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAddressDetail(event.target.value);
  };

  const handleFormYoutube = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const handleFormContents = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContents(event.target.value);
  };

  const handleSubmit = async () => {
    if (writer) {
      setIsWriter(true);
    } else {
      setIsWriter(false);
    }
    if (password) {
      setIsPassword(true);
    } else {
      setIsPassword(false);
    }
    if (title) {
      setIsTitle(true);
    } else {
      setIsTitle(false);
    }
    if (contents) {
      setIsContents(true);
    } else {
      setIsContents(false);
    }

    if (writer && password && title && contents) {
      try {
        const result = await create_post({
          variables: {
            writer,
            password,
            title,
            contents,
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
    router.push(`../${params.boardId}`);
  };

  const updateBoardInput: IUpdateBoardInput = {};
  const updateBoardAddress: NonNullable<IUpdateBoardInput["boardAddress"]> = {};
  const handleEdit = async () => {
    if (title !== data?.fetchBoard?.title) {
      updateBoardInput.title = title;
    }
    if (contents !== data?.fetchBoard?.contents) {
      updateBoardInput.contents = contents;
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
    title !== data?.fetchBoard?.title ||
    contents !== data?.fetchBoard?.contents ||
    zoneCode !== (data?.fetchBoard?.boardAddress?.zipcode ?? "") ||
    addressDetail !== (data?.fetchBoard?.boardAddress?.addressDetail ?? "") ||
    youtubeUrl !== (data?.fetchBoard?.youtubeUrl ?? "");

  useEffect(() => {
    if (data?.fetchBoard) {
      setWriter(data.fetchBoard.writer ?? "");
      setTitle(data.fetchBoard.title ?? "");
      setContents(data.fetchBoard.contents ?? "");
      setZoneCode(data.fetchBoard.boardAddress?.zipcode ?? "");
      setAddress(data.fetchBoard.boardAddress?.address ?? "");
      setAddressDetail(data.fetchBoard.boardAddress?.addressDetail ?? "");
      setYoutubeUrl(data.fetchBoard.youtubeUrl ?? "");
    }
  }, [data]);

  return {
    handleFormWriter,
    handleFormPassword,
    handleFormTitle,
    handleFormContents,
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
    writer,
    password,
    title,
    contents,
  };
};
