import _ from 'lodash';

export default SortOptions = {
    0: {
        id: 0,
        name: "Title: A-Z",
        sort: (items) => _.sortBy(items, 'title'),
    },
    1: {
        id: 1,
        name: "Title: Z-A",
        sort: (items) => _.sortBy(items, 'title').reverse(),
    },
    2: {
        id: 2,
        name: "Release: Newest",
        sort: (items) => _.sortBy(items, 'releaseDate').reverse(),
    },
    3: {
        id: 3,
        name: "Release: Oldest",
        sort: (items) => _.sortBy(items, 'releaseDate'),
    },
    4: {
        id: 4,
        name: "Date Added: Newest",
        sort: (items) => _.sortBy(items, 'dateAdded').reverse(),
    },
    5: {
        id: 5,
        name: "Date Added: Oldest",
        sort: (items) => _.sortBy(items, 'dateAdded'),
    },
    6: {
        id: 6,
        name: "Highest Rated",
        sort: (items) => _.sortBy(items, 'rating').reverse(),
    },
    7: {
        id: 7,
        name: "Lowest Rated",
        sort: (items) => _.sortBy(items, 'rating'),
    },
};
