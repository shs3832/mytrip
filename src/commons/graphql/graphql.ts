/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type BoardAddressInput = {
  address?: string | null | undefined;
  addressDetail?: string | null | undefined;
  zipcode?: string | null | undefined;
};

export type CreateBoardCommentInput = {
  contents: string;
  password?: string | null | undefined;
  rating: number;
  writer?: string | null | undefined;
};

export type CreateTravelproductInput = {
  contents: string;
  images?: Array<string> | null | undefined;
  name: string;
  price: number;
  remarks: string;
  tags?: Array<string> | null | undefined;
  travelproductAddress?: TravelproductAddressInput | null | undefined;
};

export type CreateTravelproductQuestionAnswerInput = {
  contents: string;
};

export type CreateTravelproductQuestionInput = {
  contents: string;
};

export type CreateUserInput = {
  email: string;
  name: string;
  password: string;
};

export type TravelproductAddressInput = {
  address?: string | null | undefined;
  addressDetail?: string | null | undefined;
  lat?: number | null | undefined;
  lng?: number | null | undefined;
  zipcode?: string | null | undefined;
};

export type UpdateBoardCommentInput = {
  contents?: string | null | undefined;
  rating?: number | null | undefined;
};

export type UpdateBoardInput = {
  boardAddress?: BoardAddressInput | null | undefined;
  contents?: string | null | undefined;
  images?: Array<string> | null | undefined;
  title?: string | null | undefined;
  youtubeUrl?: string | null | undefined;
};

export type UpdateTravelproductInput = {
  contents?: string | null | undefined;
  images?: Array<string> | null | undefined;
  name?: string | null | undefined;
  price?: number | null | undefined;
  remarks?: string | null | undefined;
  tags?: Array<string> | null | undefined;
  travelproductAddress?: TravelproductAddressInput | null | undefined;
};

export type UpdateTravelproductQuestionAnswerInput = {
  contents: string;
};

export type UpdateTravelproductQuestionInput = {
  contents: string;
};

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { createUser: { _id: string, email: string, name: string } };

export type BoardAddressSetFragment = { boardAddress: { _id: string, zipcode: string | null, address: string | null, addressDetail: string | null } | null } & { ' $fragmentName'?: 'BoardAddressSetFragment' };

export type BoardsItemSetFragment = { _id: string, writer: string | null, title: string, createdAt: unknown, user: { _id: string } | null } & { ' $fragmentName'?: 'BoardsItemSetFragment' };

export type TravelProductTravelSetFragment = { _id: string } & { ' $fragmentName'?: 'TravelProductTravelSetFragment' };

export type TravelProductUserSetFragment = { _id: string, name: string, email: string } & { ' $fragmentName'?: 'TravelProductUserSetFragment' };

export type RestoreAccessTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RestoreAccessTokenMutation = { restoreAccessToken: { accessToken: string } };

export type DeleteBoardCommentMutationVariables = Exact<{
  password?: string | null | undefined;
  boardCommentId: string | number;
}>;


export type DeleteBoardCommentMutation = { deleteBoardComment: string };

export type FetchBoardCommentsQueryVariables = Exact<{
  page?: number | null | undefined;
  boardId: string | number;
}>;


export type FetchBoardCommentsQuery = { fetchBoardComments: Array<{ _id: string, writer: string | null, contents: string, rating: number, createdAt: unknown }> };

export type CreateBoardCommentMutationVariables = Exact<{
  createBoardCommentInput: CreateBoardCommentInput;
  boardId: string | number;
}>;


export type CreateBoardCommentMutation = { createBoardComment: { _id: string, writer: string | null, contents: string, rating: number, createdAt: unknown } };

export type UpdateBoardCommentMutationVariables = Exact<{
  updateBoardCommentInput: UpdateBoardCommentInput;
  password?: string | null | undefined;
  boardCommentId: string | number;
}>;


export type UpdateBoardCommentMutation = { updateBoardComment: { _id: string, writer: string | null, contents: string, rating: number, createdAt: unknown } };

export type FetchBoardQueryVariables = Exact<{
  boardId: string | number;
  isIncludeBoardAddress?: boolean | null | undefined;
}>;


