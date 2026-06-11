"use client";

import OpenApisComponent from "@/components/openapis-list";
import { Suspense } from "react";
function OpenApisPageContents() {
  return (
    <>
      <OpenApisComponent />
    </>
  );
}

export default function OpenApisPage() {
  return (
    <>
      <Suspense fallback={null}>
        <OpenApisPageContents />
      </Suspense>
    </>
  );
}
