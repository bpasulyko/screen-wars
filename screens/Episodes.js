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
import moment from 'moment';

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
        loading: true,
        seasonData: null,
    };

    componentDidMount() {
        const params = this.props.route.params;
        return getSeason(params.tvId, params.seasonNumber)
            .then((responseJson) => {
                this.setState({
                    seasonData: responseJson,
                    loading: false,
                });
            });
    }

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
                {this.state.seasonData.episodes.map((episode, key) => {
                    const imageConfig = getImageConfig();
                    const baseUrl = imageConfig.base_url;
                    const stillSize = imageConfig.still_sizes[1];
                    const stillUrl = `${baseUrl}${stillSize}${episode.still_path}`;
                    const stillImage = (episode.still_path)
                        ? <Image style={styles.stillImage} source={{ uri: stillUrl }} />
                        : <View style={[styles.stillImage, styles.noImage]}><FontAwesome name="tv" size={20} style={styles.icon} /></View>
                    return (
                        <View key={key} style={styles.episodeRow}>
                            <View style={styles.episodeSummary}>
                                {stillImage}
                                <View style={styles.episodeHeading}>
                                    <TitleText style={[styles.text, styles.episodeTitle]}>{episode.episode_number + '. ' + episode.name}</TitleText>
                                    <BodyText style={styles.text}>{moment(episode.air_date).format('MMMM D, YYYY')}</BodyText>
                                </View>
                            </View>
                            <View style={styles.episodeDetails}>
                                <BodyText>DETAILS</BodyText>
                            </View>
                        </View>
                    );
                })}
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
    stillImage: {
        width: 100,
        height: 56,
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
    episodeRow: {
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#555',
    },
    episodeSummary: {
        flexDirection: 'row',
    },
    episodeHeading: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'space-around',
    },
    episodeTitle: {
        fontSize: 16,
    },
    episodeDetails: {
        height: 0,
    },
});
