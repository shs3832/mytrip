"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

const CREATE_POST = gql`
  mutation createBoard(
    $writer: String
    $password: String
    $title: String!
    $contents: String!
  ) {
    createBoard(
      createBoardInput: {
        writer: $writer
        password: $password
        title: $title
        contents: $contents
      }
    ) {
      _id
      writer
      title
      contents
    }
  }
`;

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
      likeCount
      dislikeCount
      images
      youtubeUrl
    }
  }
`;

const UPDATE_BOARD = gql`
  mutation updateBoard(
    $updateBoardInput: UpdateBoardInput!
    $password: String
    $boardId: ID!
  ) {
    updateBoard(
      updateBoardInput: $updateBoardInput
      password: $password
      boardId: $boardId
    ) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function BoardWriteComponent({ isEdit }) {
  const router = useRouter();
  const params = useParams();
  // console.log(data);

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.boardId,
    },
    skip: !isEdit,
  });

  const [create_post] = useMutation(CREATE_POST);
  const [update_post] = useMutation(UPDATE_BOARD);

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
      console.log("게시글이 입력가능한 상태입니다");
      try {
        const result = await create_post({
          variables: {
            writer,
            password,
            title,
            contents,
          },
        });
        console.log(result);
        router.push(`../boards/${result.data?.createBoard._id}`);
      } catch (error) {
        console.log(error);

        alert("에러가 발생하였습니다. 다시 시도해 주세요.");
      }
    }
  };
  const updateBoardInput = {};
  const handleEdit = async () => {
    if (title !== data?.fetchBoard?.title) {
      updateBoardInput.title = title;
    }
    if (contents !== data?.fetchBoard?.contents) {
      updateBoardInput.contents = contents;
    }

    console.log(updateBoardInput);
    const getPassword = prompt(
      "글을 입력할때 입력하셨던 비밀번호를 입력해주세요",
    );
    if (!getPassword) {
      return;
    }
    try {
      const result = await update_post({
        variables: {
          boardId: params.boardId,
          updateBoardInput: {
            ...updateBoardInput,
          },
          password: getPassword,
        },
      });
      console.log(result);
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
  console.log(isChanged);

  useEffect(() => {
    if (data?.fetchBoard) {
      setWriter(data.fetchBoard.writer ?? "");
      setTitle(data.fetchBoard.title ?? "");
      setContents(data.fetchBoard.contents ?? "");
    }
  }, [data]);

  return (
    <div className="relative">
      <div className="">
        <h1 className="font-bold text-xl mb-10">
          게시물 {isEdit ? "수정" : "등록"}
        </h1>

        <div className="flex border-b items-start w-full gap-10 pb-10 mb-10">
          <div className="border-gray-400 w-1/2">
            <label className="flex items-center gap-1 mb-1 font-medium text-base leading-6 text-gray-800">
              작성자
              <span className="text-red-500 text-base font-medium">*</span>
            </label>
            <input
              type="text"
              className="border rounded-lg p-3 w-full border-gray-400 leading-6 text-base placeholder:text-gray-400 disabled:bg-gray-200 disabled:border-gray-200"
              placeholder="작성자 명을 입력해 주세요"
              onChange={handleFormWriter}
              value={writer}
              disabled={isEdit}
            />
            {!isWriter && (
              <p className="text-red-500 text-base leading-6 font-medium mt-2">
                필수입력 사항 입니다.
              </p>
            )}
          </div>

          <div className=" border-gray-400 w-1/2">
            <label className="flex items-center gap-1 mb-1 font-medium text-base leading-6 text-gray-800">
              비밀번호
              <span className="text-red-500 text-base font-medium">*</span>
            </label>
            <input
              type="password"
              className="border rounded-lg p-3 w-full border-gray-400 leading-6 text-base placeholder:text-gray-400 disabled:bg-gray-200 disabled:border-gray-200"
              placeholder="비밀번호를 입력해 주세요"
              onChange={handleFormPassword}
              disabled={isEdit}
              value={password}
            />
            {!isPassword && (
              <p className="text-red-500 text-base leading-6 font-medium mt-2">
                필수입력 사항 입니다.
              </p>
            )}
          </div>
        </div>

        <div className="flex border-b items-center w-full gap-10 pb-10 mb-10">
          <div className="border-gray-400 w-full">
            <label className="flex items-center gap-1 mb-1 font-medium text-base leading-6 text-gray-800">
              제목
              <span className="text-red-500 text-base font-medium">*</span>
            </label>
            <input
              type="text"
              className="border rounded-lg p-3 w-full border-gray-400 leading-6 text-base placeholder:text-gray-400"
              placeholder="제목을 입력해 주세요"
              onChange={handleFormTitle}
              value={title}
            />

            {!isTitle && (
              <p className="text-red-500 text-base leading-6 font-medium mt-2">
                필수입력 사항 입니다.
              </p>
            )}
          </div>
        </div>

        <div className="flex border-b items-center w-full gap-10 pb-10 mb-10">
          <div className="border-gray-400 w-full">
            <label className="flex items-center gap-1 mb-1 font-medium text-base leading-6 text-gray-800">
              내용
              <span className="text-red-500 text-base font-medium">*</span>
            </label>
            <textarea
              className="border rounded-lg p-3 w-full min-h-80 border-gray-400 leading-6 text-base placeholder:text-gray-400"
              placeholder="내용을 입력해 주세요"
              onChange={handleFormContents}
              value={contents}
            />
            {!isContents && (
              <p className="text-red-500 text-base leading-6 font-medium mt-2">
                필수입력 사항 입니다.
              </p>
            )}
          </div>
        </div>

        <div className="flex border-b items-center w-full gap-10 pb-10 mb-10">
          <div className="border-gray-400 w-full">
            <label className="flex items-center gap-1 mb-1 font-medium text-base leading-6 text-gray-800">
              주소
            </label>
            <div className="flex items-center gap-2">
              <div>
                <input
                  type="text"
                  className="border rounded-lg p-3 w-20 border-gray-400 leading-6 text-base placeholder:text-gray-400"
                  placeholder="12345"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="border rounded-lg p-3 border-black font-medium text-base text-black"
                >
                  우편번호 검색
                </button>
              </div>
            </div>
            <div className="mt-2">
              <input
                type="text"
                className="border rounded-lg p-3 w-full border-gray-400 leading-6 text-base placeholder:text-gray-400"
                placeholder="주소를 입력해주세요"
              />
            </div>
            <div className="mt-2">
              <input
                type="text"
                className="border rounded-lg p-3 w-full border-gray-400 leading-6 text-base placeholder:text-gray-400"
                placeholder="상세주소"
              />
            </div>
          </div>
        </div>

        <div className="flex border-b items-center w-full gap-10 pb-10 mb-10">
          <div className="border-gray-400 w-full">
            <label className="flex items-center gap-1 mb-1 font-medium text-base leading-6 text-gray-800">
              유튜브 링크
            </label>
            <input
              type="text"
              className="border rounded-lg p-3 w-full border-gray-400 leading-6 text-base placeholder:text-gray-400"
              placeholder="링크를 입력해 주세요"
            />
          </div>
        </div>

        <div className="flex items-center w-full gap-10 ">
          <div className="border-gray-400 w-full">
            <label className="flex items-center gap-1 mb-1 font-medium text-base leading-6 text-gray-800">
              사진첨부
            </label>
            <div className="mt-2 flex items-center gap-3">
              <div className="bg-gray-100 rounded-lg w-40 h-40">
                <div className="flex items-center justify-center w-full h-full gap-2 flex-col cursor-pointer">
                  <span className="text-3xl font-normal w-10 h-10 block flex items-center justify-center text-gray-600">
                    +
                  </span>
                  <p className="text-gray-600">클릭해서 사진 업로드</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg w-40 h-40">
                <div className="flex items-center justify-center w-full h-full gap-2 flex-col cursor-pointer">
                  <span className="text-3xl font-normal w-10 h-10 block flex items-center justify-center text-gray-600">
                    +
                  </span>
                  <p className="text-gray-600">클릭해서 사진 업로드</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg w-40 h-40">
                <div className="flex items-center justify-center w-full h-full gap-2 flex-col cursor-pointer">
                  <span className="text-3xl font-normal w-10 h-10 block flex items-center justify-center text-gray-600">
                    +
                  </span>
                  <p className="text-gray-600">클릭해서 사진 업로드</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end mt-10 gap-3">
          <button
            type="button"
            className="flex items-center justify-center border rounded-lg py-3 px-4 box-border border-black font-medium text-base text-black"
          >
            취소
          </button>
          <button
            type="button"
            className="flex items-center justify-center border border-blue-600 rounded-lg py-3 px-4 font-medium text-base text-white bg-blue-600 disabled:bg-gray-200 disabled:border-gray-200"
            onClick={isEdit ? handleEdit : handleSubmit}
            disabled={isEdit && !isChanged}
          >
            {isEdit ? "수정하기" : "등록하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