export type FetchBoardQuery = { fetchBoard: { _id: string, writer: string | null, title: string, contents: string, createdAt: unknown, likeCount: number, dislikeCount: number, images: Array<string> | null, youtubeUrl: string | null } & { boardAddress?: { _id: string, zipcode: string | null, address: string | null, addressDetail: string | null } | null } };

export type LikeBoardMutationVariables = Exact<{
  boardId: string | number;
}>;


export type LikeBoardMutation = { likeBoard: number };

export type DislikeBoardMutationVariables = Exact<{
  boardId: string | number;
}>;


export type DislikeBoardMutation = { dislikeBoard: number };

export type FetchBoardsOfTheBestQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchBoardsOfTheBestQuery = { fetchBoardsOfTheBest: Array<{ _id: string, writer: string | null, title: string, contents: string, images: Array<string> | null, likeCount: number, createdAt: unknown, user: { _id: string, name: string } | null }> };

export type FetchBoardsQueryVariables = Exact<{
  page?: number | null | undefined;
  search?: string | null | undefined;
  startDate?: unknown;
  endDate?: unknown;
}>;


export type FetchBoardsQuery = { fetchBoards: Array<{ ' $fragmentRefs'?: { 'BoardsItemSetFragment': BoardsItemSetFragment } }> };

export type DeleteBoardMutationVariables = Exact<{
  boardId: string | number;
}>;


export type DeleteBoardMutation = { deleteBoard: string };

export type FetchBoardsCountQueryVariables = Exact<{
  search?: string | null | undefined;
  startDate?: unknown;
  endDate?: unknown;
}>;


export type FetchBoardsCountQuery = { fetchBoardsCount: number };

export type CreateBoardMutationVariables = Exact<{
  writer?: string | null | undefined;
  password?: string | null | undefined;
  title: string;
  contents: string;
  youtubeUrl?: string | null | undefined;
  boardAddress?: BoardAddressInput | null | undefined;
  images?: Array<string> | string | null | undefined;
}>;


export type CreateBoardMutation = { createBoard: { _id: string, writer: string | null, title: string, contents: string, youtubeUrl: string | null, images: Array<string> | null, boardAddress: { _id: string, zipcode: string | null, address: string | null, addressDetail: string | null } | null } };

export type FetchBoardWriteQueryVariables = Exact<{
  boardId: string | number;
  isIncludeBoardAddress?: boolean | null | undefined;
}>;


export type FetchBoardWriteQuery = { fetchBoard: { _id: string, writer: string | null, title: string, contents: string, createdAt: unknown, likeCount: number, dislikeCount: number, images: Array<string> | null, youtubeUrl: string | null } & { boardAddress?: { _id: string, zipcode: string | null, address: string | null, addressDetail: string | null } | null } };

export type UpdateBoardMutationVariables = Exact<{
  updateBoardInput: UpdateBoardInput;
  password?: string | null | undefined;
  boardId: string | number;
}>;


export type UpdateBoardMutation = { updateBoard: { _id: string, writer: string | null, title: string, contents: string, images: Array<string> | null, createdAt: unknown, likeCount: number, dislikeCount: number, youtubeUrl: string | null } };

export type UploadBoardFileMutationVariables = Exact<{
  file: unknown;
}>;


export type UploadBoardFileMutation = { uploadFile: { url: string, _id: string, size: number | null, createdAt: unknown, updatedAt: unknown } };

export type LoginUserMutationVariables = Exact<{
  email: string;
  password: string;
}>;


export type LoginUserMutation = { loginUser: { accessToken: string } };

export type MypageFetchUserLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type MypageFetchUserLoggedInQuery = { fetchUserLoggedIn: { _id: string, email: string, name: string, userPoint: { _id: string, amount: number } | null } };

export type MypageFetchPointTransactionsQueryVariables = Exact<{
  search?: string | null | undefined;
  page?: number | null | undefined;
}>;


export type MypageFetchPointTransactionsQuery = { fetchPointTransactions: Array<{ _id: string, impUid: string | null, amount: number, balance: number, status: string, statusDetail: string, createdAt: unknown, travelproduct: { _id: string, name: string } | null, user: { _id: string } | null }> };

export type MypageFetchPointTransactionsOfLoadingQueryVariables = Exact<{
  search?: string | null | undefined;
  page?: number | null | undefined;
}>;


