"use client";
import { FetchTravelproductsQuery } from "@/commons/graphql/graphql";
import { TagOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
export default function ProductListItems({
  data,
}: {
  data: FetchTravelproductsQuery["fetchTravelproducts"];
}) {
  const router = useRouter();
  const formatNumberWithComma = (value?: number | null) => {
    return new Intl.NumberFormat("ko-KR").format(value ?? 0);
  };

  return (
    <>
      {data?.map((item) => {
        return (
          <article
            key={item._id}
            onClick={() => {
              router.push(`/mytrip/products/${item._id}`);
            }}
            className="cursor-pointer"
          >
            <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200">
              {item?.images?.[0] !== null && item?.images?.length !== 0 ? (
                <img
                  src={`https://storage.googleapis.com/${item?.images?.[0]}`}
                  alt={`${item.name}숙소 이미지`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <img src="/images/product-01.png" />
              )}

              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-black/40 px-2 py-1 text-sm text-white">
                <TagOutlined />
                <span>{item.pickedCount}</span>
              </div>
            </div>

            <h2 className="mb-1 truncate text-base font-semibold text-gray-900">
              {item.name}
            </h2>

            <div
              className="mb-1 truncate text-sm text-gray-500 line-clamp-3 [&_p]:whitespace-normal"
              dangerouslySetInnerHTML={{ __html: item.contents }}
            />

            <p className="mb-3 truncate text-sm flex items-center gap-x-1 text-blue-500">
              {(item?.tags?.length ?? 0) > 0 &&
                item?.tags?.map((tag: string) => {
                  return <span key={tag}>#{tag}</span>;
                })}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <UserOutlined />
                <span>{item?.seller?.name ?? "익명"}</span>
              </div>

              <strong className="text-lg font-bold text-gray-900">
                {formatNumberWithComma(item.price)} 원
              </strong>
            </div>
          </article>
        );
      })}
    </>
  );
}
