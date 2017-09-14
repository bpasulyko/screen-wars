import React, { PropTypes } from 'react';
import _ from 'lodash';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import ListTypes from '../util/ListTypes';
import SortOptions from '../util/SortOptions';
import { filterByGenre, filterByString } from '../util/Common';
import LoadingContainer from '../components/LoadingContainer';
import NavBarTitle from '../components/NavBarTitle';
import ItemList from '../components/ItemList';
import NoItems from '../components/NoItems';
import { FontAwesome } from '@expo/vector-icons';
import Router from '../navigation/Router';
import FilterMenu from '../components/FilterMenu';
import { getMainColor } from '../util/themeUtil';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

const MovieList = ({ state, listType, goToDetails }) => {
    let filteredMovies = listType.filter(state.movies);
    if (state.selectedGenre) filteredMovies = filterByGenre(filteredMovies, state.selectedGenre);
    if (state.selectedSort !== null) filteredMovies = SortOptions[state.selectedSort].sort(filteredMovies);
    if (state.searchString) filteredMovies = filterByString(filteredMovies, state.searchString);
    const text = `You haven't added any movies to your ${listType.name}!`;
    const itemList = filteredMovies.map((item) => {
        return {
            id: item.id,
            poster: item.poster,
            title: item.title,
        };
    });
    return (filteredMovies.length > 0)
                ? <ItemList list={itemList} onClick={goToDetails} type="Movies" />
                : <NoItems icon={listType.icon} text={text} />;
};

export default class Movies extends React.PureComponent {
    state = {
        loading: true,
        movies: [],
        showFilterMenu: false,
        selectedGenre: null,
        selectedSort: null,
        searchString: null,
        index: 0,
        routes: [
            { key: '1', title: ListTypes.COLLECTION.title },
            { key: '2', title: ListTypes.WATCHLIST.title },
            { key: '3', title: ListTypes.FAVORITES.title },
        ],
    };

    componentDidMount() {
        window.firebase.database().ref('movie/').on('value', (movies) => {
            this.setState({
                loading: false,
                movies: _.sortBy(_.values(movies.val()), 'title'),
            })
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.navigation.state.params) {
            this.handleFilter();
        }
    }

    goToDetails = (selectedMovieId) => {
        this.props.navigation.navigate('MovieDetails', {
            id: selectedMovieId,
            type: 'movie',
        });
    };

    handleIndexChange = index => this.setState({ index });

    handleFilter = () => {
        this.setState({
            showFilterMenu: !this.state.showFilterMenu,
            selectedGenre: null,
            selectedSort: null,
        });
    };

    handleGenreChange = (selectedGenre) => {
        this.setState({ selectedGenre });
    };

    handleSortChange = (selectedSort) => {
        this.setState({ selectedSort });
    };

    handleSearchChange = (searchString) => {
        this.setState({ searchString });
    };

    renderHeader = props => {
        return (
            <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: getMainColor() }}
                style={{ backgroundColor: '#171717' }}
                labelStyle={{ color: '#EEE' }}
            />
        );
    };

    renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return (<MovieList state={this.state} listType={ListTypes.COLLECTION} goToDetails={this.goToDetails} />);
            case '2':
                return (<MovieList state={this.state} listType={ListTypes.WATCHLIST} goToDetails={this.goToDetails} />);
            case '3':
                return (<MovieList state={this.state} listType={ListTypes.FAVORITES} goToDetails={this.goToDetails} />);
            default:
                return null;
        };
    };

    render() {
        return (
            <View style={styles.container}>
                <FilterMenu
                    show={this.state.showFilterMenu}
                    selectedGenre={this.state.selectedGenre}
                    selectedSort={this.state.selectedSort}
                    onGenreChange={this.handleGenreChange}
                    onSortChange={this.handleSortChange}
                    clearFilter={this.handleClearFilter}
                    searchString={this.state.searchString}
                    onSearchChange={this.handleSearchChange}
                />
                <LoadingContainer loading={this.state.loading}>
                    <TabViewAnimated
                        navigationState={this.state}
                        renderScene={this.renderScene}
                        renderHeader={this.renderHeader}
                        onIndexChange={this.handleIndexChange}
                    />
                </LoadingContainer>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
    },
});