export type MypageFetchPointTransactionsOfLoadingQuery = { fetchPointTransactionsOfLoading: Array<{ _id: string, impUid: string | null, amount: number, balance: number, status: string, statusDetail: string, createdAt: unknown, travelproduct: { _id: string, name: string } | null, user: { _id: string } | null }> };

export type MypageFetchPointTransactionsOfBuyingQueryVariables = Exact<{
  search?: string | null | undefined;
  page?: number | null | undefined;
}>;


export type MypageFetchPointTransactionsOfBuyingQuery = { fetchPointTransactionsOfBuying: Array<{ _id: string, impUid: string | null, amount: number, balance: number, status: string, statusDetail: string, createdAt: unknown, travelproduct: { _id: string, name: string, seller: { _id: string } | null } | null, user: { _id: string } | null }> };

export type MypageFetchPointTransactionsOfSellingQueryVariables = Exact<{
  search?: string | null | undefined;
  page?: number | null | undefined;
}>;


export type MypageFetchPointTransactionsOfSellingQuery = { fetchPointTransactionsOfSelling: Array<{ _id: string, impUid: string | null, amount: number, balance: number, status: string, statusDetail: string, createdAt: unknown, travelproduct: { _id: string, name: string } | null, user: { _id: string } | null }> };

export type MyPageFetchTravelproductsISoldQueryVariables = Exact<{
  search?: string | null | undefined;
  page?: number | null | undefined;
}>;


export type MyPageFetchTravelproductsISoldQuery = { fetchTravelproductsISold: Array<{ _id: string, name: string, price: number | null, createdAt: unknown, soldAt: unknown, buyer: { _id: string, name: string } | null, seller: { _id: string, name: string } | null }> };

export type MyPageFetchTravelproductsIPickedQueryVariables = Exact<{
  search?: string | null | undefined;
  page?: number | null | undefined;
}>;


export type MyPageFetchTravelproductsIPickedQuery = { fetchTravelproductsIPicked: Array<{ _id: string, name: string, price: number | null, createdAt: unknown, soldAt: unknown, buyer: { _id: string, name: string } | null, seller: { _id: string, name: string } | null }> };

export type MyPageFetchTravelproductsCountISoldQueryVariables = Exact<{ [key: string]: never; }>;


export type MyPageFetchTravelproductsCountISoldQuery = { fetchTravelproductsCountISold: number };

export type MyPageFetchTravelproductsCountIPickedQueryVariables = Exact<{ [key: string]: never; }>;


export type MyPageFetchTravelproductsCountIPickedQuery = { fetchTravelproductsCountIPicked: number };

export type MyPageDeleteTravelproductMutationVariables = Exact<{
  travelproductId: string | number;
}>;


export type MyPageDeleteTravelproductMutation = { deleteTravelproduct: string };

export type CreateTravelproductQuestionAnswerMutationVariables = Exact<{
  createTravelproductQuestionAnswerInput: CreateTravelproductQuestionAnswerInput;
  travelproductQuestionId: string | number;
}>;


export type CreateTravelproductQuestionAnswerMutation = { createTravelproductQuestionAnswer: { _id: string, contents: string, createdAt: unknown, updatedAt: unknown, travelproductQuestion: { _id: string }, user: { _id: string, name: string, email: string } } };

export type FetchTravelproductQuestionAnswersForListQueryVariables = Exact<{
  page?: number | null | undefined;
  travelproductQuestionId: string | number;
}>;


export type FetchTravelproductQuestionAnswersForListQuery = { fetchTravelproductQuestionAnswers: Array<{ _id: string, contents: string, createdAt: unknown, updatedAt: unknown, user: { _id: string, name: string, email: string } }> };

export type UpdateTravelproductQuestionAnswerMutationVariables = Exact<{
  travelproductQuestionAnswerId: string | number;
  updateTravelproductQuestionAnswerInput: UpdateTravelproductQuestionAnswerInput;
}>;


export type UpdateTravelproductQuestionAnswerMutation = { updateTravelproductQuestionAnswer: { _id: string, contents: string } };

export type FetchTravelproductQuestionAnswersForReplyQueryVariables = Exact<{
  page?: number | null | undefined;
  travelproductQuestionId: string | number;
}>;


