import { Select, Button, Modal } from "antd";
import { CREATE_POINT_TRANSACTION_OF_LOADING } from "@/components/product-detail/queries";
import { useMutation } from "@apollo/client";
export function PointModalComponent({
  isPointModalOpen,
  setIsPointModalOpen,
  handleAddPoints,
  options,
  setPointOptions,
}: {
  isPointModalOpen: boolean;
  setIsPointModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddPoints: () => void;
  options: {
    label: string;
    value: number;
  }[];
  setPointOptions: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <>
      <Modal
        footer={null}
        centered
        closable={false}
        width={700}
        open={isPointModalOpen}
        className="point-modal"
      >
        <div className="py-8 text-center">
          <h2 className="text-xl font-bold">충전하실 금액을 선택해 주세요</h2>
          <div className="mt-6">
            <Select
              options={options}
              placeholder="금액을 선택해 주세요"
              className="w-1/2"
              size="large"
              onChange={(value: number) => {
                setPointOptions(value);
              }}
            />
          </div>
          <div className="mt-10 flex justify-center gap-4">
            <Button
              size="large"
              className="w-[174px] h-[58px] rounded-lg border-black text-lg font-bold"
              onClick={() => setIsPointModalOpen(false)}
            >
              취소
            </Button>

            <Button
              type="primary"
              size="large"
              className="w-[174px] h-[58px] rounded-lg text-lg font-bold"
              onClick={handleAddPoints}
            >
              확인
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
