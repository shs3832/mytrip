"use client";

import { LoginComponentPage } from "@/components/login";
import { useLoginHook } from "@/components/login/hook";
import { Suspense } from "react";

function LoginPageContents() {
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
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContents />
    </Suspense>
  );
}
