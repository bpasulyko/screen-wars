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

export default class Collection extends React.Component {
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
        seasons: [],
    };

    componentDidMount() {
        const params = this.props.route.params;
        this.setState({
            loading: false,
            seasons: _.filter(this.props.route.params.seasons, (season) => season.season_number > 0),
        });
    }

    goToSeason = (seasonId) => {
        // this.props.navigator.replace(Router.getRoute('episodeList', {
        //     id: seasonId,
        // }));
    };

    renderItemList = () => {
        const itemList = _.sortBy(this.state.seasons, 'release_date').map((item) => {
            return {
                id: item.id,
                poster: item.poster_path,
                title: item.title,
            };
        });
        return <ItemList list={itemList} onClick={this.goToSeason} />;
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
