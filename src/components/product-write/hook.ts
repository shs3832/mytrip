import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Address } from "react-daum-postcode";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_TRAVEL_PRODUCT,
  FETCH_TRAVEL_PRODUCTS,
  UPDATE_TRAVEL_PRODUCT,
  UPLOAD_FILE,
} from "@/components/product-write/queries";
import {
  schema,
  FormData,
  ImagePreview,
} from "@/components/product-write/types";
import { Modal } from "antd";
import { useParams, useRouter } from "next/navigation";
declare global {
  interface Window {
    kakao: any;
  }
}

export default function useProductWrite({ isEdit }: { isEdit: boolean }) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      remarks: "",
      contents: "",
      price: 0,
      tags: "",
      zipcode: "",
      address: "",
      addressDetail: "",
      lat: 0,
      lng: 0,
    },
  });

  const params = useParams();
  const router = useRouter();
  const [travelProductCreate] = useMutation(CREATE_TRAVEL_PRODUCT);
  const [updateTravelproduct] = useMutation(UPDATE_TRAVEL_PRODUCT);
  const [address, setAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [imageFiles, setImageFiles] = useState<ImagePreview[]>([]);
  const [upload_file] = useMutation(UPLOAD_FILE);

  const { data } = useQuery(FETCH_TRAVEL_PRODUCTS, {
    variables: {
      travelproductId: String(params.productId),
    },
    skip: !isEdit,
  });

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = "";
    let zoneCode = data.zonecode;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress);
    setValue("zipcode", zoneCode);
    setValue("address", fullAddress);

    if (!window.kakao?.maps) {
      console.log("Kakao Maps SDK가 아직 로드되지 않았습니다.");
      return;
    }

    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(fullAddress, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setLat(Number(result[0].y));
          setLng(Number(result[0].x));
          setValue("lat", Number(result[0].y));
          setValue("lng", Number(result[0].x));
        }
      });
      setIsModalOpen(false);
    });
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleGetTags = (event: React.ChangeEvent<HTMLInputElement>) => {
    const getValues = event.target.value;
    setValue("tags", getValues);
  };

  const handleFileBox = (target: string) => {
    const targetInput = document.getElementById(target) as HTMLInputElement;
    if (!targetInput) return;
    targetInput.click();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files) return;
    if (imageFiles.length + files.length > 5) {
      Modal.error({ content: "5개이상 첨부 불가" });
      return;
    }
    const fileArray = Array.from(files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      isExisting: false,
      name: file.name,
    }));
    setImageFiles((prev) => [...prev, ...fileArray]);
  };

  const handleDeleteImage = (index: number) => {
    setImageFiles((prev) => {
      const revokeImage = prev[index];
      if (revokeImage) {
        URL.revokeObjectURL(revokeImage.previewUrl);
      }
      return prev.filter((_, i) => {
        return i !== index;
      });
    });
  };

  const onSubmit = async (data: FormData) => {
    try {
      const resultImage = await Promise.all(
        imageFiles.map((image) => {
          return upload_file({
            variables: {
              file: image.file,
            },
          });
        }),
      );

      const imageUrls = resultImage
        .map((result) => {
          return result.data?.uploadFile.url;
        })
        .filter((url): url is string => Boolean(url));

      const tags = data.tags
        ? data.tags
            .split(",")
            .map((tags) => tags.trim())
            .filter(Boolean)
        : [];

      const result = await travelProductCreate({
        variables: {
          createTravelproductInput: {
            name: data.name,
            remarks: data.remarks,
            contents: data.contents,
            price: data.price,
            tags: tags,
            images: imageUrls,
            travelproductAddress: {
              zipcode: data.zipcode,
              address: data.address,
              addressDetail: data.addressDetail,
              lat: data.lat,
              lng: data.lng,
            },
          },
        },
      });

      router.push(
        `/homework26/products/${result.data?.createTravelproduct._id}`,
      );

      console.log(result);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
      }
    }
  };

  const onEdit = async (data: FormData) => {
    try {
      // 기존 이미지 분리
      const existingImageUrls = imageFiles
        .filter((image) => image.isExisting) // isExisting이 true인경우만 걸러냄
        .map((image) => {
          return image.uploadedUrl; // uploadedUrl값만 배열로 추출
        })
        .filter((url): url is string => Boolean(url)); // null, "", undefined 제거

      const newImages = imageFiles.filter((image) => !image.isExisting);
      // isExisting값이 false인 것만 추출 (새로 올린 이미지)

      const uploadResults = await Promise.all(
        // 이미지를 올린 순서대로 api호출
        newImages.map((image) => {
          // newImages 배열을 순회
          return upload_file({
            variables: {
              file: image.file, // 새로올린 파일중 File Object를 업로드 api로 전달
            },
          });
        }),
      );
      const newImageUrls = uploadResults
        .map((result) => {
          return result.data?.uploadFile.url;
        })
        .filter((url): url is string => Boolean(url));
      // 업로드 후 결과값을 추출 map으로 url을 배열로 만들고 null, "", undefined 제거

      const finalImageUrls = [...existingImageUrls, ...newImageUrls];
      // 기존 파일, 신규파일을 합침

      const tags = data.tags
        ? data.tags
            .split(",")
            .map((tags) => tags.trim())
            .filter(Boolean)
        : [];
      const result = await updateTravelproduct({
        variables: {
          updateTravelproductInput: {
            name: data.name,
            remarks: data.remarks,
            contents: data.contents,
            price: data.price,
            tags: tags,
            images: finalImageUrls, // 합친 파일을 업데이트
            travelproductAddress: {
              zipcode: data.zipcode,
              address: data.address,
              addressDetail: data.addressDetail,
              lat: data.lat,
              lng: data.lng,
            },
          },
          travelproductId: String(params.productId),
        },
      });

      console.log(result);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
      }
    }
  };

  useEffect(() => {
    if (!isEdit || !data?.fetchTravelproduct) return;
    if (isEdit) {
      console.log(data?.fetchTravelproduct.tags);
      setValue("name", data?.fetchTravelproduct.name);
      setValue("remarks", data?.fetchTravelproduct.remarks);
      setValue("contents", data?.fetchTravelproduct.contents);
      setValue("price", data?.fetchTravelproduct.price);
      setValue("tags", data?.fetchTravelproduct.tags.join(", ") ?? "");
      setValue(
        "zipcode",
        data?.fetchTravelproduct.travelproductAddress.zipcode,
      );
      setValue(
        "address",
        data?.fetchTravelproduct.travelproductAddress.address,
      );
      setValue(
        "addressDetail",
        data?.fetchTravelproduct.travelproductAddress.addressDetail,
      );
      setValue("lat", data?.fetchTravelproduct.travelproductAddress.lat);
      setValue("lng", data?.fetchTravelproduct.travelproductAddress.lng);
      const getImages = data?.fetchTravelproduct.images.map((file: string) => {
        return {
          // file,
          previewUrl: `https://storage.googleapis.com/${file}`,
          uploadedUrl: file,
          name: file,
          isExisting: true,
        };
      });
      setImageFiles(getImages);
      setAddress(data?.fetchTravelproduct.travelproductAddress.address ?? "");
      setLng(data?.fetchTravelproduct.travelproductAddress.lng);
      setLat(data?.fetchTravelproduct.travelproductAddress.lat);
    }
  }, [data, isEdit, setValue]);

  useEffect(() => {
    if (!address) return;
    if (!lat || !lng) return;
    if (!window.kakao?.maps) return;

    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      if (!container) return;
      const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      });

      // 마커 표시
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(lat, lng),
      });
      marker.setMap(map);
    });
  }, [address, lat, lng]);

  return {
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
    handleGetTags,
    onEdit,
  };
}
