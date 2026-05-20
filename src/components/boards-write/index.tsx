"use client";
import { useBoardWrite } from "@/components/boards-write/hook";

import { Modal } from "antd";
import KakaoPostcodeEmbed from "react-daum-postcode";

export default function BoardWriteComponent({ isEdit }: { isEdit: boolean }) {
  const {
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
    address,
    zoneCode,
    addressDetail,
    handleFormAddressDetail,
    handleFormYoutube,
    handleCancelEdit,
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
  } = useBoardWrite({ isEdit });

  return (
    <div className="relative">
      <Modal
        title="주소검색"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnHidden
      >
        {isModalOpen && <KakaoPostcodeEmbed onComplete={handleComplete} />}
      </Modal>
      <div>
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
              autoComplete="off"
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
              autoComplete="off"
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
                  value={zoneCode}
                  readOnly
                />
              </div>
              <div>
                <button
                  type="button"
                  className="border rounded-lg p-3 border-black font-medium text-base text-black"
                  onClick={handleGetPostCode}
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
                value={address}
                readOnly
              />
            </div>
            <div className="mt-2">
              <input
                type="text"
                className="border rounded-lg p-3 w-full border-gray-400 leading-6 text-base placeholder:text-gray-400"
                placeholder="상세주소"
                onChange={handleFormAddressDetail}
                value={addressDetail}
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
              onChange={handleFormYoutube}
              value={youtubeUrl}
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
            onClick={handleCancelEdit}
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
