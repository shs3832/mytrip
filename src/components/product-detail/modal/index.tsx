"use client";
import { Modal, Button } from "antd";
export function ProductDetailModalComponent({
  isBuyModalOpen,
  setIsBuyModalOpen,
  modalData,
}: {
  isBuyModalOpen: boolean;
  setIsBuyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: {
    title: string;
    content: string;
    okText: string;
    cancelText: string;
    onOk: () => void;
  };
}) {
  return (
    <>
      <Modal
        footer={null}
        centered
        closable={false}
        width={700}
        open={isBuyModalOpen}
        className="point-modal"
      >
        <div className="py-8 text-center">
          <h2 className="text-2xl font-bold">{modalData.title}</h2>

          <p className="mt-6 text-lg leading-7 text-gray-700">
            {modalData.content}
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Button
              size="large"
              className="w-[174px] h-[58px] rounded-lg border-black text-lg font-bold"
              onClick={() => setIsBuyModalOpen(false)}
            >
              {modalData.cancelText}
            </Button>

            <Button
              type="primary"
              size="large"
              className="w-[174px] h-[58px] rounded-lg text-lg font-bold"
              onClick={modalData.onOK}
            >
              {modalData.okText}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
