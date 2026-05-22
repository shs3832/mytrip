import { Timestamp } from "firebase/firestore/lite";

export interface IFetchData {
  id: string;
  place: string;
  country: string;
  memo?: string;
  season: string;
  priority: string;
  createdAt: Timestamp;
}
