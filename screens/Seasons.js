import React from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import LoadingContainer from '../components/LoadingContainer';
import NavBarTitle from '../components/NavBarTitle';
import ItemList from '../components/ItemList';
import { FontAwesome } from '@expo/vector-icons';
import Router from '../navigation/Router';

import { getImageConfig } from '../repository/tmdbRepo';

export default class Seasons extends React.Component {
    state = {
        loading: true,
        id: null,
        seasons: [],
        inCollection: false,
    };

    componentDidMount() {
        const params = this.props.navigation.state.params;
        this.setState({
            loading: false,
            seasons: _.filter(this.props.navigation.state.params.seasons, (season) => season.season_number > 0),
            seasonStatus: params.seasonStatus,
            id: params.id,
            inCollection: params.inCollection,
        });
    }

    goToEpisodes = (seasonId) => {
        const seasonNumber = _.find(this.state.seasons, { id: seasonId }).season_number;
        this.props.navigation.navigate('Episodes', {
            tvId: this.state.id,
            seasonNumber: seasonNumber,
            inCollection: this.state.inCollection
        });
    };

    renderItemList = () => {
        const itemList = _.sortBy(this.state.seasons, 'release_date').map((item) => {
            return {
                id: item.id,
                poster: item.poster_path,
                title: 'Season ' + item.season_number,
                inCollection: _.values(this.state.seasonStatus[item.season_number]).filter(x => x).length === item.episode_count,
            };
        });
        return <ItemList list={itemList} onClick={this.goToEpisodes} type="Seasons" />;
    };

    render() {
        return (
            <View style={styles.container}>
                <LoadingContainer loading={this.state.loading}>
                    {this.renderItemList()}
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
