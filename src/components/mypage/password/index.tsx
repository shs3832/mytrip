import { Input, Button } from "antd";
import { MyPointsUserInfo } from "../myinfo";
import { IMypagePasswordComponents } from "../types";

export function MypageChangePasswordComponents({
  formatNumberWithComma,
  handleChangePassword,
  setNewPassword,
  setCheckPassword,
  data,
  stateCheckInput,
  newPassword,
  checkPassword,
}: IMypagePasswordComponents) {
  return (
    <>
      <div className="pb-10">
        <h1 className="text-[28px] text-black font-bold">마이 페이지</h1>
      </div>

      <MyPointsUserInfo
        data={data}
        formatNumberWithComma={formatNumberWithComma}
      />

      <div className="password mt-10">
        <h3 className="font-bold">비밀번호 변경</h3>
        <div className="flex flex-col gap-4 mt-4">
          <div>
            <span className="flex items-center gap-1">
              새 비밀번호 <small className="text-red-500 self-start">*</small>
            </span>
            <Input.Password
              placeholder="새 비밀번호"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              value={newPassword}
            />
          </div>
          <div>
            <span className="flex items-center gap-1">
              새 비밀번호 확인
              <small className="text-red-500 self-start">*</small>
            </span>
            <Input.Password
              placeholder="새 비밀번호 확인"
              onChange={(e) => {
                setCheckPassword(e.target.value);
              }}
              value={checkPassword}
            />
          </div>
          <Button
            type="primary"
            size="large"
            className="w-auto ml-auto"
            onClick={handleChangePassword}
            disabled={!stateCheckInput}
          >
            비밀번호 변경
          </Button>
        </div>
      </div>
    </>
  );
}
