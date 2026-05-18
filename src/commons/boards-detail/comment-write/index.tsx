import useBoardCommentWrite from "./hook";

export default function BoardCommentWrite() {
  const {
    writer,
    password,
    contents,
    setWriter,
    setPassword,
    setContents,
    isContentsEmpty,
    isWriterEmpty,
    isPasswordEmpty,
    setIsContentsEmpty,
    setIsPasswordEmpty,
    setIsWriterEmpty,
    handleWriteComment,
  } = useBoardCommentWrite();
  return (
    <>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h2 className="font-bold text-base text-black">댓글</h2>
        <div className="flex items-center gap-1 mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 fill-gray-300"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 fill-gray-300"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 fill-gray-300"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 fill-gray-300"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 fill-gray-300"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
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
              value={writer}
            />
            {!isWriterEmpty && (
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
            {!isPasswordEmpty && (
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

            {!isContentsEmpty && (
              <p className="text-red-500 text-base leading-6 font-medium mt-2">
                필수입력 사항 입니다.
              </p>
            )}
          </div>

          <button
            type="button"
            className="self-end flex items-center justify-center border border-blue-600 mt-6 rounded-lg py-3 px-4 font-medium text-base text-white bg-blue-600 disabled:bg-gray-200 disabled:border-gray-200"
            onClick={handleWriteComment}
          >
            댓글 등록
          </button>
        </div>
      </div>
    </>
  );
}