export type FetchTravelproductQuestionAnswersForReplyQuery = { fetchTravelproductQuestionAnswers: Array<{ _id: string, contents: string, createdAt: unknown, updatedAt: unknown, travelproductQuestion: { _id: string }, user: { _id: string, name: string, email: string } }> };

export type DeleteTravelproductQuestionAnswerMutationVariables = Exact<{
  travelproductQuestionAnswerId: string | number;
}>;


export type DeleteTravelproductQuestionAnswerMutation = { deleteTravelproductQuestionAnswer: string };

export type FetchTravelProductQueryVariables = Exact<{
  travelproductId: string | number;
}>;


export type FetchTravelProductQuery = { fetchTravelproduct: { _id: string, name: string, contents: string, images: Array<string> | null } };

export type CreateTravelproductQuestionMutationVariables = Exact<{
  createTravelproductQuestionInput: CreateTravelproductQuestionInput;
  travelproductId: string | number;
}>;


export type CreateTravelproductQuestionMutation = { createTravelproductQuestion: { _id: string, contents: string, createdAt: unknown, updatedAt: unknown, travelproduct: { ' $fragmentRefs'?: { 'TravelProductTravelSetFragment': TravelProductTravelSetFragment } }, user: { ' $fragmentRefs'?: { 'TravelProductUserSetFragment': TravelProductUserSetFragment } } } };

export type FetchTravelproductQuestionsQueryVariables = Exact<{
  page?: number | null | undefined;
  travelproductId: string | number;
}>;


export type FetchTravelproductQuestionsQuery = { fetchTravelproductQuestions: Array<{ _id: string, contents: string, createdAt: unknown, updatedAt: unknown, travelproduct: { ' $fragmentRefs'?: { 'TravelProductTravelSetFragment': TravelProductTravelSetFragment } }, user: { ' $fragmentRefs'?: { 'TravelProductUserSetFragment': TravelProductUserSetFragment } } }> };

export type FetchTravelproductForDetailQueryVariables = Exact<{
  travelproductId: string | number;
}>;


export type FetchTravelproductForDetailQuery = { fetchTravelproduct: { _id: string, name: string, remarks: string, price: number | null, contents: string, images: Array<string> | null, tags: Array<string> | null, pickedCount: number | null, travelproductAddress: { address: string | null, addressDetail: string | null, lat: number | null, lng: number | null, zipcode: string | null } | null, buyer: { _id: string, name: string, email: string } | null, seller: { _id: string, name: string, email: string } | null } };

export type FetchUserLoggedInQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchUserLoggedInQuery = { fetchUserLoggedIn: { _id: string, email: string, name: string, userPoint: { _id: string, amount: number } | null } };

export type DeleteTravelproductQuestionMutationVariables = Exact<{
  travelproductQuestionId: string | number;
}>;


export type DeleteTravelproductQuestionMutation = { deleteTravelproductQuestion: string };

export type UpdateTravelproductQuestionMutationVariables = Exact<{
  travelproductQuestionId: string | number;
  updateTravelproductQuestionInput: UpdateTravelproductQuestionInput;
}>;


export type UpdateTravelproductQuestionMutation = { updateTravelproductQuestion: { _id: string, contents: string, createdAt: unknown, updatedAt: unknown, travelproduct: { _id: string }, user: { _id: string, name: string, email: string } } };

export type ToggleTravelproductPickMutationVariables = Exact<{
  travelproductId: string | number;
}>;


export type ToggleTravelproductPickMutation = { toggleTravelproductPick: number };

export type CreatePointTransactionOfBuyingAndSellingMutationVariables = Exact<{
  useritemId: string | number;
}>;


export type CreatePointTransactionOfBuyingAndSellingMutation = { createPointTransactionOfBuyingAndSelling: { _id: string } };

export type CreatePointTransactionOfLoadingMutationVariables = Exact<{
  paymentId: string | number;
}>;


export type CreatePointTransactionOfLoadingMutation = { createPointTransactionOfLoading: { _id: string } };

export type FetchTravelproductsIPickedQueryVariables = Exact<{
  search?: string | null | undefined;
  page?: number | null | undefined;
}>;


export type FetchTravelproductsIPickedQuery = { fetchTravelproductsIPicked: Array<{ _id: string }> };

export type FetchTravelproductsOfTheBestQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchTravelproductsOfTheBestQuery = { fetchTravelproductsOfTheBest: Array<{ _id: string, name: string, remarks: string, contents: string, price: number | null, tags: Array<string> | null, images: Array<string> | null, pickedCount: number | null }> };

export type FetchTravelproductsQueryVariables = Exact<{
  isSoldout?: boolean | null | undefined;
  search?: string | null | undefined;
  page?: number | null | undefined;
}>;


export type FetchTravelproductsQuery = { fetchTravelproducts: Array<{ _id: string, name: string, remarks: string, contents: string, price: number | null, tags: Array<string> | null, images: Array<string> | null, pickedCount: number | null, seller: { _id: string, name: string } | null }> };

export type CreateTravelproductMutationVariables = Exact<{
  createTravelproductInput: CreateTravelproductInput;
}>;


export type CreateTravelproductMutation = { createTravelproduct: { _id: string, name: string, remarks: string, contents: string, price: number | null, tags: Array<string> | null, images: Array<string> | null, travelproductAddress: { zipcode: string | null, address: string | null, addressDetail: string | null, lat: number | null, lng: number | null } | null } };

export type UpdateTravelproductMutationVariables = Exact<{
  updateTravelproductInput: UpdateTravelproductInput;
  travelproductId: string | number;
}>;


export type UpdateTravelproductMutation = { updateTravelproduct: { _id: string, name: string, remarks: string, contents: string, price: number | null, tags: Array<string> | null, images: Array<string> | null, travelproductAddress: { zipcode: string | null, address: string | null, addressDetail: string | null, lat: number | null, lng: number | null } | null } };

export type UploadTravelproductFileMutationVariables = Exact<{
  file: unknown;
}>;


export type UploadTravelproductFileMutation = { uploadFile: { url: string } };

export type FetchTravelproductForEditQueryVariables = Exact<{
  travelproductId: string | number;
}>;


export type FetchTravelproductForEditQuery = { fetchTravelproduct: { _id: string, name: string, remarks: string, contents: string, price: number | null, tags: Array<string> | null, images: Array<string> | null, travelproductAddress: { zipcode: string | null, address: string | null, addressDetail: string | null, lat: number | null, lng: number | null } | null } };

