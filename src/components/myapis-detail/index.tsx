import { Button } from "antd";
import { IFetchData } from "./types";
export default function MyApisDetail({
  data,
  onClickBoard,
  onClickEdit,
}: {
  data: IFetchData | undefined;
  onClickBoard: () => void;
  onClickEdit: () => void;
}) {
  return (
    <>
      <div>
        <div className="mb-5">
          <h2 className="font-bold mb-2">여행지 이름</h2>
          <p className="text-xl">{data?.place}</p>
        </div>
        <div className="mb-5">
          <h2 className="font-bold mb-2">국가/지역</h2>
          <p className="text-xl">{data?.country}</p>
        </div>
        <div className="mb-5">
          <h2 className="font-bold mb-2">메모</h2>
          <p className="text-xl">{data?.memo}</p>
        </div>
        <div className="mb-5">
          <h2 className="font-bold mb-2">가고 싶은 계절</h2>
          <p className="text-xl">{data?.season}</p>
        </div>
        <div className="mb-5">
          <h2 className="font-bold mb-2">우선순위</h2>
          <p className="text-xl">{data?.priority}</p>
        </div>
      </div>
      <div className="flex items-center justify-end mt-6 gap-4">
        <Button size={"large"} onClick={onClickBoard}>
          목록으로
        </Button>
        <Button type="primary" size={"large"} onClick={onClickEdit}>
          수정하기
        </Button>
      </div>
    </>
  );
}
