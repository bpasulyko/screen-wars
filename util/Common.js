import _ from 'lodash';

export function filterByGenre(items, genreId) {
    return _.filter(items, (item) => {
        if (_.includes(item.genres.map(genre => genre.id), genreId)) {
            return item;
        }
    });
};

export function filterByString(items, searchString) {
    return _.filter(items, (item) => {
        return item.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
    });
};
