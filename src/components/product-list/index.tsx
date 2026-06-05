import { TagOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input } from "antd";
import {
  CalendarOutlined,
  EditOutlined,
  SearchOutlined,
  UserOutlined,
  ApartmentOutlined,
  BankOutlined,
  FlagOutlined,
  CustomerServiceOutlined,
  FireOutlined,
  MedicineBoxOutlined,
  HomeOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import React from "react";

const { RangePicker } = DatePicker;
function ProductMainListComponent() {
  return (
    <>
      <h2 className="font-bold text-2xl">2026 여름의 시작</h2>

      <div className="flex items-center gap-x-5 mt-5">
        <div className="rounded-xl overflow-hidden">
          <div className="relative">
            <div
              className="relative 
            after:content-[''] after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-gradient-to-t after:to-transparent after:from-black after:opacity-50"
            >
              <img src="/images/product-01.png" />
            </div>
            <div className="absolute top-6 right-6">
              <div className="flex items-center py-1 px-2 text-white shadow-md text-sm bg-black bg-opacity-40 rounded-lg cursor-pointer">
                <TagOutlined />
                <span className="ml-1">10</span>
              </div>
            </div>
            <div className="absolute bottom-0 w-full p-6">
              <h3 className="text-2xl text-white font-bold">
                포항 : 당장 가고 싶은 숙소
              </h3>
              <p className="text-xl overflow-hidden text-ellipsis font-bold text-nowrap text-white mt-1">
                살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
                쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라
                새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러
                우니로라얄리얄리 얄라셩 얄라리 얄라
              </p>
              <p className="text-right mt-2 text-2xl text-white font-bold">
                32,900원
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden">
          <div className="relative">
            <div
              className="relative 
            after:content-[''] after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-gradient-to-t after:to-transparent after:from-black after:opacity-50"
            >
              <img src="/images/product-02.png" />
            </div>
            <div className="absolute top-6 right-6">
              <div className="flex items-center py-1 px-2 text-white shadow-md text-sm bg-black bg-opacity-40 rounded-lg cursor-pointer">
                <TagOutlined />
                <span className="ml-1">10</span>
              </div>
            </div>
            <div className="absolute bottom-0 w-full p-6">
              <h3 className="text-2xl text-white font-bold">
                강름 : 마음까지 깨끗해지는 하얀 숙소
              </h3>
              <p className="text-xl overflow-hidden text-ellipsis font-bold text-nowrap text-white mt-1">
                살어리 살어리랏다 강릉에 평생 살어리랏다
              </p>
              <p className="text-right mt-2 text-2xl text-white font-bold">
                32,900원
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex h-[300px] overflow-hidden rounded-2xl bg-[#d6d4bd]">
        <div className="relative w-[42%] h-full">
          <img
            src="/images/product-banner-01.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-[#d6d4bd]" />
        </div>
        <div className="flex flex-1 flex-col items-end justify-center pr-16">
          <div className="mb-4 flex gap-3">
            <span className="rounded-md bg-[#aaa789] text-[18px] px-4 py-2 text-white font-semibold">
              슬로트립 독점 숙소
            </span>
            <span className="rounded-md bg-[#aaa789] text-[18px] px-4 py-2 text-white font-semibold">
              9.24 얼리버드 오픈 예약
            </span>
          </div>

          <h2 className="text-right text-4xl font-bold leading-tight text-black">
            천만 관객이 사랑한
            <br />빌 페소 르꼬 전시회 근처 숙소 특가 예약
          </h2>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="mb-8 text-3xl font-bold text-black">
          여기에서만 예약할 수 있는 숙소
        </h2>

        <div className="mb-7 flex items-center gap-5">
          <Button
            type="primary"
            className="h-11 rounded-lg bg-black px-6 text-base font-semibold"
          >
            예약 가능 숙소
          </Button>

          <Button
            type="text"
            className="h-11 px-6 text-base font-medium text-gray-600"
          >
            예약 마감 숙소
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <RangePicker
            className="h-12 w-[340px] rounded-lg bg-gray-100 px-4"
            placeholder={["YYYY . MM . DD", "YYYY . MM . DD"]}
            suffixIcon={<CalendarOutlined className="text-lg text-gray-500" />}
          />

          <Input
            className="h-12 flex-1 rounded-lg bg-gray-100 px-4 text-base"
            placeholder="제목을 검색해 주세요."
            prefix={<SearchOutlined className="mr-2 text-xl text-black" />}
          />

          <Button
            type="primary"
            className="h-12 rounded-lg bg-black px-7 text-base font-semibold"
          >
            검색
          </Button>

          <Button
            type="primary"
            icon={<EditOutlined />}
            className="ml-auto h-12 rounded-lg bg-blue-500 px-7 text-base font-semibold"
          >
            숙박권 판매하기
          </Button>
        </div>
      </section>

      <main className="mt-14">
        <section className="mb-10 flex items-center justify-between">
          <button className="flex flex-col items-center gap-2 text-gray-800">
            <UserOutlined className="text-3xl" />
            <span className="text-sm font-medium">1인 전용</span>
          </button>

          <button className="flex flex-col items-center gap-2 text-gray-800">
            <ApartmentOutlined className="text-3xl" />
            <span className="text-sm font-medium">아파트</span>
          </button>

          <button className="flex flex-col items-center gap-2 text-gray-800">
            <BankOutlined className="text-3xl" />
            <span className="text-sm font-medium">호텔</span>
          </button>

          <button className="flex flex-col items-center gap-2 text-gray-800">
            <FlagOutlined className="text-3xl" />
            <span className="text-sm font-medium">캠핑</span>
          </button>

          <button className="flex flex-col items-center gap-2 text-gray-800">
            <CustomerServiceOutlined className="text-3xl" />
            <span className="text-sm font-medium">룸 서비스 가능</span>
          </button>

          <button className="flex flex-col items-center gap-2 text-gray-800">
            <FireOutlined className="text-3xl" />
            <span className="text-sm font-medium">불멍</span>
          </button>

          <button className="flex flex-col items-center gap-2 text-gray-800">
            <MedicineBoxOutlined className="text-3xl" />
            <span className="text-sm font-medium">반신욕&스파</span>
          </button>

          <button className="flex flex-col items-center gap-2 text-gray-800">
            <HomeOutlined className="text-3xl" />
            <span className="text-sm font-medium">바다 위 숙소</span>
          </button>

          <button className="flex flex-col items-center gap-2 text-gray-800">
            <AppstoreOutlined className="text-3xl" />
            <span className="text-sm font-medium">플랜테리어</span>
          </button>
        </section>

        <section className="grid grid-cols-4 gap-x-9 gap-y-10">
          <article>
            <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200">
              <img
                src="/images/product-01.png"
                alt="숙소 이미지"
                className="h-full w-full object-cover"
              />

              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-black/40 px-2 py-1 text-sm text-white">
                <TagOutlined />
                <span>24</span>
              </div>
            </div>

            <h2 className="mb-1 truncate text-base font-semibold text-gray-900">
              살어리 살어리랏다 청산(靑山)에 살어리랏다...
            </h2>

            <p className="mb-1 truncate text-sm text-gray-500">
              살어리 살어리랏다 청산(靑山)에 살어리랏다멀위랑...
            </p>

            <p className="mb-3 truncate text-sm text-blue-500">
              #6인 이하 #건식 사우나 #애견동반 가능
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <UserOutlined />
                <span>빈안트리</span>
              </div>

              <strong className="text-lg font-bold text-gray-900">
                32,900 원
              </strong>
            </div>
          </article>
        </section>
      </main>

      <aside className="fixed bottom-5 right-5 z-50 w-[96px] rounded-xl border border-gray-300 bg-white p-3 shadow-sm">
        <h2 className="mb-4 text-center text-sm font-semibold text-black">
          최근 본 상품
        </h2>

        <div className="flex flex-col gap-4">
          <button className="overflow-hidden rounded-lg">
            <img
              src="/images/product-01.png"
              alt="최근 본 상품"
              className="h-[72px] w-full object-cover"
            />
          </button>

          <button className="overflow-hidden rounded-lg">
            <img
              src="/images/product-02.png"
              alt="최근 본 상품"
              className="h-[72px] w-full object-cover"
            />
          </button>

          <button className="overflow-hidden rounded-lg">
            <img
              src="/images/product-03.png"
              alt="최근 본 상품"
              className="h-[72px] w-full object-cover"
            />
          </button>
        </div>
      </aside>
    </>
  );
}

export default React.memo(ProductMainListComponent);
