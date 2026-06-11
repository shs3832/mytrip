"use client";
import { useState } from "react";

export default function JestUnitTestPage() {
  const [count, setCount] = useState(0);

  const onClickCountUp = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <div role="count">{count}</div>
      <button role="count-button" onClick={onClickCountUp}>
        카운트 올리기!!!
      </button>
    </>
  );
}
