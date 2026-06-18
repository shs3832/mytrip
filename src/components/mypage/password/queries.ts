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
