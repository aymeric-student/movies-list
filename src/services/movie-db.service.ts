import {GenderResponse, MoviesResponse} from "../interface/ResponseApi";
import {Gender} from "../interface/Gender";
import {MovieInterface} from "../interface/Movie";
import {ActorsResponse} from "../interface/Cast";
import {AxiosResponse} from "axios";
import createAPI from "../lib/axios";

class MovieService {
    constructor(private readonly api) {
    }

    public async fetchGenres(): Promise<Gender[]> {
        return this.fetch<GenderResponse>("genre/movie/list").then(res => res.genres);
    }

    public async fetchMovies(typeMovie: string): Promise<MovieInterface[]> {
        return this.fetch<MoviesResponse>(`movie/${typeMovie}`).then(res => res.results);
    }

    public async fetchMovie(movie_id: string): Promise<MovieInterface> {
        return this.fetch<MovieInterface>(`movie/${movie_id}`);
    }

    public async fetchActors(movie_id: string) {
        return this.fetch<ActorsResponse>(`movie/${movie_id}/credits`);
    }

    public async fetchSimilarMovies(movie_id: string) {
        return this.fetch<MoviesResponse>(`movie/${movie_id}/similar`).then(res => res.results);
    }

    public async searchMovies(movieName: string): Promise<MovieInterface[]> {
        return this.fetch<MoviesResponse>(`search/movie?query=${movieName}`).then(res => res.results);
    }

    public async fetchMoviesByGenre(genre: string): Promise<MovieInterface[]> {
        return this.fetch<MoviesResponse>(`genre/${genre}/movies`).then(res => res.results);
    }

    private async fetch<T>(url: string): Promise<T> {
        try {
            const res: AxiosResponse<T> = await this.api.get(url);
            return res.data;
        } catch (error) {
            throw new Error(error);
        }
    }
}

const language = "en-US";
const api = createAPI(language);

export default new MovieService(api);


