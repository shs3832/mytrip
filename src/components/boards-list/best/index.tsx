import Link from "next/link";
import { HeartOutlined, UserOutlined } from "@ant-design/icons";
import { fetchBoardsOfTheBest } from "./fetch";

export default async function BoardListBestComponent() {
  const data = await fetchBoardsOfTheBest();

  return (
    <>
      <section className="mb-14 w-full">
        <h2 className="mb-8 text-3xl font-bold text-black">
          오늘 핫한 트립토크
        </h2>
        {/* 베스트 게시물 */}
        <div className="grid grid-cols-4 gap-10">
          {data?.fetchBoardsOfTheBest.map((el) => {
            const thumbnail = el.images?.[0]
              ? `https://storage.googleapis.com/${el.images?.[0]}`
              : "https://placehold.co/600x400@3x.png";
            return (
              <Link
                className="group flex cursor-pointer gap-4"
                href={`/mytrip/boards/${el._id}`}
                key={el._id}
              >
                <div className="h-[132px] w-[132px] shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={thumbnail}
                    alt="트립토크 이미지"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="line-clamp-2 text-base font-bold leading-relaxed text-gray-900">
                    {el.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                      <UserOutlined />
                    </span>
                    <span>{el.writer ?? "익명"}</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-red-400">
                      <HeartOutlined />
                      <span>{el.likeCount}</span>
                    </span>
                    <span className="text-gray-500">
                      {new Date(String(el.createdAt))
                        .toISOString()
                        .slice(0, 10)
                        .replaceAll("-", ".")}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
