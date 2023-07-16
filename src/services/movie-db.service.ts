import createAPI from "../lib/axios.js";
import {AxiosResponse} from "axios";
import {Gender} from "../interface/Gender";
import {MovieInterface} from "../interface/Movie";
import {GenderResponse, MoviesResponse} from "../interface/ResponseApi";
import {ActorsResponse} from "../interface/Cast";

class MovieService {
    constructor(private readonly api) {
    }

    public async fetchGenres(): Promise<Gender[]> {
        try {
            const url = "genre/movie/list";
            const res: AxiosResponse<GenderResponse> = await this.api.get(url);
            return res.data.genres;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async fetchMovies(typeMovie: string): Promise<MovieInterface[]> {
        try {
            const url = `movie/${typeMovie}`;
            const res: AxiosResponse<MoviesResponse> = await this.api.get(url);
            return res.data.results;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async fetchMovie(movie_id: string): Promise<MovieInterface> {
        try {
            const url = `movie/${movie_id}`;
            const res: AxiosResponse<MovieInterface> = await this.api.get(url);
            return res.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async fetchActors(movie_id: string) {
        try {
            const url = `movie/${movie_id}/credits`;
            const res: AxiosResponse<ActorsResponse> = await this.api.get(url);
            return res.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async fetchSimilarMovies(movie_id: string) {
        try {
            const url = `movie/${movie_id}/similar`;
            const res: AxiosResponse<MoviesResponse> = await this.api.get(url);
            return res.data.results;
        } catch (error) {
            throw new Error(error);
        }
    }
}

const language = "en-US";
const api = createAPI(language);

export default new MovieService(api);
