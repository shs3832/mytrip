import { IMypagePointsComponents } from "../types";

export function MyPointsTotalComponents({
  tableDataPoints,
  pointAllLoading,
  formatNumberWithComma,
  getStatusColor,
}: Pick<
  IMypagePointsComponents,
  | "tableDataPoints"
  | "pointAllLoading"
  | "formatNumberWithComma"
  | "getStatusColor"
>) {
  return (
    <div className="shadow-md rounded-3xl py-6 px-12 mt-5">
      <div className="w-full text-center ">
        <div>
          <div className="table-title flex items-center w-full font-medium text-base text-gray-900">
            <span className="px-6 py-3 w-[150px] shrink-0">날짜</span>
            <span className="px-6 py-3 grow text-left">내용</span>
            <span className="px-6 py-3 w-1/6">거래 및 충전내역</span>
            <span className="px-6 py-3 w-1/6">잔액</span>
          </div>
        </div>
        <div>
          {!pointAllLoading && tableDataPoints?.length === 0 && (
            <p className="text-center py-10">포인트 사용내역이 없습니다</p>
          )}

          {tableDataPoints?.map((el) => {
            return (
              <div key={el._id}>
                <div className="group flex items-center w-full my-2 rounded-md hover:bg-gray-50 cursor-pointer">
                  <span className="px-6 py-3 text-gray-500 font-light w-[150px] shrink-0">
                    {new Date(el.createdAt).toLocaleDateString("ko-KR")}
                  </span>
                  <span
                    className={`px-6 py-3 grow text-left font-medium 
                                 ${getStatusColor(el.status)}`}
                  >
                    {el.status}
                  </span>
                  <span className="px-6 py-3 w-1/6">
                    {formatNumberWithComma(el.amount)}
                  </span>
                  <span className="px-6 py-3 w-1/6 text-gray-500">
                    {formatNumberWithComma(el.balance)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
