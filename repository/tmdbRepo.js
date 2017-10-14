import _ from 'lodash';
import { repoConfig } from '../util/repoUtil';

const API_KEY = repoConfig;
const BASE_URL = 'https://api.themoviedb.org/3';
let imageConfig;
let genres;

export function getImageConfig() {
    return imageConfig;
}

export function getGenres() {
    return genres;
}

export function loadAppDefaults() {
    return Promise.all([
        loadImageConfig(),
        loadMovieGenres(),
        loadTvGenres(),
    ]);
}

export function multiSearch(queryString) {
    return fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${queryString}`)
        .then((response) => response.json())
        .then((responseJson) => {
            return _.filter(responseJson.results, (result) => {
                return result.media_type === 'movie' || result.media_type === 'tv';
            });
        })
        .catch((error) => {
            console.error(error);
        });
}

export function getByType(type, id) {
    return fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en&append_to_response=credits,images,recommendations`)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

export function getCollection(id) {
    return fetch(`${BASE_URL}/collection/${id}?api_key=${API_KEY}&language=en-US`)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

export function getSeason(tvId, seasonNumber) {
    return fetch(`${BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

export function discoverMatchingGenre(type, genreId) {
    return fetch(`${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`)
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
}

function loadImageConfig() {
    return fetch(`${BASE_URL}/configuration?api_key=${API_KEY}`)
        .then((response) => response.json())
        .then((responseJson) => {
            imageConfig = responseJson.images;
        })
        .catch((error) => {
            console.error(error);
        });
}

function loadMovieGenres() {
    return fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
        .then((response) => response.json())
        .then((responseJson) => genres = _.merge({}, _.keyBy(responseJson.genres, 'id'), genres))
        .catch((error) => {
            console.error(error);
        });
}

function loadTvGenres() {
    return fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`)
        .then((response) => response.json())
        .then((responseJson) => genres = _.merge({}, _.keyBy(responseJson.genres, 'id'), genres))
        .catch((error) => {
            console.error(error);
        });
}
