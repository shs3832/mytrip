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
