"use client";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { Button, Input, Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
    }
  }
`;

export default function SignUpPage() {
  const router = useRouter();
  const [createUser] = useMutation(CREATE_USER);
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [checkPassword, setCheckPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isValid, setIsValid] = useState({
    email: true,
    name: true,
    password: true,
    confirmPassword: false,
  });

  const handleCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCheckPassword(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGoToLogin = () => {
    router.push(`/homework25/login`);
  };

  const handleSubmit = async () => {
    const checkInvalid = {
      email: userData.email.includes("@"),
      name: userData.name !== "",
      password: userData.password !== "",
      confirmPassword:
        checkPassword !== "" && userData.password === checkPassword,
    };

    setIsValid(checkInvalid);

    const isFormValid =
      checkInvalid.email &&
      checkInvalid.name &&
      checkInvalid.password &&
      checkInvalid.confirmPassword;

    if (!isFormValid) return;

    try {
      await createUser({
        variables: {
          createUserInput: userData,
        },
      });

      setUserData({
        email: "",
        name: "",
        password: "",
      });
      setCheckPassword("");
      setIsModalOpen(true);
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
      <Modal
        open={isModalOpen}
        closable={false}
        maskClosable={false}
        footer={[
          <div className="flex justify-center" key="submit">
            <Button
              type="primary"
              className="mx-auto"
              onClick={handleGoToLogin}
            >
              로그인 하기
            </Button>
          </div>,
        ]}
      >
        <p className="font-bold text-base text-center">
          회원가입을 축하드립니다
        </p>
        <div className="text-center flex items-center justify-center my-5">
          <img src="/images/logo.png" />
        </div>
      </Modal>
      <div className="w-[400px] flex-shrink-0 ">
        <div className="join flex items-center flex-col justify-center w-full h-full">
          <h2 className="text-[18px] text-black font-semibold mb-5">
            회원가입
          </h2>
          <p className="text-sm text-gray-800 mb-4">
            회원가입을 위해 아래 빈칸을 모두 채워 주세요.
          </p>

          <div className="text-center px-10 w-full">
            <div>
              <span className="text-sm text-gray-800 mb-2 flex items-center">
                이메일 <small className="text-red-500 text-xs ml-1">*</small>
              </span>
              <Input
                placeholder="아이디를 입력하세요"
                className={`mb-2 ${!isValid.email ? "border-red-500" : ""}`}
                name="email"
                onChange={handleChange}
                value={userData.email}
              />
              {!isValid.email && (
                <p className="text-red-500 text-xs text-left">
                  유효한 이메일 주소를 입력해주세요.
                </p>
              )}
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-800 mb-2 flex items-center">
                이름 <small className="text-red-500 text-xs ml-1">*</small>
              </span>
              <Input
                placeholder="이름을 입력하세요"
                className={`mb-2 ${!isValid.name ? "border-red-500" : ""}`}
                name="name"
                onChange={handleChange}
                value={userData.name}
              />

              {!isValid.name && (
                <p className="text-red-500 text-xs text-left">
                  이름을 입력해주세요.
                </p>
              )}
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-800 mb-2 flex items-center">
                비밀번호 <small className="text-red-500 text-xs ml-1">*</small>
              </span>
              <Input.Password
                placeholder="비밀번호를 입력하세요"
                className={`mb-2 ${!isValid.password ? "border-red-500" : ""}`}
                name="password"
                onChange={handleChange}
                value={userData.password}
              />

              {!isValid.password && (
                <p className="text-red-500 text-xs text-left">
                  비밀번호를 입력해주세요.
                </p>
              )}
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-800 mb-2 flex items-center">
                비밀번호 확인
                <small className="text-red-500 text-xs ml-1">*</small>
              </span>
              <Input.Password
                placeholder="비밀번호 확인을 위해 한번 더 입력해주세요"
                className={`mb-2 ${!isValid.confirmPassword ? "border-red-500" : ""}`}
                name="confirmPassword"
                onChange={handleCheckPassword}
                value={checkPassword}
              />
              {!isValid.confirmPassword && (
                <p className="text-red-500 text-xs text-left">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
            </div>
            <Button
              type="primary"
              size="large"
              className="w-full mt-6"
              onClick={handleSubmit}
            >
              회원가입
            </Button>
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
