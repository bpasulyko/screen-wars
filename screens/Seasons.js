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
    static route = {
        navigationBar: {
            backgroundColor: '#171717',
            tintColor: '#EEE',
            renderTitle: ({ config: { eventEmitter }, params }) => {
                return <NavBarTitle title="Seasons" emitter={eventEmitter} />;
            },
        },
    }

    state = {
        loading: true,
        id: null,
        seasons: [],
        inCollection: false,
    };

    componentDidMount() {
        const params = this.props.route.params;
        this.setState({
            loading: false,
            seasons: _.filter(this.props.route.params.seasons, (season) => season.season_number > 0),
            id: params.id,
            inCollection: params.inCollection,
        });
    }

    goToEpisodes = (seasonId) => {
        const seasonNumber = _.find(this.state.seasons, { id: seasonId }).season_number;
        this.props.navigator.push(Router.getRoute('episodes', {
            tvId: this.state.id,
            seasonNumber: seasonNumber,
            inCollection: this.state.inCollection
        }));
    };

    renderItemList = () => {
        const itemList = _.sortBy(this.state.seasons, 'release_date').map((item) => {
            return {
                id: item.id,
                poster: item.poster_path,
                title: 'Season ' + item.season_number,
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
