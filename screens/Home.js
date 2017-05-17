import React from 'react';
import _ from 'lodash';

import {
  StyleSheet,
  View,
  ScrollView,
  ListView,
  Image,
  Button,
  TextInput,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import LoadingContainer from '../components/LoadingContainer';
import NavBarTitle from '../components/NavBarTitle';
import AddButton from '../components/AddButton';
import SearchResults from '../components/SearchResults';
import TitleText from '../components/TitleText';
import ItemList from '../components/ItemList';
import { multiSearch, discoverMatchingGenre } from '../repository/tmdbRepo';

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
        recommendedMovies: [],
        tvShows: [],
        recommendedTvShows: [],
    };

    componentWillMount() {
        this.props.route.getEventEmitter().addListener('search', this.handleSearch);
        this.props.route.getEventEmitter().addListener('searchSubmitted', this.handleSearchSubmit);
    }

    componentDidMount() {
        this.getMovies();
        this.getTvShows();
    }

    componentDidUpdate() {
        this.props.navigator.updateCurrentRouteParams({
            search: this.state.search,
            searchResults: this.state.searchResults,
        });
    }

    getMovies = () => {
        window.firebase.database().ref('movie/').on('value', (movies) => {
            const sortedMovies = _.sortBy(_.values(movies.val()), 'dateAdded').reverse();
            discoverMatchingGenre('movie', getGenreId(sortedMovies))
                .then((result) => {
                    this.setState({
                        loading: this.state.tvShows.length === 0,
                        movies: sortedMovies,
                        recommendedMovies: _.slice(result.results, 0, 10),
                    });
                });
        });
    };

    getTvShows = () => {
        window.firebase.database().ref('tv/').on('value', (tvShows) => {
            const sortedTvShows = _.sortBy(_.values(tvShows.val()), 'dateAdded').reverse()
            discoverMatchingGenre('tv', getGenreId(sortedTvShows))
                .then((result) => {
                    this.setState({
                        loading: this.state.movies.length === 0,
                        tvShows: sortedTvShows,
                        recommendedTvShows: _.slice(result.results, 0, 10),
                    });
                });
        });
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
        this.props.navigator.push('details', {
            id: selectedItemId,
            type: type,
        });
    };

    goToMovies = () => {
        this.props.navigation.getNavigator('main').jumpToItem('movies');
    };

    goToTvShows = () => {
        this.props.navigation.getNavigator('main').jumpToItem('tvshows');
    };

    renderRecentlyAddedMovies = () => {
        return (
            <View style={styles.scrollList}>
                <View style={styles.headingContainer}>
                    <TitleText style={styles.heading}>My Recent Movies</TitleText>
                    <Button color="#D32F2F" onPress={this.goToMovies} title="View More" />
                </View>
                {this.renderItemList(this.state.movies, 'movie')}
            </View>
        );
    };

    renderRecommendedMovies = () => {
        return (
            <View style={styles.scrollList}>
                <View style={styles.headingContainer}>
                    <TitleText style={styles.heading}>Recommended Movies</TitleText>
                </View>
                {this.renderItemList(this.state.recommendedMovies, 'movie')}
            </View>
        );
    };

    renderRecentlyAddedTvShows = () => {
        return (
            <View style={styles.scrollList}>
                <View style={styles.headingContainer}>
                    <TitleText style={styles.heading}>My Recent TV Shows</TitleText>
                    <Button color="#D32F2F" onPress={this.goToTvShows} title="View More" />
                </View>
                {this.renderItemList(this.state.tvShows, 'tv')}
            </View>
        );
    };

    renderRecommendedTvShows = () => {
        return (
            <View style={styles.scrollList}>
                <View style={styles.headingContainer}>
                    <TitleText style={styles.heading}>Recommended TV Shows</TitleText>
                </View>
                {this.renderItemList(this.state.recommendedTvShows, 'tv')}
            </View>
        );
    };

    renderItemList = (items, type) => {
        const itemList = _.slice(items, 0, 10).map((item) => {
            return {
                id: item.id,
                poster: item.poster || item.poster_path,
                title: item.title || item.name,
            };
        });
        return <ItemList list={itemList} onClick={(id) => this.goToDetails(id, type)} noWrap />;
    };

    render() {
        return (
            <View style={styles.container}>
                <LoadingContainer loading={this.state.loading}>
                    <ScrollView style={styles.content}>
                        {this.renderRecentlyAddedMovies()}
                        {this.renderRecommendedMovies()}
                        {this.renderRecentlyAddedTvShows()}
                        {this.renderRecommendedTvShows()}
                    </ScrollView>
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

function getGenreId(items) {
    const genreIds = _.uniq(_.flatten(items.map(item => {
        return item.genres.map(g => g.id);
    })));
    return (genreIds.length > 1) ? genreIds[Math.floor(Math.random() * genreIds.length)] : genreIds[0];
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
});
