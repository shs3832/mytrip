"use client";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { Button, Input, Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

export default function LoginPage() {
  const router = useRouter();
  const [login_user] = useMutation(LOGIN_USER);

  const handleSignUp = () => {
    router.push("/homework24/signup");
  };

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    const inValidCheck = {
      email: userData.email !== "" && userData.email.includes("@"),
      password: userData.password !== "",
    };
    const isSubmit = Object.values(inValidCheck).every((value) => value);
    setIsValid(isSubmit);
    if (!isSubmit) return;
    try {
      const { data } = await login_user({
        variables: {
          email: userData.email,
          password: userData.password,
        },
      });
      localStorage.setItem("token", data.loginUser.accessToken);
      router.push("/homework24/boards");
    } catch (error) {
      if (error instanceof ApolloError) {
        const message = error.graphQLErrors[0]?.message;
        Modal.error({
          content: message ?? "에러가 발생했습니다.",
        });
      }
    }
  };
  return (
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
  );
}
