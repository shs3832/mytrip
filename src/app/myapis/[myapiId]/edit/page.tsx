"use client";
import MyApisWrite from "@/components/myapis-write";
import { useMyApisWrite } from "@/components/myapis-write/hook";
export default function MyApisEditPage() {
  const isEdit = true;
  const {
    inputState,
    handleInputChange,
    handleSelectChange,
    onClickSubmit,
    onClickBoard,
    checkState,
    onClickUpdate,
    TextArea,
  } = useMyApisWrite({ isEdit });

  return (
    <>
      <MyApisWrite
        inputState={inputState}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        onClickSubmit={onClickSubmit}
        onClickBoard={onClickBoard}
        onClickUpdate={onClickUpdate}
        checkState={checkState}
        TextArea={TextArea}
        isEdit={isEdit}
      />
    </>
  );
}
