"use client";
import { Input, Button, Modal } from "antd";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function ProductAssignPages() {
  const [value, setValue] = useState("");
  return (
    <>
      <h1 className="text-[28px] text-black font-bold pb-4">숙박권 판매하기</h1>
      <div className="product-box border-b border-gray-300 pb-10 mb-10">
        <span className="text-base text-gray-800 flex items-center gap-1 mb-3">
          상품명 <small className="text-red-500">*</small>
        </span>
        <Input size="large" placeholder="상품명" />
      </div>
      <div className="product-box border-b border-gray-300 pb-10 mb-10">
        <span className="text-base text-gray-800 flex items-center gap-1 mb-3">
          한줄 요약 <small className="text-red-500">*</small>
        </span>
        <Input size="large" placeholder="한줄 요약" />
      </div>
      <div className="product-box border-b border-gray-300 pb-10 mb-10">
        <span className="text-base text-gray-800 flex items-center gap-1 mb-3">
          상품설명 <small className="text-red-500">*</small>
        </span>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="내용을 입력해주세요"
          className="h-[300px]"
        />
      </div>
      <div className="product-box border-b border-gray-300 pb-10 mb-10">
        <span className="text-base text-gray-800 flex items-center gap-1 mb-3">
          판매가격 <small className="text-red-500">*</small>
        </span>
        <Input size="large" placeholder="판매가격 (원단위로 입력)" />
      </div>
      <div className="product-box border-b border-gray-300 pb-10 mb-10">
        <span className="text-base text-gray-800 flex items-center gap-1 mb-3">
          태그입력 <small className="text-red-500">*</small>
        </span>
        <Input size="large" placeholder="판매가격 (원단위로 입력)" />
      </div>

      <div className="product-box border-b border-gray-300 pb-10 mb-10 flex items-stretch gap-10">
        <div className="w-1/2">
          <span className="text-base text-gray-800 flex items-center gap-1 mb-3">
            주소 <small className="text-red-500">*</small>
          </span>
          <div className="border-gray-400 w-full">
            <div className="flex items-center gap-2">
              <div>
                <Input size="large" placeholder="12345" readOnly disabled />
              </div>
              <div>
                <Button type="default" size="large">
                  우편번호 검색
                </Button>
              </div>
            </div>
            <div className="mt-2">
              <Input
                size="large"
                placeholder="주소를 입력해주세요"
                readOnly
                disabled
              />
            </div>
            <div className="mt-2">
              <Input size="large" placeholder="상세주소" />
            </div>

            <div className="mt-5">
              <span className="mb-2 block">위도(LAT)</span>
              <Input size="large" placeholder="상세주소" disabled />
            </div>

            <div className="mt-2">
              <span className="mb-2 block">경도(LNG)</span>
              <Input size="large" placeholder="상세주소" disabled />
            </div>
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
                  <p className="text-gray-600">주소를 먼저 입력해 주세요</p>
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
          <div className="bg-gray-100 rounded-lg w-40 h-40">
            <div className="flex items-center justify-center w-full h-full gap-2 flex-col cursor-pointer">
              <span className="text-3xl font-normal w-10 h-10 flex items-center justify-center text-gray-600">
                +
              </span>
              <input type="file" className="hidden" multiple />
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
          type="button"
          className="flex items-center justify-center border border-blue-600 rounded-lg py-3 px-4 font-medium text-base text-white bg-blue-600 disabled:bg-gray-200 disabled:border-gray-200"
        >
          등록하기
        </button>
      </div>
    </>
  );
}
