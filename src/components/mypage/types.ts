import { FetchUserLoggedInQuery } from "@/commons/graphql/graphql";

export interface IMypagePoints {
  _id: string;
  createdAt: string;
  status: string;
  amount: number;
  balance: number;
  impUid: string;
  user: {
    name: string;
  };
  travelproduct: {
    name: string;
  };
}

export interface IMypagePointsComponents {
  formatNumberWithComma: (value?: number | null) => string;
  activeNav: boolean;
  activeIndex: number;
  handleClickShow: (index: number) => void;
  menus: {
    label: number;
    value: string;
  }[];
  getStatusColor: (status: string) => string;
  pointAllLoading: boolean;
  pointChargeLoading: boolean;
  pointBuyingLoading: boolean;
  pointSellingLoading: boolean;
  data: FetchUserLoggedInQuery | undefined;
  tableDataPoints: Pick<
    IMypagePoints,
    "_id" | "createdAt" | "status" | "amount" | "balance"
  >[];
  tableDataChargePoints: Pick<
    IMypagePoints,
    "_id" | "createdAt" | "impUid" | "amount" | "balance"
  >[];
  tableDataBuyingPoints: Pick<
    IMypagePoints,
    "_id" | "createdAt" | "travelproduct" | "status" | "balance"
  >[];
  tableDataSellingPoints: Pick<
    IMypagePoints,
    "_id" | "createdAt" | "travelproduct" | "status" | "balance"
  >[];
  searchKeyWord: string;
  setSearchKeyWord: React.Dispatch<React.SetStateAction<string>>;
  handleMypageSearch: () => Promise<void>;
}

export interface IMypagePasswordComponents {
  formatNumberWithComma: (value?: number | null) => string;
  data: FetchUserLoggedInQuery | undefined;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  setCheckPassword: React.Dispatch<React.SetStateAction<string>>;
  handleChangePassword: () => Promise<void>;
  stateCheckInput: boolean;
  checkPassword: string;
  newPassword: string;
}

export interface IMypageProducts {
  _id: string;
  name: string;
  price: number;
  createdAt: string;
  soldAt: string | null;
  buyer: {
    _id: string;
    name: string;
  };
  seller: {
    _id: string;
    name: string;
  };
}

export interface IMypageTradingProps {
  fetchTravelproductsISold: IMypageProducts[];
}

export interface IMypageBookmarkProps {
  fetchTravelproductsIPicked: IMypageProducts[];
}

export interface ISearchComponentProps {
  searchKeyWord: string;
  setSearchKeyWord: React.Dispatch<React.SetStateAction<string>>;
  handleMypageSearch: () => Promise<void>;
}