export const BoardAddressSetFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardAddressSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boardAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"zipcode"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"addressDetail"}}]}}]}}]} as unknown as DocumentNode<BoardAddressSetFragment, unknown>;
export const BoardsItemSetFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardsItemSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<BoardsItemSetFragment, unknown>;
export const TravelProductTravelSetFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TravelProductTravelSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Travelproduct"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]} as unknown as DocumentNode<TravelProductTravelSetFragment, unknown>;
export const TravelProductUserSetFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TravelProductUserSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<TravelProductUserSetFragment, unknown>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const RestoreAccessTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"restoreAccessToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restoreAccessToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<RestoreAccessTokenMutation, RestoreAccessTokenMutationVariables>;
export const DeleteBoardCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteBoardComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardCommentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBoardComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"boardCommentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardCommentId"}}}]}]}}]} as unknown as DocumentNode<DeleteBoardCommentMutation, DeleteBoardCommentMutationVariables>;
export const FetchBoardCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchBoardComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoardComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<FetchBoardCommentsQuery, FetchBoardCommentsQueryVariables>;
export const CreateBoardCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBoardComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createBoardCommentInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBoardCommentInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoardComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createBoardCommentInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createBoardCommentInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateBoardCommentMutation, CreateBoardCommentMutationVariables>;
export const UpdateBoardCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateBoardComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateBoardCommentInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBoardCommentInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardCommentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBoardComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateBoardCommentInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateBoardCommentInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"boardCommentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardCommentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UpdateBoardCommentMutation, UpdateBoardCommentMutationVariables>;
export const FetchBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isIncludeBoardAddress"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikeCount"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"youtubeUrl"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardAddressSet"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isIncludeBoardAddress"}}}]}]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardAddressSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boardAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"zipcode"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"addressDetail"}}]}}]}}]} as unknown as DocumentNode<FetchBoardQuery, FetchBoardQueryVariables>;
export const LikeBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"likeBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}]}]}}]} as unknown as DocumentNode<LikeBoardMutation, LikeBoardMutationVariables>;
export const DislikeBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"dislikeBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dislikeBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}]}]}}]} as unknown as DocumentNode<DislikeBoardMutation, DislikeBoardMutationVariables>;
export const FetchBoardsOfTheBestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoardsOfTheBest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoardsOfTheBest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<FetchBoardsOfTheBestQuery, FetchBoardsOfTheBestQueryVariables>;
export const FetchBoardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoards"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardsItemSet"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardsItemSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<FetchBoardsQuery, FetchBoardsQueryVariables>;
export const DeleteBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}]}]}}]} as unknown as DocumentNode<DeleteBoardMutation, DeleteBoardMutationVariables>;
export const FetchBoardsCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoardsCount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoardsCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}]}]}}]} as unknown as DocumentNode<FetchBoardsCountQuery, FetchBoardsCountQueryVariables>;
export const CreateBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"writer"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contents"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"youtubeUrl"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardAddress"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BoardAddressInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"images"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createBoardInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"writer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"writer"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"contents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contents"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"youtubeUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"youtubeUrl"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"boardAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardAddress"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"images"},"value":{"kind":"Variable","name":{"kind":"Name","value":"images"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"boardAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"zipcode"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"addressDetail"}}]}},{"kind":"Field","name":{"kind":"Name","value":"youtubeUrl"}},{"kind":"Field","name":{"kind":"Name","value":"images"}}]}}]}}]} as unknown as DocumentNode<CreateBoardMutation, CreateBoardMutationVariables>;
export const FetchBoardWriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchBoardWrite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isIncludeBoardAddress"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikeCount"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"youtubeUrl"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BoardAddressSet"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isIncludeBoardAddress"}}}]}]}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BoardAddressSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Board"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"boardAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"zipcode"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"addressDetail"}}]}}]}}]} as unknown as DocumentNode<FetchBoardWriteQuery, FetchBoardWriteQueryVariables>;
export const UpdateBoardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateBoard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateBoardInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBoardInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBoard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateBoardInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateBoardInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"boardId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"boardId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"writer"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"dislikeCount"}},{"kind":"Field","name":{"kind":"Name","value":"youtubeUrl"}}]}}]}}]} as unknown as DocumentNode<UpdateBoardMutation, UpdateBoardMutationVariables>;
export const UploadBoardFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"uploadBoardFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UploadBoardFileMutation, UploadBoardFileMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"loginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const MypageFetchUserLoggedInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"mypageFetchUserLoggedIn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchUserLoggedIn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]} as unknown as DocumentNode<MypageFetchUserLoggedInQuery, MypageFetchUserLoggedInQueryVariables>;
export const MypageFetchPointTransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"mypageFetchPointTransactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchPointTransactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"impUid"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"statusDetail"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"travelproduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<MypageFetchPointTransactionsQuery, MypageFetchPointTransactionsQueryVariables>;
export const MypageFetchPointTransactionsOfLoadingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"mypageFetchPointTransactionsOfLoading"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchPointTransactionsOfLoading"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"impUid"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"statusDetail"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"travelproduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<MypageFetchPointTransactionsOfLoadingQuery, MypageFetchPointTransactionsOfLoadingQueryVariables>;
export const MypageFetchPointTransactionsOfBuyingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"mypageFetchPointTransactionsOfBuying"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchPointTransactionsOfBuying"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"impUid"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"statusDetail"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"travelproduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"seller"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<MypageFetchPointTransactionsOfBuyingQuery, MypageFetchPointTransactionsOfBuyingQueryVariables>;
export const MypageFetchPointTransactionsOfSellingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"mypageFetchPointTransactionsOfSelling"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchPointTransactionsOfSelling"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"impUid"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"statusDetail"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"travelproduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]} as unknown as DocumentNode<MypageFetchPointTransactionsOfSellingQuery, MypageFetchPointTransactionsOfSellingQueryVariables>;
export const MyPageFetchTravelproductsISoldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"myPageFetchTravelproductsISold"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchTravelproductsISold"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"soldAt"}},{"kind":"Field","name":{"kind":"Name","value":"buyer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seller"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<MyPageFetchTravelproductsISoldQuery, MyPageFetchTravelproductsISoldQueryVariables>;
export const MyPageFetchTravelproductsIPickedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"myPageFetchTravelproductsIPicked"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchTravelproductsIPicked"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"soldAt"}},{"kind":"Field","name":{"kind":"Name","value":"buyer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seller"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<MyPageFetchTravelproductsIPickedQuery, MyPageFetchTravelproductsIPickedQueryVariables>;
export const MyPageFetchTravelproductsCountISoldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"myPageFetchTravelproductsCountISold"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchTravelproductsCountISold"}}]}}]} as unknown as DocumentNode<MyPageFetchTravelproductsCountISoldQuery, MyPageFetchTravelproductsCountISoldQueryVariables>;
export const MyPageFetchTravelproductsCountIPickedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"myPageFetchTravelproductsCountIPicked"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchTravelproductsCountIPicked"}}]}}]} as unknown as DocumentNode<MyPageFetchTravelproductsCountIPickedQuery, MyPageFetchTravelproductsCountIPickedQueryVariables>;
export const MyPageDeleteTravelproductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"myPageDeleteTravelproduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"travelproductId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTravelproduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"travelproductId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"travelproductId"}}}]}]}}]} as unknown as DocumentNode<MyPageDeleteTravelproductMutation, MyPageDeleteTravelproductMutationVariables>;
export const CreateTravelproductQuestionAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTravelproductQuestionAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createTravelproductQuestionAnswerInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTravelproductQuestionAnswerInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"travelproductQuestionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTravelproductQuestionAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createTravelproductQuestionAnswerInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createTravelproductQuestionAnswerInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"travelproductQuestionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"travelproductQuestionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"travelproductQuestion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<CreateTravelproductQuestionAnswerMutation, CreateTravelproductQuestionAnswerMutationVariables>;
export const FetchTravelproductQuestionAnswersForListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchTravelproductQuestionAnswersForList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"travelproductQuestionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchTravelproductQuestionAnswers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"travelproductQuestionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"travelproductQuestionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<FetchTravelproductQuestionAnswersForListQuery, FetchTravelproductQuestionAnswersForListQueryVariables>;
export const UpdateTravelproductQuestionAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTravelproductQuestionAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"travelproductQuestionAnswerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateTravelproductQuestionAnswerInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTravelproductQuestionAnswerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTravelproductQuestionAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"travelproductQuestionAnswerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"travelproductQuestionAnswerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateTravelproductQuestionAnswerInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateTravelproductQuestionAnswerInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}}]}}]}}]} as unknown as DocumentNode<UpdateTravelproductQuestionAnswerMutation, UpdateTravelproductQuestionAnswerMutationVariables>;
export const FetchTravelproductQuestionAnswersForReplyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchTravelproductQuestionAnswersForReply"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"travelproductQuestionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchTravelproductQuestionAnswers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"travelproductQuestionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"travelproductQuestionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"travelproductQuestion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<FetchTravelproductQuestionAnswersForReplyQuery, FetchTravelproductQuestionAnswersForReplyQueryVariables>;
export const DeleteTravelproductQuestionAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTravelproductQuestionAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"travelproductQuestionAnswerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTravelproductQuestionAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"travelproductQuestionAnswerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"travelproductQuestionAnswerId"}}}]}]}}]} as unknown as DocumentNode<DeleteTravelproductQuestionAnswerMutation, DeleteTravelproductQuestionAnswerMutationVariables>;
export const FetchTravelProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchTravelProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"travelproductId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchTravelproduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"travelproductId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"travelproductId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"images"}}]}}]}}]} as unknown as DocumentNode<FetchTravelProductQuery, FetchTravelProductQueryVariables>;
export const CreateTravelproductQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTravelproductQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createTravelproductQuestionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTravelproductQuestionInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"travelproductId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTravelproductQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createTravelproductQuestionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createTravelproductQuestionInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"travelproductId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"travelproductId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"travelproduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TravelProductTravelSet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TravelProductUserSet"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TravelProductTravelSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Travelproduct"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TravelProductUserSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<CreateTravelproductQuestionMutation, CreateTravelproductQuestionMutationVariables>;
export const FetchTravelproductQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchTravelproductQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"travelproductId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchTravelproductQuestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"travelproductId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"travelproductId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"travelproduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TravelProductTravelSet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TravelProductUserSet"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TravelProductTravelSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Travelproduct"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TravelProductUserSet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<FetchTravelproductQuestionsQuery, FetchTravelproductQuestionsQueryVariables>;
export const FetchTravelproductForDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchTravelproductForDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"travelproductId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchTravelproduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"travelproductId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"travelproductId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"pickedCount"}},{"kind":"Field","name":{"kind":"Name","value":"travelproductAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"addressDetail"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}},{"kind":"Field","name":{"kind":"Name","value":"zipcode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buyer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seller"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<FetchTravelproductForDetailQuery, FetchTravelproductForDetailQueryVariables>;
export const FetchUserLoggedInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchUserLoggedIn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchUserLoggedIn"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userPoint"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}}]}}]} as unknown as DocumentNode<FetchUserLoggedInQuery, FetchUserLoggedInQueryVariables>;
export const DeleteTravelproductQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTravelproductQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"travelproductQuestionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTravelproductQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"travelproductQuestionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"travelproductQuestionId"}}}]}]}}]} as unknown as DocumentNode<DeleteTravelproductQuestionMutation, DeleteTravelproductQuestionMutationVariables>;
export const UpdateTravelproductQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTravelproductQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"travelproductQuestionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateTravelproductQuestionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTravelproductQuestionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTravelproductQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"travelproductQuestionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"travelproductQuestionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateTravelproductQuestionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateTravelproductQuestionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"travelproduct"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTravelproductQuestionMutation, UpdateTravelproductQuestionMutationVariables>;
export const ToggleTravelproductPickDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"toggleTravelproductPick"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"travelproductId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleTravelproductPick"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"travelproductId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"travelproductId"}}}]}]}}]} as unknown as DocumentNode<ToggleTravelproductPickMutation, ToggleTravelproductPickMutationVariables>;
export const CreatePointTransactionOfBuyingAndSellingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPointTransactionOfBuyingAndSelling"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"useritemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPointTransactionOfBuyingAndSelling"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"useritemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"useritemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<CreatePointTransactionOfBuyingAndSellingMutation, CreatePointTransactionOfBuyingAndSellingMutationVariables>;
export const CreatePointTransactionOfLoadingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPointTransactionOfLoading"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paymentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPointTransactionOfLoading"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paymentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paymentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<CreatePointTransactionOfLoadingMutation, CreatePointTransactionOfLoadingMutationVariables>;
export const FetchTravelproductsIPickedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchTravelproductsIPicked"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchTravelproductsIPicked"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<FetchTravelproductsIPickedQuery, FetchTravelproductsIPickedQueryVariables>;
export const FetchTravelproductsOfTheBestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchTravelproductsOfTheBest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchTravelproductsOfTheBest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"pickedCount"}}]}}]}}]} as unknown as DocumentNode<FetchTravelproductsOfTheBestQuery, FetchTravelproductsOfTheBestQueryVariables>;
export const FetchTravelproductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchTravelproducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isSoldout"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchTravelproducts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isSoldout"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isSoldout"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"pickedCount"}},{"kind":"Field","name":{"kind":"Name","value":"seller"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<FetchTravelproductsQuery, FetchTravelproductsQueryVariables>;
export const CreateTravelproductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTravelproduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createTravelproductInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTravelproductInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTravelproduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createTravelproductInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createTravelproductInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"travelproductAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"zipcode"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"addressDetail"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}}]}}]} as unknown as DocumentNode<CreateTravelproductMutation, CreateTravelproductMutationVariables>;
export const UpdateTravelproductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTravelproduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateTravelproductInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTravelproductInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"travelproductId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTravelproduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateTravelproductInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateTravelproductInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"travelproductId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"travelproductId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"travelproductAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"zipcode"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"addressDetail"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTravelproductMutation, UpdateTravelproductMutationVariables>;
export const UploadTravelproductFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"uploadTravelproductFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<UploadTravelproductFileMutation, UploadTravelproductFileMutationVariables>;
export const FetchTravelproductForEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchTravelproductForEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"travelproductId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchTravelproduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"travelproductId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"travelproductId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"remarks"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"travelproductAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"zipcode"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"addressDetail"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}}]}}]} as unknown as DocumentNode<FetchTravelproductForEditQuery, FetchTravelproductForEditQueryVariables>;