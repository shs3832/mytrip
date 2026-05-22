import { Button } from "antd";
import { IFetchData } from "./types";
export default function MyApisList({
  data,
  handleViewDetail,
  handleWrite,
}: {
  data: IFetchData[];
  handleWrite: () => void;
  handleViewDetail: (id: string) => void;
}) {
  return (
    <>
      <div className="rounded-xl shadow-md">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-4">번호</th>
              <th className="p-4">여행지 이름</th>
              <th className="p-4">국가/지역</th>
              <th className="p-4">메모</th>
              <th className="p-4">가고 싶은 계절</th>
              <th className="p-4">우선순위</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el, index) => {
              return (
                <tr
                  onClick={() => {
                    handleViewDetail(el.id);
                  }}
                  key={el.id}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="p-4 text-center">{index + 1}</td>
                  <td className="p-4 text-center">{el.place}</td>
                  <td className="p-4 text-center">{el.country}</td>
                  <td className="p-4 text-center">{el.memo}</td>
                  <td className="p-4 text-center">{el.season}</td>
                  <td className="p-4 text-center">{el.priority}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end mt-6 gap-4">
        <Button type="primary" size={"large"} onClick={handleWrite}>
          등록하기
        </Button>
      </div>
    </>
  );
}
