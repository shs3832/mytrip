import { gql } from "@apollo/client";
export const MYPAGE_FETCH_TRAVEL_PRODUCTS_I_SOLD = gql`
  query myPageFetchTravelproductsISold($search: String, $page: Int) {
    fetchTravelproductsISold(search: $search, page: $page) {
      _id
      name
      price
      createdAt
      soldAt
      buyer {
        _id
        name
      }
      seller {
        _id
        name
      }
    }
  }
`;

export const MYPAGE_FETCH_TRAVEL_PRODUCTS_I_PICKED = gql`
  query myPageFetchTravelproductsIPicked($search: String, $page: Int) {
    fetchTravelproductsIPicked(search: $search, page: $page) {
      _id
      name
      price
      createdAt
      soldAt
      buyer {
        _id
        name
      }
      seller {
        _id
        name
      }
    }
  }
`;

export const MYPAGE_FETCH_TRAVEL_PRODUCTS_COUNT_I_SOLD = gql`
  query myPageFetchTravelproductsCountISold {
    fetchTravelproductsCountISold
  }
`;

export const MYPAGE_FETCH_TRAVEL_PRODUCTS_COUNT_I_PICKED = gql`
  query myPageFetchTravelproductsCountIPicked {
    fetchTravelproductsCountIPicked
  }
`;

export const MYPAGE_DELETE_TRAVEL_PRODUCT = gql`
  mutation myPageDeleteTravelproduct($travelproductId: ID!) {
    deleteTravelproduct(travelproductId: $travelproductId)
  }
`;
