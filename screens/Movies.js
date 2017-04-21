import React from 'react';
import _ from 'lodash';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LoadingContainer from '../components/LoadingContainer';
import NavBarTitle from '../components/NavBarTitle';
import ItemList from '../components/ItemList';
import NoItems from '../components/NoItems';
import { FontAwesome } from '@expo/vector-icons';
import Router from '../navigation/Router';
import FilterButton from '../components/FilterButton';
import FilterMenu from '../components/FilterMenu';
import ListButtonGroup from '../components/ListButtonGroup';

const ListTypes = {
    COLLECTION: 'collection',
    WATCHLIST: 'watchlist',
    FAVORITES: 'favorites',
};

export default class Movies extends React.Component {
    static route = {
        navigationBar: {
            backgroundColor: '#171717',
            renderTitle: ({ config: { eventEmitter }, params }) => {
                return <NavBarTitle title="Movies" emitter={eventEmitter}/>;
            },
            renderRight: ({ config: { eventEmitter }, params }) => {
                return <FilterButton emitter={eventEmitter} />;
            },
        },
    }

    state = {
        loading: true,
        movies: [],
        showFilterMenu: false,
        activeList: ListTypes.COLLECTION,
    };

    componentWillMount() {
        this.props.route.getEventEmitter().addListener('filter', this.handleFilter);
    }

    componentDidMount() {
        window.firebase.database().ref('movie/').on('value', (movies) => {
            this.setState({
                loading: false,
                movies: _.sortBy(_.values(movies.val()), 'title'),
            })
        });
    }

    goToDetails = (selectedMovie) => {
        this.props.navigator.push(Router.getRoute('details', {
            id: selectedMovie.id,
            type: 'movie',
        }));
    };

    handleFilter = () => {
        this.setState({ showFilterMenu: !this.state.showFilterMenu });
    };

    handleListButtonClick = (activeList) => {
        this.setState({ activeList });
    };

    render() {
        let filteredMovies = filterByActiveList(this.state.movies, this.state.activeList);
        let icon = 'film';
        if (this.state.activeList === ListTypes.WATCHLIST) icon = 'eye-slash';
        if (this.state.activeList === ListTypes.FAVORITES) icon = 'star-o';
        const text = `You haven't added any movies to your ${this.state.activeList}!`
        const content = (filteredMovies.length > 0)
            ? <ItemList list={filteredMovies} onClick={this.goToDetails} />
            : <NoItems icon={icon} text={text} />;
        return (
            <View style={styles.container}>
                <FilterMenu show={this.state.showFilterMenu} />
                <ListButtonGroup
                    activeList={this.state.activeList}
                    onListButtonClick={this.handleListButtonClick}
                />
                <LoadingContainer loading={this.state.loading}>
                    {content}
                </LoadingContainer>
            </View>
        );
    };
}

function filterByActiveList(items, activeList) {
    switch (activeList) {
        case ListTypes.COLLECTION:
            return _.filter(items, { watched: true });
            break;
        case ListTypes.WATCHLIST:
            return _.filter(items, { watched: false });
            break;
        case ListTypes.FAVORITES:
            return _.filter(items, { favorite: true });
            break;
        default:
            return items;
            break;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
