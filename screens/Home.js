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
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import LoadingContainer from '../components/LoadingContainer';
import NavBarTitle from '../components/NavBarTitle';
import SearchResults from '../components/SearchResults';
import TitleText from '../components/TitleText';
import ItemList from '../components/ItemList';
import SearchBox from '../components/SearchBox';
import { multiSearch, discoverMatchingGenre } from '../repository/tmdbRepo';

export default class Home extends React.Component {
    state = {
        loading: true,
        queryString: null,
        searchResults: null,
        movies: [],
        recommendedMovies: [],
        tvShows: [],
        recommendedTvShows: [],
    };

    componentDidMount() {
        this.getMovies();
        this.getTvShows();
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

    refreshRecommendedMovies = () => {
        discoverMatchingGenre('movie', getGenreId(this.state.movies))
            .then((result) => {
                this.setState({ recommendedMovies: _.slice(result.results, 0, 10) });
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

    refreshRecommendedTvShows = () => {
        discoverMatchingGenre('tv', getGenreId(this.state.tvShows))
            .then((result) => {
                this.setState({ recommendedTvShows: _.slice(result.results, 0, 10) });
            });
    };

    setQueryString = (queryString) => {
        this.setState({ queryString });
    };

    handleSearchSubmit = (e) => {
        return multiSearch(e.nativeEvent.text).then((results) => this.setState({ searchResults: results }));
    };

    clearSearch = () => {
        this.setState({
            searchResults: null,
            queryString: null,
        });
    };

    goToDetails = (selectedItemId, type) => {
        this.props.navigation.navigate('HomeDetails', {
            id: selectedItemId,
            type: type,
        });
    };

    goToMovies = () => {
        this.props.navigation.navigate('Movies');
    };

    goToTvShows = () => {
        this.props.navigation.navigate('Tvshows');
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
                    <TouchableOpacity onPress={this.refreshRecommendedMovies}>
                        <FontAwesome name="refresh" size={24} style={{ color: '#EEE' }} />
                    </TouchableOpacity>
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
                    <TouchableOpacity onPress={this.refreshRecommendedTvShows}>
                        <FontAwesome name="refresh" size={24} style={{ color: '#EEE' }} />
                    </TouchableOpacity>
                </View>
                {this.renderItemList(this.state.recommendedTvShows, 'tv')}
            </View>
        );
    };

    renderItemList = (items, type) => {
        const moviesMap = _.keyBy(this.state.movies, 'id');
        const tvMap = _.keyBy(this.state.tvShows, 'id');
        const itemList = _.slice(items, 0, 10).map((item) => {
            return {
                id: item.id,
                poster: item.poster || item.poster_path,
                title: item.title || item.name,
                inCollection: (type === 'movie')
                    ? !!moviesMap[item.id]
                    : !!tvMap[item.id],
            };
        });
        return <ItemList list={itemList} onClick={(id) => this.goToDetails(id, type)} noWrap />;
    };

    renderSearchBox = () => {
        return (
            <SearchBox
                value={this.state.queryString}
                onClear={this.clearSearch}
                editable={!this.state.loading}
                onChange={this.setQueryString}
                onSubmit={this.handleSearchSubmit}
            />
        );
    };

    renderHomeContent = () => {
        return (
            <ScrollView style={styles.content}>
                {this.renderRecentlyAddedMovies()}
                {this.renderRecommendedMovies()}
                {this.renderRecentlyAddedTvShows()}
                {this.renderRecommendedTvShows()}
            </ScrollView>
        );
    };

    renderSearchResults = () => {
        return (
            <SearchResults
                results={this.state.searchResults}
                onResultSelect={this.goToDetails}
            />
        );
    };

    render() {
        return (
            <View style={styles.container}>
                {this.renderSearchBox()}
                <LoadingContainer loading={this.state.loading}>
                    {this.renderHomeContent()}
                </LoadingContainer>
                {this.state.searchResults && this.renderSearchResults()}
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
