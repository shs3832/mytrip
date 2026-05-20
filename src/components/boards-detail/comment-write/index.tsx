import { Modal, Rate } from "antd";
import useBoardCommentWrite from "@/components/boards-detail/comment-write/hook";
import { ApolloError, useMutation } from "@apollo/client";
import { useEffect } from "react";
import {
  FetchBoardCommentsDocument,
  UpdateBoardCommentDocument,
} from "./queries";
import { IBoardCommentWriteProps } from "@/components/boards-detail/comment-write/types";
import { useParams } from "next/navigation";

export default function BoardCommentWrite({
  isCommentEdit = false,
  setIsCommentEdit,
  el,
}: IBoardCommentWriteProps) {
  const {
    writer,
    password,
    contents,
    rating,
    setWriter,
    setPassword,
    setContents,
    setRating,
    isContentsEmpty,
    isWriterEmpty,
    isPasswordEmpty,
    isSubmitted,
    setIsContentsEmpty,
    setIsPasswordEmpty,
    setIsWriterEmpty,
    handleWriteComment,
    handleRate,
  } = useBoardCommentWrite();
  const params = useParams();
  const [comment_update] = useMutation(UpdateBoardCommentDocument);
  const handleCommentEdit = async () => {
    if (el === undefined) return;

    try {
      await comment_update({
        variables: {
          updateBoardCommentInput: {
            contents: contents,
            rating: rating,
          },
          password: password,
          boardCommentId: el._id,
        },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: {
              page: 1,
              boardId: String(params.boardId),
            },
          },
        ],
      });
      Modal.success({
        content: "댓글이 수정되었습니다.",
      });
      setIsCommentEdit?.(false);
    } catch (error) {
      if (error instanceof ApolloError) {
        const message = error.graphQLErrors[0]?.message;
        Modal.error({
          content: message ?? "에러가 발생했습니다.",
        });
      }
    }
  };

  const handleEditCommentCancel = () => {
    setIsCommentEdit?.(false);
  };

  useEffect(() => {
    if (isCommentEdit && el !== undefined) {
      setContents(el.contents);
      setWriter(el.writer ?? "");
      setRating(el.rating);
    }
  }, [el, isCommentEdit]);

  return (
    <>
      <div
        className={!isCommentEdit ? "mt-6 pt-6 border-t border-gray-200" : ""}
      >
        <h2 className="font-bold text-base text-black">댓글</h2>
        <div className="flex items-center gap-1 mt-6">
          <Rate onChange={handleRate} defaultValue={3} value={rating} />
        </div>

        <div className="flex items-start w-1/2 gap-5 mt-6 pb-10">
          <div className="border-gray-400 w-1/2">
            <label className="flex items-center gap-1 mb-1 font-medium text-base leading-6 text-gray-800">
              작성자
              <span className="text-red-500 text-base font-medium">*</span>
            </label>
            <input
              type="text"
              className="border rounded-lg p-3 w-full border-gray-400 leading-6 text-base placeholder:text-gray-400 disabled:bg-gray-200 disabled:border-gray-200"
              placeholder="작성자 명을 입력해 주세요"
              autoComplete="off"
              onChange={(event) => {
                setWriter(event?.target.value);
                if (event.target.value.length === 0) {
                  setIsWriterEmpty(false);
                } else {
                  setIsWriterEmpty(true);
                }
              }}
              disabled={isCommentEdit}
              value={writer}
            />
            {isSubmitted && !isWriterEmpty && (
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
              autoComplete="off"
              onChange={(event) => {
                setPassword(event?.target.value);
                if (event.target.value.length === 0) {
                  setIsPasswordEmpty(false);
                } else {
                  setIsPasswordEmpty(true);
                }
              }}
              value={password}
            />
            {isSubmitted && !isPasswordEmpty && (
              <p className="text-red-500 text-base leading-6 font-medium mt-2">
                필수입력 사항 입니다.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center w-full pb-10 ">
          <div className="border-gray-400 w-full">
            <label className="flex items-center gap-1 mb-1 font-medium text-base leading-6 text-gray-800">
              내용
              <span className="text-red-500 text-base font-medium">*</span>
            </label>
            <div className="flex flex-col border rounded-lg py-3 px-4 w-full h-full border-gray-400 ">
              <textarea
                className="block leading-6 text-base placeholder:text-gray-400 w-full h-full"
                placeholder="내용을 입력해 주세요"
                onChange={(event) => {
                  setContents(event?.target.value);
                  if (event.target.value.length === 0) {
                    setIsContentsEmpty(false);
                  } else {
                    setIsContentsEmpty(true);
                  }
                }}
                value={contents}
              />
              <p className="self-end text-base text-gray-400 font-medium">
                <span className="text-black font-bold">{contents.length}</span>
                /100
              </p>
            </div>

            {isSubmitted && !isContentsEmpty && (
              <p className="text-red-500 text-base leading-6 font-medium mt-2">
                필수입력 사항 입니다.
              </p>
            )}
          </div>
          <div className="self-end flex items-center items-center gap-4 mt-6">
            {isCommentEdit && (
              <button
                type="button"
                className="border rounded-lg py-3 px-4 border-black font-medium text-base text-black"
                onClick={handleEditCommentCancel}
              >
                취소
              </button>
            )}
            <button
              type="button"
              className="border border-blue-600 rounded-lg py-3 px-4 font-medium text-base text-white bg-blue-600 disabled:bg-gray-200 disabled:border-gray-200"
              onClick={isCommentEdit ? handleCommentEdit : handleWriteComment}
            >
              {isCommentEdit ? "댓글 수정" : "댓글 등록"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
