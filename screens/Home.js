import React from 'react';
import _ from 'lodash';

import {
  StyleSheet,
  View,
  ListView,
  Image,
} from 'react-native';

import LoadingContainer from '../components/LoadingContainer';
import NavBarTitle from '../components/NavBarTitle';
import AddButton from '../components/AddButton';
import SearchResults from '../components/SearchResults';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import ItemList from '../components/ItemList';
import Router from '../navigation/Router';
import { multiSearch } from '../repository/tmdbRepo';

export default class Home extends React.Component {
    static route = {
        navigationBar: {
            backgroundColor: '#171717',
            renderTitle: ({ config: { eventEmitter }, params }) => {
                return <NavBarTitle title="Home" emitter={eventEmitter} searchEnabled={params.search}/>;
            },
            renderRight: ({ config: { eventEmitter }, params }) => {
                return (
                    <AddButton
                        emitter={eventEmitter}
                        searchEnabled={params.search}
                        reset={params.searchResults === null}
                    />
                );
            },
        }
    }

    state = {
        loading: true,
        search: false,
        searchResults: null,
        movies: [],
        tvShows: [],
    };

    componentWillMount() {
        this.props.route.getEventEmitter().addListener('search', this.handleSearch);
        this.props.route.getEventEmitter().addListener('searchSubmitted', this.handleSearchSubmit);
    }

    componentDidMount() {
        return Promise.all([
            this.getMovies(),
            this.getTvShows(),
        ]).
            then((results) => {
                this.setState({
                    loading: false,
                    movies: _.sortBy(_.values(results[0].val()), 'dateAdded').reverse(),
                    tvShows: _.sortBy(_.values(results[1].val()), 'dateAdded').reverse(),
                });
            })
            .catch((error) => console.error(error));
    }

    componentDidUpdate() {
        this.props.navigator.updateCurrentRouteParams({
            search: this.state.search,
            searchResults: this.state.searchResults,
        });
    }

    getMovies = () => {
        return window.firebase.database().ref('movie/').once('value');
    };

    getTvShows = () => {
        return window.firebase.database().ref('tv/').once('value');
    };

    handleSearch = () => {
        this.setState({
            search: !this.state.search,
            searchResults: null,
        });
    };

    handleSearchSubmit = (queryString) => {
        return multiSearch(queryString).then((results) => this.setState({ searchResults: results }));
    };

    goToDetails = (selectedItemId, type) => {
        this.props.navigator.push(Router.getRoute('details', {
            id: selectedItemId,
            type: type,
        }));
    };

    renderRecentlyAddedMovies = () => {
        return (
            <View style={styles.scrollList}>
                <View style={styles.headingContainer}>
                    <TitleText style={styles.heading}>My Recent Movies</TitleText>
                    <BodyText style={styles.viewMoreLink}>View More</BodyText>
                </View>
                {this.renderItemList(this.state.movies, 'movie')}
            </View>
        );
    };

    renderRecentlyAddedTvShows = () => {
        return (
            <View style={styles.scrollList}>
                <View style={styles.headingContainer}>
                    <TitleText style={styles.heading}>My Recent TV Shows</TitleText>
                    <BodyText style={styles.viewMoreLink}>View More</BodyText>
                </View>
                {this.renderItemList(this.state.tvShows, 'tv')}
            </View>
        );
    };

    renderItemList = (items, type) => {
        const itemList = _.slice(items, 0, 10).map((item) => {
            return {
                id: item.id,
                poster: item.poster,
                title: item.title,
            };
        });
        return <ItemList list={itemList} onClick={(id) => this.goToDetails(id, type)} noWrap />;
    };

    render() {
        return (
            <View style={styles.container}>
                <LoadingContainer loading={this.state.loading}>
                    <View style={styles.content}>
                        {this.renderRecentlyAddedMovies()}
                        {this.renderRecentlyAddedTvShows()}
                    </View>
                </LoadingContainer>
                {this.state.searchResults && (
                    <SearchResults
                        results={this.state.searchResults}
                        onResultSelect={this.goToDetails}
                    />
                )}
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
    },
    content: {
        paddingVertical: 10,
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingHorizontal: 15,
    },
    heading: {
        color: '#EEE',
        fontSize: 20,
    },
    scrollList: {
        paddingVertical: 10,
    },
    viewMoreLink: {
        color: '#EEE',
    },
});
