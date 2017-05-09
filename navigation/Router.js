import { createRouter } from '@expo/ex-navigation';
import Home from '../screens/Home';
import Movies from '../screens/Movies';
import TvShows from '../screens/TvShows';
import DetailsView from '../screens/DetailsView';
import Collection from '../screens/Collection';
import Seasons from '../screens/Seasons';
import Episodes from '../screens/Episodes';

export default createRouter(() => ({
    home: () => Home,
    movies: () => Movies,
    tvshows: () => TvShows,
    details: () => DetailsView,
    collection: () => Collection,
    seasons: () => Seasons,
    episodes: () => Episodes,
}));
