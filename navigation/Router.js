import { createRouter } from '@expo/ex-navigation';
import Home from '../screens/Home';
import Movies from '../screens/Movies';
import TvShows from '../screens/TvShows';
import DetailsView from '../screens/DetailsView';

export default createRouter(() => ({
    home: () => Home,
    movies: () => Movies,
    tvshows: () => TvShows,
    details: () => DetailsView,
}));
