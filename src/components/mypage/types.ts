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
}
