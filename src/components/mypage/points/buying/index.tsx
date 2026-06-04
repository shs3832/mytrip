import { IMypagePointsComponents } from "../types";

export function MyPointsBuyingComponents({
  tableDataBuyingPoints,
  pointBuyingLoading,
  formatNumberWithComma,
  getStatusColor,
}: Pick<
  IMypagePointsComponents,
  | "tableDataBuyingPoints"
  | "pointBuyingLoading"
  | "formatNumberWithComma"
  | "getStatusColor"
>) {
  return (
    <div className="my-purchase mt-5">
      <div className="shadow-md rounded-3xl py-6 px-12 mt-5">
        <div className="w-full text-center ">
          <div>
            <div className="table-title flex items-center w-full font-medium text-base text-gray-900">
              <span className="px-6 py-3 w-[150px] shrink-0">거래일</span>
              <span className="px-6 py-3 grow">상품명</span>
              <span className="px-6 py-3 w-1/6">거래내역</span>
              <span className="px-6 py-3 w-1/6">거래 후 잔액</span>
              {/* <span className="px-6 py-3 w-[100px]">판매자</span> */}
            </div>
          </div>
          <div>
            {!pointBuyingLoading && tableDataBuyingPoints?.length === 0 && (
              <p className="text-center py-10">구매내역이 없습니다</p>
            )}

            {tableDataBuyingPoints?.map((el) => {
              return (
                <div key={el._id}>
                  <div className="group flex items-center w-full my-2 rounded-md hover:bg-gray-50 cursor-pointer">
                    <span className="px-6 py-3 w-[150px] shrink-0 text-gray-500 font-light">
                      {new Date(el.createdAt).toLocaleDateString("ko-KR")}
                    </span>
                    <span className={`px-6 py-3 grow`}>
                      {el.travelproduct.name}
                    </span>
                    <span
                      className={`px-6 py-3 w-1/6 
                              ${getStatusColor(el.status)}`}
                    >
                      {el.status}
                    </span>

                    <span className="px-6 py-3 w-1/6 text-gray-500">
                      {formatNumberWithComma(el.balance)}
                    </span>
                    {/* <span className="px-6 py-3 w-[100px] text-gray-500">
                              {el.user.name}
                            </span> */}
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
