import exp from "constants";

export interface ArtWork {
  id: number;
  title: string;
  artist: string;
  year: number;
  thumbnailUrl?: string;
}

export interface ArtWorkDetail {
  id: number;
  title: string;
  artist: string;
  year: number;
  description: string | null;
  imageUrl?: string;
}

export type SortBy = "ID" | "title" | "artist" | "year";
export type Order = 'ascending' | 'descending';