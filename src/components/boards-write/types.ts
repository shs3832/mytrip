export interface IUpdateBoardInput {
  title?: string;
  contents?: string;
  boardAddress?: {
    zipcode?: string;
    address?: string;
    addressDetail?: string;
  };
  youtubeUrl?: string;
  images?: string[];
}
