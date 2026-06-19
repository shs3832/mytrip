import { IMypagePointsComponents } from "@/components/mypage/types";

export function MyPointsChargeComponents({
  tableDataChargePoints,
  pointChargeLoading,
  formatNumberWithComma,
}: Pick<
  IMypagePointsComponents,
  "pointChargeLoading" | "tableDataChargePoints" | "formatNumberWithComma"
>) {
  return (
    <div className="my-points-charge mt-5">
      <div className="shadow-md rounded-3xl py-6 px-12 mt-5">
        <div className="w-full text-center ">
          <div>
            <div className="table-title flex items-center w-full font-medium text-base text-gray-900">
              <span className="px-6 py-3 w-[150px] shrink-0">충전일</span>
              <span className="px-6 py-3 grow text-left">결제 ID</span>
              <span className="px-6 py-3 w-1/6">충전내역</span>
              <span className="px-6 py-3 w-1/6">거래 후 잔액</span>
            </div>
          </div>
          <div>
            {!pointChargeLoading && tableDataChargePoints?.length === 0 && (
              <p className="text-center py-10">포인트 충전내역이 없습니다.</p>
            )}

            {tableDataChargePoints?.map((el) => {
              return (
                <div key={el._id}>
                  <div className="group flex items-center w-full my-2 rounded-md hover:bg-gray-50 cursor-pointer">
                    <span className="px-6 py-3 text-gray-500 font-light w-[150px] shrink-0">
                      {new Date(el.createdAt).toLocaleDateString("ko-KR")}
                    </span>
                    <span className={`px-6 py-3 grow text-left font-medium`}>
                      {el.impUid ?? ""}
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
    </div>
  );
}
