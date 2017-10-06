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
import SearchBox from '../components/SearchBox';
import { getMainColor } from '../util/themeUtil';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

const TvList = ({ state, listType, goToDetails }) => {
    let filteredTvShows = listType.filter(state.tvShows);
    if (state.selectedGenre) filteredTvShows = filterByGenre(filteredTvShows, state.selectedGenre);
    if (state.selectedSort !== null) filteredTvShows = SortOptions[state.selectedSort].sort(filteredTvShows);
    if (state.searchString) filteredTvShows = filterByString(filteredTvShows, state.searchString);
    const text = `You haven't added any tv shows to your ${listType.name}!`;
    const itemList = filteredTvShows.map((item) => {
        return {
            id: item.id,
            poster: item.poster,
            title: item.title,
        };
    });
    return (filteredTvShows.length > 0)
                ? <ItemList list={itemList} onClick={goToDetails} type="TV Shows" />
                : <NoItems icon={listType.icon} text={text} />;
};

export default class TvShows extends React.PureComponent {
    state = {
        loading: true,
        tvShows: [],
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
        window.firebase.database().ref('tv/').on('value', (tvShows) => {
            this.setState({
                loading: false,
                tvShows: _.sortBy(_.values(tvShows.val()), 'title'),
            })
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.navigation.state.params) {
            this.handleFilter();
        }
    }

    goToDetails = (selectedTvShowId) => {
        this.props.navigation.navigate('TvDetails', {
            id: selectedTvShowId,
            type: 'tv',
        });
    };

    handleIndexChange = index => this.setState({ index });

    handleFilter = () => {
        this.setState({ showFilterMenu: !this.state.showFilterMenu });
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

    handleClearFilter = () => {
        this.setState({
            selectedGenre: null,
            selectedSort: null,
        });
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
                return (<TvList state={this.state} listType={ListTypes.COLLECTION} goToDetails={this.goToDetails} />);
            case '2':
                return (<TvList state={this.state} listType={ListTypes.WATCHLIST} goToDetails={this.goToDetails} />);
            case '3':
                return (<TvList state={this.state} listType={ListTypes.FAVORITES} goToDetails={this.goToDetails} />);
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
                    onClose={this.handleFilter}
                    onClear={this.handleClearFilter}
                />
                <SearchBox
                    value={this.state.searchString}
                    onClear={() => this.handleSearchChange(null)}
                    onChange={(searchString) => this.handleSearchChange(searchString)}
                    onSubmit={() => {}}
                    containerStyle={{ height: 45 }}
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
