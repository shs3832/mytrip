export type IReplyQuestionElement = {
  _id: string;
  contents: string;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
};

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
};
