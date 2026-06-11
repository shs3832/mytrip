"use client";

import { LoginComponentPage } from "@/components/login";
import { useLoginHook } from "@/components/login/hook";

export default function LoginPage() {
  const { handleLogin, handleSignUp, handleInputChange, isValid } =
    useLoginHook();
  return (
    <>
      <LoginComponentPage
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
        handleInputChange={handleInputChange}
        isValid={isValid}
      />
    </>
  );
}
