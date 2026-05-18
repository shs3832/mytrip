import { useEffect, useState } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
} from "../graphql/graphql";
import { IUpdateBoardInput } from "@/commons/boards-write/types";

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

  const handleFormWriter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const handleFormPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFormTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
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
          },
        });
        router.push(`../boards/${result.data?.createBoard._id}`);
      } catch (error) {
        alert("에러가 발생하였습니다. 다시 시도해 주세요.");
      }
    }
  };
  const updateBoardInput: IUpdateBoardInput = {};
  const handleEdit = async () => {
    if (title !== data?.fetchBoard?.title) {
      updateBoardInput.title = title;
    }
    if (contents !== data?.fetchBoard?.contents) {
      updateBoardInput.contents = contents;
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
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        const message = error.graphQLErrors[0]?.message;
        alert(message ?? "에러가 발생했습니다.");
      }
    }
  };

  const isChanged =
    title !== data?.fetchBoard?.title ||
    contents !== data?.fetchBoard?.contents;

  useEffect(() => {
    if (data?.fetchBoard) {
      setWriter(data.fetchBoard.writer ?? "");
      setTitle(data.fetchBoard.title ?? "");
      setContents(data.fetchBoard.contents ?? "");
    }
  }, [data]);

  return {
    handleFormWriter,
    handleFormPassword,
    handleFormTitle,
    handleFormContents,
    handleSubmit,
    handleEdit,
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
