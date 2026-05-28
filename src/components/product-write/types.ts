import { z } from "zod";
import type {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import type { Dispatch, SetStateAction } from "react";
import type { Address } from "react-daum-postcode";

export interface IProductWrite {
  onSubmit: (data: FormData) => void | Promise<void>;
  handleOk: () => void;
  handleCancel: () => void;
  handleComplete: (data: Address) => void;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  control: Control<FormData>;
  handleSubmit: UseFormHandleSubmit<FormData>;
  errors: FieldErrors<FormData>;
  address: string;
  imageFiles: ImagePreview[];
  handleFileBox: (target: string) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteImage: (index: number) => void;
  isEdit: boolean;
  onEdit: (data: FormData) => void | Promise<void>;
}

export const schema = z.object({
  name: z.string().min(1, { message: "상품명을 입력해주세요." }),
  remarks: z.string().min(1, { message: "한줄요약을 입력해주세요." }),
  contents: z.string().refine(
    (value) => {
      const text = value.replace(/<(.|\n)*?>/g, "").trim();
      return text.length > 0;
    },
    {
      message: "상품 설명을 입력해주세요.",
    },
  ),
  price: z.number().min(1, { message: "판매가격을 입력해주세요." }),
  tags: z.string().optional(),
  zipcode: z.string().min(1, { message: "주소를 입력해주세요." }),
  address: z.string().optional(),
  addressDetail: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export type FormData = z.infer<typeof schema>;

export type ImagePreview = {
  file?: File;
  previewUrl: string;
  uploadedUrl?: string;
  isExisting: boolean;
  name: string;
};
