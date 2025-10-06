import exp from "constants";

export interface ArtWork {
  id: number;
  title: string;
  artist: string;
  year: number;
}
export type SortBy = "ID" | "title" | "artist" | "year";
export type Order = 'ascending' | 'descending';