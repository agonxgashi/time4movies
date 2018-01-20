import { MovieModel } from "./MovieModel";

export class MovieListModel {
    page: number;
    results: MovieModel[];
    total_pages: number;
    total_results: number;
}