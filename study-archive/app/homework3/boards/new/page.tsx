"use client";
import { useState } from "react";

export default function Home() {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isWriter, setIsWriter] = useState<boolean>(true);
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [isTitle, setIsTitle] = useState<boolean>(true);
  const [isContent, setIsContent] = useState<boolean>(true);

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
    setContent(event.target.value);
  };

  const handleSubmit = () => {
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
    if (content) {
      setIsContent(true);
    } else {
      setIsContent(false);
    }

    if (writer && password && title && content) {
      alert("게시글이 입력가능한 상태입니다");
    }
  };

  return (
    <div className="relative">
      <div className="">
        <h1 className="font-bold text-xl mb-10">게시물 등록</h1>

        <div className="flex border-b items-start w-full gap-10 pb-10 mb-10">
          <div className="border-gray-400 w-1/2">
            <label className="flex items-center gap-1 mb-1 font-medium text-base leading-6 text-gray-800">
              작성자
              <span className="text-red-500 text-base font-medium">*</span>
            </label>
            <input
              type="text"
              className="border rounded-lg p-3 w-full border-gray-400 leading-6 text-base placeholder:text-gray-400"
              placeholder="작성자 명을 입력해 주세요"
              onChange={handleFormWriter}
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
              className="border rounded-lg p-3 w-full border-gray-400 leading-6 text-base placeholder:text-gray-400"
              placeholder="비밀번호를 입력해 주세요"
              onChange={handleFormPassword}
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
            />
            {!isContent && (
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
            className="flex items-center justify-center border border-blue-600 rounded-lg py-3 px-4 font-medium text-base text-white bg-blue-600"
            onClick={handleSubmit}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
