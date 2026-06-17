import { useCallback, useEffect, useMemo, useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  // form 값은 제출 payload용, 별도 state는 화면의 주소/지도 렌더링용으로 사용한다.
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  // imageFiles는 업로드 전 미리보기, 기존 이미지, 새 파일을 함께 관리하는 UI 상태다.
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

  const handleOk = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleGetTags = (event: React.ChangeEvent<HTMLInputElement>) => {
    const getValues = event.target.value;
    setValue("tags", getValues);
  };

  const handleFileBox = useCallback((target: string) => {
    const targetInput = document.getElementById(target) as HTMLInputElement;
    if (!targetInput) return;
    targetInput.click();
  }, []);

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    [imageFiles.length],
  );

  const handleDeleteImage = useCallback((index: number) => {
    setImageFiles((prev) => {
      const revokeImage = prev[index];
      if (revokeImage && revokeImage.previewUrl.startsWith("blob:")) {
        // 새로 만든 미리보기 URL은 삭제 시 해제해서 브라우저 메모리 누수를 줄인다.
        URL.revokeObjectURL(revokeImage.previewUrl);
      }
      return prev.filter((_, i) => {
        return i !== index;
      });
    });
  }, []);

  const parseTags = (value?: string) => {
    // 입력창에서는 "호텔, 스파" 같은 문자열로 받고, API payload에서는 string[]로 보낸다.
    return value
      ? value
          .split(",")
          .map((tags) => tags.trim())
          .filter(Boolean)
      : [];
  };

  const createAddressInput = (data: FormData) => {
    // 주소 관련 form 값을 GraphQL travelproductAddress 입력 모양으로 묶는다.
    return {
      zipcode: data.zipcode,
      address: data.address,
      addressDetail: data.addressDetail,
      lat: data.lat,
      lng: data.lng,
    };
  };

  const createBaseTravelProductInput = (
    data: FormData,
    tags: string[],
    images: string[],
  ) => {
    // 등록/수정 mutation에서 공통으로 사용하는 상품 입력 객체를 만든다.
    // 등록과 수정의 차이는 images에 새 URL만 넣는지, 기존 URL과 새 URL을 합치는지다.
    return {
      name: data.name,
      remarks: data.remarks,
      contents: data.contents,
      price: data.price,
      tags,
      images,
      travelproductAddress: createAddressInput(data),
    };
  };

  const uploadImages = async (imageFiles: ImagePreview[] = []) => {
    // 새로 선택한 File 객체들을 업로드하고, API payload에 넣을 URL 문자열 배열만 추출한다.
    // Promise.all은 여러 이미지 업로드 요청을 동시에 실행하고, 모든 결과가 끝날 때까지 기다린다.
    const resultImage = await Promise.all(
      imageFiles.map((image) => {
        // imageFiles 배열을 순회하면서 각 이미지의 File 객체를 uploadFile API에 전달한다.
        return upload_file({
          variables: {
            file: image.file,
          },
        });
      }),
    );

    // 업로드 결과 배열에서 uploadFile.url만 뽑고,
    // undefined/null/빈 문자열 같은 값은 제거해서 string[]만 남긴다.
    const imageUrls = resultImage
      .map((result) => {
        return result.data?.uploadFile.url;
      })
      .filter((url): url is string => Boolean(url));
    return imageUrls;
  };

  const onSubmit = async (data: FormData) => {
    try {
      // 등록은 모든 이미지가 새 파일이므로 imageFiles 전체를 업로드한다.
      const imageUrls = await uploadImages(imageFiles);

      const tags = parseTags(data.tags);

      const result = await travelProductCreate({
        variables: {
          createTravelproductInput: createBaseTravelProductInput(
            data,
            tags,
            imageUrls,
          ),
        },
      });

      Modal.success({ content: "등록이 완료되었습니다." });
      router.push(`/mytrip/products/${result.data?.createTravelproduct._id}`);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
      }
    }
  };

  const onEdit = async (data: FormData) => {
    try {
      // 수정은 기존 서버 이미지와 새로 선택한 이미지를 나누어 처리한다.
      // 기존 이미지는 다시 업로드하지 않고 uploadedUrl만 최종 payload에 유지한다.
      const existingImageUrls = imageFiles
        .filter((image) => image.isExisting)
        .map((image) => {
          return image.uploadedUrl;
        })
        .filter((url): url is string => Boolean(url));

      // 새 이미지만 업로드 대상이다. 기존 서버 이미지는 File 객체가 없기 때문이다.
      const newImages = imageFiles.filter((image) => !image.isExisting);

      const imageUrls = await uploadImages(newImages);

      // 최종 수정 payload에는 유지할 기존 URL과 새로 업로드한 URL을 함께 넣는다.
      const finalImageUrls = [...existingImageUrls, ...imageUrls];

      const tags = parseTags(data.tags);

      const result = await updateTravelproduct({
        variables: {
          updateTravelproductInput: createBaseTravelProductInput(
            data,
            tags,
            finalImageUrls,
          ),
          travelproductId: String(params.productId),
        },
      });

      Modal.success({ content: "수정이 완료되었습니다." });
      router.push(`/mytrip/products/${result.data?.updateTravelproduct._id}`);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    if (!isEdit || !data?.fetchTravelproduct) return;
    if (isEdit) {
      // 수정페이지 진입시 기존값을 읽어 아래와같이 세팅해준다
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

      // 수정페이지에서 이미지 표시를 위해 아래와같이 정리
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
      // 카카오 지도를 그려주기위해 아래와같이 정리
      setAddress(data?.fetchTravelproduct.travelproductAddress.address ?? "");
      setLng(data?.fetchTravelproduct.travelproductAddress.lng);
      setLat(data?.fetchTravelproduct.travelproductAddress.lat);
    }
  }, [data, isEdit, setValue]);

  useEffect(() => {
    if (!address) return;
    if (lat === null || lng === null) return;
    if (!window.kakao?.maps) {
      setIsModalOpen(false);
      return;
    }

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
