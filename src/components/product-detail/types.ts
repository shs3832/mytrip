import { FetchTravelproductQuestionAnswersForListQuery } from "@/commons/graphql/graphql";

export type IReplyQuestionElement =
  FetchTravelproductQuestionAnswersForListQuery["fetchTravelproductQuestionAnswers"][number];

export type IProductDetail = {
  safeContents: string;
  currentImage: string;
  currentIndex: number;
  isMine: boolean;
  data: any;
  questionData: any;
  handleDeleteQuestion: (id: string) => void;
  handlePinned: () => void;
  handlePurchase: () => void;
  setCurrentImage: (image: string) => void;
  setCurrentIndex: (index: number) => void;
  formatPriceToKRW: (price: number) => string;
  confirmData?: {
    title: string;
    content: string;
    okText: string;
    cancelText: string;
  };
  pointData?: {
    title: string;
    content: string;
    okText: string;
    cancelText: string;
  };
  isBuyModalOpen: boolean;
  setIsBuyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: {
    title: string;
    content: string;
    okText: string;
    cancelText: string;
  };
  handleBuyConfirm: () => void;
  isPointModalOpen: boolean;
  setIsPointModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddPoints: () => void;
  options: {
    value: number;
    label: string;
  }[];
  setPointOptions: React.Dispatch<React.SetStateAction<number>>;
  picked: boolean;
  summary?: React.ReactNode;
  firstImageUrl: string;
  hasImage: boolean;
  hasLocation: boolean;
  pinned_loading: boolean;
};
