import { FetchBoardQuery } from "@/commons/graphql/graphql";

export function BoardDetailHeaderServerShell({
  data,
}: {
  data: FetchBoardQuery;
}) {
  return (
    <div className="mt-4 flex items-center border-b mb-4 pb-4 border-gray-100">
      <div className="info-container flex items-center gap-1">
        <div className="user-profile w-6 h-6">
          {/* <img src="" className="block w-full h-full rounded-[50%]" /> */}
          <span className="block w-full h-full rounded-[50%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </span>
        </div>
        <div className="username text-sm text-gray-700 ">
          <span>{data?.fetchBoard?.writer}</span>
        </div>
      </div>

      <div className="date-container ml-auto">
        <span className="text-sm text-gray-700">
          {String(data?.fetchBoard?.createdAt)}
        </span>
      </div>
    </div>
  );
}
