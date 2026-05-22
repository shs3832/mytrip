import React from "react";
export interface IMyApisWriteProps {
  inputState: {
    place: string;
    country: string;
    memo?: string;
    season: string;
    priority: string;
  };
  handleInputChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  handleSelectChange: (name: "season" | "priority", value: string) => void;
  onClickSubmit: () => void;
  onClickBoard: () => void;
  onClickUpdate: () => void;
  checkState: boolean[];
  isEdit?: boolean;
  TextArea?: any;
}

export interface ITravelWishInput {
  place: string;
  country: string;
  memo?: string;
  season: string;
  priority: string;
}
