import { gql } from "@apollo/client";
export const MYPAGE_FETCH_USER_LOGGED_IN = gql`
  query mypageFetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      userPoint {
        _id
        amount
      }
    }
  }
`;

export const MYPAGE_FETCH_POINT_TRANSACTIONS = gql`
  query mypageFetchPointTransactions($search: String, $page: Int) {
    fetchPointTransactions(search: $search, page: $page) {
      _id
      impUid
      amount
      balance
      status
      statusDetail
      createdAt
      travelproduct {
        _id
        name
      }
      user {
        _id
      }
    }
  }
`;

export const MYPAGE_FETCH_POINT_TRANSACTIONS_OF_LOADING = gql`
  query mypageFetchPointTransactionsOfLoading($search: String, $page: Int) {
    fetchPointTransactionsOfLoading(search: $search, page: $page) {
      _id
      impUid
      amount
      balance
      status
      statusDetail
      createdAt
      travelproduct {
        _id
        name
      }
      user {
        _id
      }
    }
  }
`;

export const MYPAGE_FETCH_POINT_TRANSACTIONS_OF_BUYING = gql`
  query mypageFetchPointTransactionsOfBuying($search: String, $page: Int) {
    fetchPointTransactionsOfBuying(search: $search, page: $page) {
      _id
      impUid
      amount
      balance
      status
      statusDetail
      createdAt
      travelproduct {
        _id
        name
        seller {
          _id
        }
      }
      user {
        _id
      }
    }
  }
`;

export const MYPAGE_FETCH_POINT_TRANSACTIONS_OF_SELLING = gql`
  query mypageFetchPointTransactionsOfSelling($search: String, $page: Int) {
    fetchPointTransactionsOfSelling(search: $search, page: $page) {
      _id
      impUid
      amount
      balance
      status
      statusDetail
      createdAt
      travelproduct {
        _id
        name
      }
      user {
        _id
      }
    }
  }
`;

export const MYPAGE_CHANGE_PASSWORD = gql`
  mutation mypageChangePassword($password: String!) {
    resetUserPassword(password: $password)
  }
`;

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
