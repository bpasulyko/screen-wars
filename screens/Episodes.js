import React from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
} from 'react-native';

import LoadingContainer from '../components/LoadingContainer';
import NavBarTitle from '../components/NavBarTitle';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import { FontAwesome } from '@expo/vector-icons';
import Router from '../navigation/Router';
import { getImageConfig, getSeason } from '../repository/tmdbRepo';
import EpisodeList from '../components/episodes/EpisodeList';

export default class Episodes extends React.Component {
    static route = {
        navigationBar: {
            backgroundColor: '#171717',
            tintColor: '#EEE',
            renderTitle: ({ config: { eventEmitter }, params }) => {
                return <NavBarTitle title="Episodes" emitter={eventEmitter} />;
            },
        },
    }

    state = {
        tvId: null,
        loading: true,
        seasonData: null,
        episodeStatus: null,
        inCollection: false,
    };

    componentDidMount() {
        const params = this.props.route.params;
        return getSeason(params.tvId, params.seasonNumber)
            .then((responseJson) => {
                window.firebase.database().ref(`tv/${params.tvId}/episodeStatus`).once('value').then((details) => {
                    this.setState({
                        tvId: params.tvId,
                        seasonData: responseJson,
                        loading: false,
                        episodeStatus: details.val(),
                        inCollection: params.inCollection,
                    });
                });
            });
    }

    handleUpdateEpisodeStatus = (value, episodeId) => {
        const updates = {};
        updates['tv/' + this.state.tvId + '/episodeStatus/' + episodeId] = value;
        window.firebase.database().ref().update(updates);
        const newEpisodeStatus = { ...this.state.episodeStatus };
        newEpisodeStatus[episodeId] = value;
        this.setState({ episodeStatus: newEpisodeStatus });
    };

    renderSeasonSummary = () => {
        const imageConfig = getImageConfig();
        const season = this.state.seasonData;
        const baseUrl = imageConfig.base_url;
        const posterSize = imageConfig.poster_sizes[2];
        const posterImage = (season.poster_path)
            ? <Image style={styles.poster} source={{ uri: `${baseUrl}${posterSize}${season.poster_path}` }} />
            : <View style={[styles.poster, styles.noImage]}><FontAwesome name="tv" size={50} style={styles.icon} /></View>
        return (
            <View style={styles.summary}>
                <View style={styles.headerContainer}>
                    <View style={styles.posterContainer}>{posterImage}</View>
                    <View style={styles.headerContent}>
                        <TitleText style={[styles.text, styles.title]}>
                            {season.name} <BodyText style={styles.year}>({season.air_date.split('-')[0]})</BodyText>
                        </TitleText>
                        <BodyText style={styles.text}>{season.episodes.length + ' Episodes'}</BodyText>
                    </View>
                </View>
                <BodyText style={[styles.text, styles.overview]}>{season.overview}</BodyText>
            </View>
        );
    };

    renderEpisodeList = () => {
        return (
            <View>
                <EpisodeList
                    episodes={this.state.seasonData.episodes}
                    episodeStatus={this.state.episodeStatus}
                    onEpisodeStatusUpdate={this.handleUpdateEpisodeStatus}
                    showSwitch={this.state.inCollection}
                />
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <LoadingContainer loading={this.state.loading}>
                    <ScrollView>
                        {this.state.seasonData && this.renderSeasonSummary()}
                        {this.state.seasonData && this.renderEpisodeList()}
                    </ScrollView>
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
    summary: {
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
    },
    posterContainer: {
        elevation: 5,
        backgroundColor: '#222',
        borderRadius: 4,
    },
    poster: {
        width: 100,
        height: 150,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noImage: {
        backgroundColor: '#171717',
    },
    headerContent: {
        paddingLeft: 10,
        justifyContent: 'center',
    },
    overview: {
        fontSize: 15,
        lineHeight: 25,
        paddingTop: 5,
    },
    title: {
        fontSize: 24,
    },
    text: {
        color: '#EEE',
    },
    year: {
        fontSize: 15,
        fontWeight: 'normal',
    },
    icon: {
        color: '#555',
    },
});
