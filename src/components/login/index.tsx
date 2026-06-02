import { Button, Input } from "antd";
import Image from "next/image";
import { ILogin } from "./types";
export function LoginComponentPage({
  handleLogin,
  handleSignUp,
  handleInputChange,
  isValid,
}: ILogin) {
  return (
    <>
      <div className="flex h-screen w-full items-stretch ">
        <div className="w-[400px] flex-shrink-0 ">
          <div className="login flex items-center flex-col justify-center w-full h-full">
            <Image
              src="/images/logo-large.png"
              alt="Logo"
              width={120}
              height={80}
            />
            <p className="text-lg font-semibold text-black my-4">
              트립트립에 오신걸 환영합니다.
            </p>

            <div className="text-center px-5">
              <p className="text-sm text-gray-800 mt-6 mb-4">
                트립트립에 로그인 하세요.
              </p>
              <Input
                placeholder="이메일을 입력하세요"
                className={`mb-2 ${!isValid ? "border-red-500" : ""}`}
                name="email"
                onChange={handleInputChange}
              />
              <Input
                placeholder="비밀번호를 입력하세요"
                className={`mb-2 ${!isValid ? "border-red-500" : ""}`}
                type="password"
                name="password"
                onChange={handleInputChange}
              />
              {!isValid && (
                <p className="text-red-500 text-left text-sm">
                  아이디 또는 비밀번호를 확인해 주세요.
                </p>
              )}
              <Button
                type="primary"
                size="large"
                className="w-full mt-6"
                onClick={handleLogin}
              >
                로그인
              </Button>
              <div className="text-sm text-gray-800 mt-6">
                <span className="cursor-pointer" onClick={handleSignUp}>
                  회원가입
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-full">
          <Image
            src="/images/main-visual.png"
            alt="Main Visual"
            width={500}
            height={300}
            objectFit="cover"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </>
  );
}
