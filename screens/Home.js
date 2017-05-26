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
import Router from '../navigation/Router';
import { multiSearch, discoverMatchingGenre } from '../repository/tmdbRepo';

export default class Home extends React.Component {
    static route = {
        navigationBar: {
            backgroundColor: '#171717',
            renderTitle: ({ config: { eventEmitter }, params }) => {
                return <NavBarTitle title="Screen Wars" emitter={eventEmitter}/>;
            },
        }
    }

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

    setQueryString = (queryString) => {
        this.setState({ queryString });
    };

    handleSearchSubmit = (e) => {
        return multiSearch(e.nativeEvent.text).then((results) => this.setState({ searchResults: results }));
    };

    clearSearch = () => {
        this.refs['search_input'].blur();
        this.refs['search_input'].clear();
        this.setState({
            searchResults: null,
            queryString: null,
        });
    };

    goToDetails = (selectedItemId, type) => {
        this.props.navigator.push(Router.getRoute('details', {
            id: selectedItemId,
            type: type,
        }));
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

    renderSearchBox = () => {
        return (
            <View style={styles.searchContainer}>
                <FontAwesome name="search" size={18} style={styles.searchIcon} />
                <TextInput
                    ref="search_input"
                    style={styles.input}
                    editable={!this.state.loading}
                    placeholder="Search"
                    returnKeyType='search'
                    selectTextOnFocus
                    onChangeText={this.setQueryString}
                    onSubmitEditing={this.handleSearchSubmit}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                {this.state.queryString && (
                    <TouchableOpacity onPress={this.clearSearch}>
                        <FontAwesome name="times" size={18} style={styles.searchIcon} />
                    </TouchableOpacity>
                )}
            </View>
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#171717',
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: 50,
        elevation: 5,
    },
    input: {
        flex: 1,
        color: '#EEE',
        fontFamily: 'raleway',
    },
    searchIcon: {
        color:'#BBB',
        marginRight: 5,
    },
});
