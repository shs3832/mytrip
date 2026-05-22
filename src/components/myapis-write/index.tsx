import { Input, Select, Button } from "antd";
import { IMyApisWriteProps } from "@/components/myapis-write/types";
export default function MyApisWrite({
  inputState,
  handleInputChange,
  handleSelectChange,
  onClickSubmit,
  onClickBoard,
  onClickUpdate,
  checkState,
  TextArea,
  isEdit,
}: IMyApisWriteProps) {
  return (
    <>
      <div>
        <ul>
          <li className="mb-5">
            <label className="text-sm mb-2 block font-bold flex items-center">
              여행지 이름 <small className="text-sm text-red-500 ml-1">*</small>
            </label>
            <Input
              placeholder="여행지 이름을 입력하세요"
              name="place"
              onChange={handleInputChange}
              value={inputState.place}
            />
            {!checkState[0] && (
              <p className="text-sm text-red-500">여행지 이름을 입력하세요</p>
            )}
          </li>
          <li className="mb-5">
            <label className="text-sm mb-2 block font-bold flex items-center">
              국가/지역 <small className="text-sm text-red-500 ml-1">*</small>
            </label>
            <Input
              placeholder="국가/지역을 입력하세요"
              name="country"
              onChange={handleInputChange}
              value={inputState.country}
            />
            {!checkState[1] && (
              <p className="text-sm text-red-500">
                국가/지역을 이름을 입력하세요
              </p>
            )}
          </li>
          <li className="mb-5 flex items-center gap-x-5">
            <div className="w-1/2">
              <label className="text-sm mb-2 block font-bold">
                가고 싶은 계절
              </label>
              <Select
                defaultValue={inputState.season}
                className="w-full"
                allowClear
                options={[
                  { value: "봄", label: "봄" },
                  { value: "여름", label: "여름" },
                  { value: "가을", label: "가을" },
                  { value: "겨울", label: "겨울" },
                ]}
                placeholder="select it"
                value={inputState.season}
                onChange={(event) => {
                  handleSelectChange("season", event);
                }}
              />
            </div>
            <div className="w-1/2">
              <label className="text-sm mb-2 block font-bold">우선순위</label>
              <Select
                defaultValue={inputState.priority}
                className="w-full"
                allowClear
                options={[
                  { value: "상", label: "상" },
                  { value: "중", label: "중" },
                  { value: "하", label: "하" },
                ]}
                placeholder="select it"
                value={inputState.priority}
                onChange={(event) => {
                  handleSelectChange("priority", event);
                }}
              />
            </div>
          </li>

          <li className="mb-5">
            <label className="text-sm mb-2 block font-bold">메모</label>
            <TextArea
              rows={4}
              name="memo"
              value={inputState.memo}
              onChange={handleInputChange}
            />
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button size={"large"} onClick={onClickBoard}>
          목록으로
        </Button>
        <Button
          type="primary"
          size={"large"}
          onClick={isEdit ? onClickUpdate : onClickSubmit}
        >
          {isEdit ? "수정하기" : "등록하기"}
        </Button>
      </div>
    </>
  );
}
