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
import FilterButton from '../components/FilterButton';
import FilterMenu from '../components/FilterMenu';
import ListButtonGroup from '../components/ListButtonGroup';
import SearchBox from '../components/SearchBox';

export default class TvShows extends React.Component {
    static route = {
        navigationBar: {
            backgroundColor: '#171717',
            renderTitle: ({ config: { eventEmitter }, params }) => {
                return <NavBarTitle title="TV" emitter={eventEmitter}/>;
            },
            renderRight: ({ config: { eventEmitter }, params }) => {
                return <FilterButton emitter={eventEmitter} />;
            },
        },
    }

    state = {
        loading: true,
        tvShows: [],
        showFilterMenu: false,
        activeList: ListTypes.COLLECTION,
        selectedGenre: null,
        selectedSort: null,
        searchString: null,
    };

    componentWillMount() {
        this.props.route.getEventEmitter().addListener('filter', this.handleFilter);
    }

    componentDidMount() {
        window.firebase.database().ref('tv/').on('value', (tvShows) => {
            this.setState({
                loading: false,
                tvShows: _.sortBy(_.values(tvShows.val()), 'title'),
            })
        });
    }

    goToDetails = (selectedTvShowId) => {
        this.props.navigator.push(Router.getRoute('details', {
            id: selectedTvShowId,
            type: 'tv',
        }));
    };

    handleFilter = () => {
        this.setState({
            showFilterMenu: !this.state.showFilterMenu,
            selectedGenre: null,
            selectedSort: null,
        });
    };

    handleListButtonClick = (activeList) => {
        this.setState({ activeList });
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

    renderContent = () => {
        const text = `You haven't added any TV shows to your ${this.state.activeList.name}!`
        let filteredTvShows = this.state.activeList.filter(this.state.tvShows);
        if (this.state.selectedGenre) filteredTvShows = filterByGenre(filteredTvShows, this.state.selectedGenre);
        if (this.state.selectedSort !== null) filteredTvShows = SortOptions[this.state.selectedSort].sort(filteredTvShows);
        if (this.state.searchString) filteredTvShows = filterByString(filteredTvShows, this.state.searchString);
        return (filteredTvShows.length > 0)
            ? this.renderItemList(filteredTvShows)
            : <NoItems icon={this.state.activeList.icon} text={text} />;
    };

    renderItemList = (items) => {
        const itemList = items.map((item) => {
            return {
                id: item.id,
                poster: item.poster,
                title: item.title,
            };
        });
        return <ItemList list={itemList} onClick={this.goToDetails} type="TV Shows" />;
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
                />
                <SearchBox
                    value={this.state.searchString}
                    onClear={() => this.handleSearchChange(null)}
                    onChange={(searchString) => this.handleSearchChange(searchString)}
                    onSubmit={() => {}}
                />
                <ListButtonGroup
                    activeList={this.state.activeList}
                    onListButtonClick={this.handleListButtonClick}
                />
                <LoadingContainer loading={this.state.loading}>
                    {this.renderContent()}
                </LoadingContainer>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
