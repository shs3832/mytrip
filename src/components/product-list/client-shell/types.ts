import { ComponentType } from "react";
export type IpageMove = {
  state: "next" | "prev";
};

export type IProductSearch = {
  isSoldOut: boolean;
  handleTabMenu: (state: boolean) => void;
  handleGoToCreateProduct: () => void;
  handleSearchProducts: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
};

export type IPagination = {
  currentPage: number;
  handlePageMove: (state: IpageMove["state"]) => void;
  hasNextPage: boolean;
};

export type IFilter = {
  handleSetFilter: (filterIndex: number) => void;
  filters: {
    label: string;
    value: string;
    Icon: ComponentType<{ className?: string }>;
  }[];
  selectedFilter: string[];
};
