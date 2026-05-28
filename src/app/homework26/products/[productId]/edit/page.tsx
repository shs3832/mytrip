"use client";
import ProductWriteComponent from "@/components/product-write";
import useProductWrite from "@/components/product-write/hook";

export default function ProductAssignPages() {
  const isEdit = true;
  const {
    onSubmit,
    handleOk,
    handleCancel,
    handleComplete,
    isModalOpen,
    setIsModalOpen,
    control,
    handleSubmit,
    errors,
    address,
    imageFiles,
    handleFileBox,
    handleFileUpload,
    handleDeleteImage,
    onEdit,
  } = useProductWrite({ isEdit });

  return (
    <ProductWriteComponent
      onSubmit={onSubmit}
      handleOk={handleOk}
      handleCancel={handleCancel}
      handleComplete={handleComplete}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      control={control}
      handleSubmit={handleSubmit}
      errors={errors}
      address={address}
      imageFiles={imageFiles}
      handleFileBox={handleFileBox}
      handleFileUpload={handleFileUpload}
      handleDeleteImage={handleDeleteImage}
      isEdit={isEdit}
      onEdit={onEdit}
    />
  );
}
