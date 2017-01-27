import { createRouter } from '@exponent/ex-navigation';
import Home from '../screens/Home';
import Movies from '../screens/Movies';
import TvShows from '../screens/TvShows';

export default createRouter(() => ({
    home: () => Home,
    movies: () => Movies,
    tvshows: () => TvShows,
}));
