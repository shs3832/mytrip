"use client";
import {
  DeleteOutlined,
  EnterOutlined,
  LinkOutlined,
  PushpinOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input, Button } from "antd";
const { TextArea } = Input;
export default function ProductDetailPage() {
  return (
    <>
      <div className="flex items-center w-full mb-2">
        <div className="text-2xl font-bold">숙박권 상세페이지</div>
        <div className="ml-auto flex items-center gap-2">
          <button className="flex items-center w-6 h-6 text-gray-800 text-sm">
            <DeleteOutlined />
          </button>
          <button className="flex items-center w-6 h-6 text-gray-800 text-sm">
            <LinkOutlined />
          </button>
          <button className="flex items-center w-6 h-6 text-gray-800 text-sm">
            <PushpinOutlined />
          </button>
          <div className="flex items-center py-1 px-2 text-white shadow-md text-sm bg-black bg-opacity-40 rounded-lg">
            <TagOutlined />
            <span className="ml-1">24</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-gray-600 text-base font-medium">
          모던한 분위기의 감도높은 숙소
        </p>
        <div className="tags">
          <span className="text-blue-500 text-base font-medium">#6인 이하</span>
        </div>
      </div>
      <div className="flex w-full items-start gap-10">
        <div className="flex w-full flex-col">
          <div className="flex items-start gap-10">
            <div className="rounded-lg">이미지</div>
            <div className="flex flex-col">
              <div className="w-[180px] h-[136px] rounded-lg">썸네일</div>
              <div className="w-[180px] h-[136px] rounded-lg">썸네일</div>
            </div>
          </div>
          <div className="border-t border-gray-300 mt-10 pt-10">
            <h2 className="mb-5 font-bold text-2xl">상세 설명</h2>
            <p>
              살어리 살어리랏다 쳥산(靑山)애 살어리랏다 멀위랑 ᄃᆞ래랑 먹고
              쳥산(靑山)애 살어리랏다 얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라
              새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라
              리얄리 얄라셩 얄라리 얄라 가던 새 가던 새 본다 믈 아래 가던 새
              본다 잉무든 장글란 가지고 믈 아래 가던 새 본다 얄리얄리 얄라셩
              얄라리 얄라 이링공 뎌링공 ᄒᆞ야 나즈란 디내와손뎌 오리도 가리도
              업슨 바므란 ᄯᅩ 엇디 호리라 얄리얄리 얄라셩 얄라리 얄라 어듸라
              더디던 돌코 누리라 마치던 돌코 믜리도 괴리도 업시 마자셔 우니노라
              얄리얄리 얄라셩 얄라리 얄라 살어리 살어리랏다 바ᄅᆞ래 살어리랏다
              ᄂᆞᄆᆞ자기 구조개랑 먹고 바ᄅᆞ래 살어리랏다 얄리얄리 얄라셩 얄라리
              얄라 가다가 가다가 드로라 에졍지 가다가 드로라 사ᄉᆞ미 지ᇝ대예
              올아셔 ᄒᆡ금(奚琴)을 혀거를 드로라 얄리얄리 얄라셩 얄라리 얄라
              가다니 ᄇᆡ브른 도긔 설진 강수를 비조라 조롱곳 누로기 ᄆᆡ와
              잡ᄉᆞ와니 내 엇디 ᄒᆞ리잇고 얄리얄리 얄라셩 얄라리 얄라
            </p>
          </div>

          <div className="border-t border-gray-300 mt-10 pt-10">
            <h2 className="mb-5 font-bold text-2xl">상세 위치</h2>
            <div className="border rounded-lg w-full h-[280px]">123</div>
          </div>
        </div>
        <div className="flex items-center gap-6 ">
          <div className="flex flex-col">
            <div className="border border-gray-300 rounded-lg p-6">
              <strong>32500원</strong>
              <ul>
                <li className="text-gray-600 text-sm mt-2">
                  숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.
                </li>
                <li className="text-gray-600 text-sm mt-2">
                  상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.
                </li>
              </ul>
              <Button type="primary" size="large" className="mt-4 w-full">
                구매하기
              </Button>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 mt-4">
              <strong>판매자</strong>
              <div className="flex items-center gap-1 mt-1">
                <div>
                  <UserOutlined />
                </div>
                <div className="text-gray-600 text-sm ml-1">판매자 이름</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="mb-5 text-base">문의하기</h2>
        <div className="flex flex-col gap-4">
          <TextArea
            placeholder="문의 내용을 입력해주세요."
            rows={4}
            className="w-full h-24 border border-gray-300 rounded-lg p-2"
          />
          <Button type="primary" size="large" className="ml-auto">
            문의하기
          </Button>
        </div>

        <div className="mt-10">
          <div className="comment-card mb-5 pb-5 border-b border-gray-200">
            <div>
              <div className="comment-header flex items-center">
                <div className="profile-info flex items-center mt-2">
                  <span className="block w-full h-full rounded-[50%]">
                    <UserOutlined />
                  </span>
                  <span className="text-sm text-gray-700 ml-1 shrink-0">
                    asdasd
                  </span>
                </div>
                <div className="comment-btns ml-auto flex items-center gap-2">
                  <button>수정</button>
                  <button>삭제</button>
                </div>
              </div>
              <div className="comment-body text-base mt-2 text-gray-800">
                asdasd
              </div>
              <p className="comment-date text-xs mt-2 text-gray-700">
                2026.01.01
              </p>
            </div>
            <div className="pl-5 mt-4">
              <div className="flex items-start gap-4">
                <EnterOutlined className="scale-x-[-1] text-sm self-start mt-1" />
                <div className="w-full">
                  <div className="comment-header flex items-center">
                    <div className="profile-info flex items-center ">
                      <span className="block w-full h-full rounded-[50%]">
                        <UserOutlined />
                      </span>
                      <span className="text-sm text-gray-700 ml-1 shrink-0">
                        asdasd
                      </span>
                    </div>
                    <div className="comment-btns ml-auto flex items-center gap-2">
                      <button>수정</button>
                      <button>삭제</button>
                    </div>
                  </div>
                  <div className="comment-body text-base mt-2 text-gray-800">
                    asdasd
                  </div>
                  <p className="comment-date text-xs mt-2 text-gray-700">
                    2026.01.01
                  </p>

                  <div className="flex flex-col gap-4 mt-4">
                    <TextArea
                      placeholder="답변내용을 입력해 주세요"
                      rows={4}
                      className="w-full h-24 border border-gray-300 rounded-lg p-2"
                    />
                    <div className="flex gap-2 mt-2 justify-end">
                      <Button
                        type="default"
                        color="default"
                        variant="outlined"
                        size="large"
                      >
                        취소
                      </Button>
                      <Button
                        type="default"
                        color="default"
                        variant="solid"
                        size="large"
                      >
                        답변하기
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <TextArea
              placeholder="답변내용을 입력해 주세요"
              rows={4}
              className="w-full h-24 border border-gray-300 rounded-lg p-2"
            />
            <div className="flex gap-2 mt-2 justify-end">
              <Button
                type="default"
                color="default"
                variant="outlined"
                size="large"
              >
                취소
              </Button>
              <Button
                type="default"
                color="default"
                variant="solid"
                size="large"
              >
                답변하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
