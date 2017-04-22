import _ from 'lodash';

export function filterByGenre(items, genreId) {
    return _.filter(items, (item) => {
        if (_.includes(item.genres.map(genre => genre.id), genreId)) {
            return item;
        }
    });
};
