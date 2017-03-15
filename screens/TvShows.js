import React from 'react';
import _ from 'lodash';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LoadingContainer from '../components/LoadingContainer';
import NavBarTitle from '../components/NavBarTitle';
import ItemList from '../components/ItemList';
import DeleteModal from '../components/DeleteModal';
import { FontAwesome } from '@expo/vector-icons';
import Router from '../navigation/Router';

export default class TvShows extends React.Component {
    static route = {
        navigationBar: {
            backgroundColor: '#171717',
            renderTitle: ({ config: { eventEmitter }, params }) => {
                return <NavBarTitle title="TV" emitter={eventEmitter}/>;
            },
        },
    }

    state = {
        loading: true,
        tvShows: [],
    };

    componentDidMount = () => {
        window.firebase.database().ref('tv/').on('value', (tvShows) => {
            this.setState({
                loading: false,
                tvShows: _.sortBy(_.values(tvShows.val()), 'title'),
            })
        });
    };

    goToDetails = (selectedTvShow) => {
        this.props.navigator.push(Router.getRoute('details', {
            item: selectedTvShow,
            type: 'tv',
            inCollection: true,
        }));
    };

    render() {
        const TvShowList = (
            <ScrollView>
                <ItemList list={this.state.tvShows} onClick={this.goToDetails} />
            </ScrollView>
        );
        const NoTvShows = (
            <View style={styles.noTvShows}>
                <FontAwesome name="tv" size={100} style={styles.icon} />
                <Text style={styles.noTvShowsText}>You haven't added any TV shows to your collection!</Text>
            </View>
        );
        return (
            <View style={styles.container}>
                <LoadingContainer loading={this.state.loading}>
                    {this.state.tvShows.length > 0 && TvShowList || NoTvShows}
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
    noTvShows: {
        padding: 20,
    },
    icon: {
        color: '#888',
        textAlign: 'center',
        marginBottom: 20,
    },
    noTvShowsText: {
        color: '#EEE',
        fontSize: 20,
        textAlign: 'center',
    }
});
