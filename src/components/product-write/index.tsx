import { Input, Button, Modal, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Controller } from "react-hook-form";
import KakaoPostcodeEmbed from "react-daum-postcode";

import { IProductWrite } from "@/components/product-write/types";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function ProductWriteComponent({
  onSubmit,
  handleOk,
  handleCancel,
  handleComplete,
  isModalOpen,
  setIsModalOpen,
  control,
  handleSubmit,
  errors,
  address,
  imageFiles,
  handleFileBox,
  handleFileUpload,
  handleDeleteImage,
  isEdit,
  onEdit,
}: IProductWrite) {
  return (
    <>
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
      <h1 className="text-[28px] text-black font-bold pb-4">숙박권 판매하기</h1>
      <form onSubmit={handleSubmit(isEdit ? onEdit : onSubmit)}>
        <div className="product-box border-b border-gray-300 pb-10 mb-10">
          <span className="text-base text-gray-800 flex items-center gap-1 mb-3">
            상품명 <small className="text-red-500">*</small>
          </span>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input size="large" placeholder="상품명" {...field} />
            )}
          />
          <div style={{ color: "red" }}>{errors.name?.message}</div>
        </div>
        <div className="product-box border-b border-gray-300 pb-10 mb-10">
          <span className="text-base text-gray-800 flex items-center gap-1 mb-3">
            한줄 요약 <small className="text-red-500">*</small>
          </span>
          <Controller
            name="remarks"
            control={control}
            render={({ field }) => (
              <Input size="large" placeholder="한줄 요약" {...field} />
            )}
          />
          <div style={{ color: "red" }}>{errors.remarks?.message}</div>
        </div>
        <div className="product-box border-b border-gray-300 pb-10 mb-10">
          <span className="text-base text-gray-800 flex items-center gap-1 mb-3">
            상품설명 <small className="text-red-500">*</small>
          </span>
          <div className="relative [&_.ql-container]:h-[300px]">
            <Controller
              name="contents"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="내용을 입력해주세요"
                />
              )}
            />
          </div>
          <div style={{ color: "red" }}>{errors.contents?.message}</div>
        </div>
        <div className="product-box border-b border-gray-300 pb-10 mb-10">
          <span className="text-base text-gray-800 flex items-center gap-1 mb-3">
            판매가격 <small className="text-red-500">*</small>
          </span>

          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <InputNumber
                size="large"
                placeholder="판매가격 (원단위로 입력)"
                min={0}
                {...field}
              />
            )}
          />
          <div style={{ color: "red" }}>{errors.price?.message}</div>
        </div>
        <div className="product-box border-b border-gray-300 pb-10 mb-10">
          <span className="text-base text-gray-800 flex items-center gap-1 mb-3">
            태그입력
          </span>

          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <Input size="large" placeholder="태그입력" {...field} />
            )}
          />
          <div className="text-blue-500">태그는 콤마로 구분해 입력해주세요</div>
        </div>

        <div className="product-box border-b border-gray-300 pb-10 mb-10 flex items-stretch gap-10">
          <div className="w-1/2">
            <span className="text-base text-gray-800 flex items-center gap-1 mb-3">
              주소 <small className="text-red-500">*</small>
            </span>
            <div className="border-gray-400 w-full">
              <div className="flex items-center gap-2">
                <div>
                  <Controller
                    name="zipcode"
                    control={control}
                    render={({ field }) => (
                      <Input
                        size="large"
                        placeholder="12345"
                        readOnly
                        {...field}
                      />
                    )}
                  />
                </div>
                <div>
                  <Button
                    type="default"
                    size="large"
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    우편번호 검색
                  </Button>
                </div>
              </div>
              <div className="mt-2">
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Input
                      size="large"
                      placeholder="주소를 입력해주세요"
                      readOnly
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mt-2">
                <Controller
                  name="addressDetail"
                  control={control}
                  render={({ field }) => (
                    <Input
                      size="large"
                      placeholder="상세주소를 입력해주세요"
                      {...field}
                    />
                  )}
                />
              </div>

              <div className="mt-5">
                <span className="mb-2 block">위도(LAT)</span>

                <Controller
                  name="lat"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      size="large"
                      className="w-full text-black"
                      readOnly
                      {...field}
                    />
                  )}
                />
              </div>

              <div className="mt-2 ">
                <span className="mb-2 block">경도(LNG)</span>
                <Controller
                  name="lng"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      size="large"
                      className="w-full text-black"
                      readOnly
                      {...field}
                    />
                  )}
                />
              </div>

              <div style={{ color: "red" }}>{errors.zipcode?.message}</div>
            </div>
          </div>

          <div className="w-1/2 flex flex-col">
            <span className="text-base text-gray-800 flex items-center gap-1 mb-3">
              상세위치
            </span>
            <div className="border-gray-400 w-full flex-1">
              <div className="mt-2 flex items-center gap-3 rounded-lg h-full">
                <div className="bg-gray-100 rounded-lg w-full h-full">
                  <div className="flex items-center justify-center w-full h-full gap-2 flex-col">
                    {address ? (
                      <div id="map" className="w-full h-full"></div>
                    ) : (
                      <p className="text-gray-600">주소를 먼저 입력해 주세요</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-box border-b border-gray-300 pb-10 mb-10">
          <span className="text-base text-gray-800 flex items-center gap-1 mb-3">
            사진 첨부
          </span>
          <div className="mt-2 flex items-center gap-3 rounded-lg">
            {imageFiles &&
              imageFiles?.map((file, index) => {
                return (
                  <div
                    className="bg-gray-100 rounded-lg w-40 h-40 group relative overflow-hidden"
                    key={`${file.name}_${index}`}
                  >
                    <div className="flex items-center justify-center w-full h-full gap-2 flex-col cursor-pointer">
                      <img src={file.previewUrl} alt={file.name} />
                    </div>
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-opacity-40 bg-black text-white rounded-full w-6 h-6 items-center justify-center text-xs group-hover:flex hidden"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteImage(index);
                      }}
                    >
                      X
                    </button>
                  </div>
                );
              })}
            <div
              className="bg-gray-100 rounded-lg w-40 h-40 overflow-hidden"
              onClick={() => {
                handleFileBox("attach");
              }}
            >
              <div className="flex items-center justify-center w-full h-full gap-2 flex-col cursor-pointer">
                <span className="text-3xl font-normal w-10 h-10 flex items-center justify-center text-gray-600">
                  +
                </span>
                <input
                  type="file"
                  className="hidden"
                  id="attach"
                  multiple
                  onChange={handleFileUpload}
                  max={5}
                />
                <p className="text-gray-600">클릭해서 사진 업로드</p>
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
            type="submit"
            className="flex items-center justify-center border border-blue-600 rounded-lg py-3 px-4 font-medium text-base text-white bg-blue-600 disabled:bg-gray-200 disabled:border-gray-200"
          >
            등록하기
          </button>
        </div>
      </form>
    </>
  );
}
