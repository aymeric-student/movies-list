import {MovieInterface} from "./Movie";
import {Gender} from "./Gender";

export interface MoviesResponse {
    page: number;
    results: MovieInterface[];
    total_pages: number;
    total_results: number;
}

export interface GenderResponse {
    genres: Gender[]
}
