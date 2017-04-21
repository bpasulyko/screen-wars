import _ from 'lodash';

export default ListTypes = {
    COLLECTION: {
        name: 'collection',
        title: 'Collection',
        icon: 'th-list',
        filter: (items) => _.filter(items, { watched: true }),
    },
    WATCHLIST: {
        name: 'watchlist',
        title: 'Watchlist',
        icon: 'eye-slash',
        filter: (items) => _.filter(items, { watched: false }),
    },
    FAVORITES: {
        name: 'favorites',
        title: 'Favorites',
        icon: 'star-o',
        filter: (items) => _.filter(items, { favorite: true }),
    },
};
