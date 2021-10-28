export interface Movie {
  id?: number;
  name: string;
  year: number;
  runtime: number;
  categories: string[];
  "release-date": string;
  director: string;
  writer: string[];
  actors: string[];
  storyline: string;
}
