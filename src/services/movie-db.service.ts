import api from "../lib/axios.js";
import {AxiosResponse} from "axios";
import {Gender} from "../interface/Gender";
import {MovieInterface} from "../interface/Movie";
import {GenderResponse, MoviesResponse} from "../interface/ResponseApi";

class MovieService {
    public async fetchGenres(): Promise<Gender[]> {
        try {
            const url = "genre/movie/list?language=en"
            const res: AxiosResponse<GenderResponse> = await api.get(url);
            return res.data.genres;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async fetchMovies(typeMovie: string): Promise<MovieInterface[]> {
        try {
            const url = `movie/${typeMovie}?language=en-US&page=1`;
            const res: AxiosResponse<MoviesResponse> = await api.get(url);
            return res.data.results;
        } catch (error) {
            throw new Error(error);
        }
    }

    public async fetchMovie(movie_id: string): Promise<MovieInterface> {
        try {
            const url = `movie/${movie_id}?language=en-US`;
            const res: AxiosResponse<MovieInterface> = await api.get(url);
            console.log(res.data)
            return res.data;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default new MovieService();
