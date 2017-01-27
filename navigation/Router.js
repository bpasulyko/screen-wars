import { createRouter } from '@exponent/ex-navigation';
import Home from '../screens/Home';
import Movies from '../screens/Movies';

export default createRouter(() => ({
    home: () => Home,
    movies: () => Movies,
}));
