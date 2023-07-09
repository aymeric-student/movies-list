import axios from "axios";

const createAPI = (language) => {
    return axios.create({
        baseURL: 'https://api.themoviedb.org/3/',
        params: {
            api_key: '6dc646632d1c11debbc7e874ea32f797',
            language: language
        },
    });
};

export default createAPI;
