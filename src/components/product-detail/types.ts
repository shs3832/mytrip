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
