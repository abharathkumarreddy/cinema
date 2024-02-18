import { Genre } from './genre.model';

export interface MovieSummary {
  title: string;
  overview: string;
  genres: Genre[];
}
