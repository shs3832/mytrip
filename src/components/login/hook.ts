import { ApolloError, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAccessTokenStore } from "@/commons/stores/accessToken";
import { LOGIN_USER } from "@/components/login/quries";

export function useLoginHook() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [login_user] = useMutation(LOGIN_USER);
  const { setAccessToken } = useAccessTokenStore();

  const handleSignUp = () => {
    router.push("/mytrip/signup");
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
      setAccessToken(data.loginUser.accessToken);
      // localStorage.setItem("token", data.loginUser.accessToken);
      // Login hook
      const redirect = searchParams.get("redirect");
      router.push(redirect?.startsWith("/") ? redirect : "/mytrip/boards");
    } catch (error) {
      if (error instanceof ApolloError) {
        const message = error.graphQLErrors[0]?.message;
        Modal.error({
          content: message ?? "에러가 발생했습니다.",
        });
      }
    }
  };
  return {
    handleLogin,
    handleSignUp,
    handleInputChange,
    isValid,
  };
}
