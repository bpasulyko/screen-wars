import React, { PropTypes } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Animated,
  Switch,
  Image,
} from 'react-native';

import TitleText from '../TitleText';
import BodyText from '../BodyText';
import { FontAwesome } from '@expo/vector-icons';
import { getImageConfig } from '../../repository/tmdbRepo';
import moment from 'moment';
import Accordion from 'react-native-accordion';

const EpisodeRow = React.createClass({
    propTypes: {
        episode: PropTypes.object,
        episodeStatus: PropTypes.bool,
        showSwitch: PropTypes.bool,
        onEpisodeStatusUpdate: PropTypes.func,
    },

    renderHeader() {
        const episode = this.props.episode;
        const imageConfig = getImageConfig();
        const baseUrl = imageConfig.base_url;
        const stillSize = imageConfig.still_sizes[1];
        const stillUrl = `${baseUrl}${stillSize}${episode.still_path}`;
        const stillImage = (episode.still_path)
            ? <Image style={styles.stillImage} source={{ uri: stillUrl }} />
            : <View style={[styles.stillImage, styles.noImage]}><FontAwesome name="tv" size={20} style={styles.icon} /></View>
        const airDate = moment(episode.air_date).format('MMMM D, YYYY');
        const rating = episode.vote_average.toFixed(1);
        return (
            <View style={styles.episodeSummary}>
                {stillImage}
                <View style={styles.episodeHeading}>
                    <TitleText style={[styles.text, styles.episodeTitle]}>{episode.episode_number + '. ' + episode.name}</TitleText>
                    <BodyText style={styles.text}><FontAwesome name="star" size={12} style={styles.starIcon} />{rating + ' | ' + airDate}</BodyText>
                </View>
                {this.props.showSwitch && <Switch
                    onValueChange={(value) => this.props.onEpisodeStatusUpdate(value, episode.id)}
                    value={this.props.episodeStatus}
                    onTintColor="rgba(211, 47, 47, 0.7)"
                    thumbTintColor="rgba(211, 47, 47, 1)"
                    tintColor="#111"
                />}
            </View>
        );
    },

    renderContent() {
        return <BodyText style={[styles.text, styles.overview]}>{this.props.episode.overview}</BodyText>;
    },

    render() {
        return (
            <Accordion
                header={this.renderHeader()}
                content={this.renderContent()}
                easing="easeOutCubic"
            />
        );
    }
});

export default EpisodeRow;

const styles = StyleSheet.create({
    episodeSummary: {
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#555',
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
    text: {
        color: '#EEE',
    },
    overview: {
        lineHeight: 25,
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    stillImage: {
        width: 100,
        height: 56,
    },
    noImage: {
        backgroundColor: '#171717',
    },
    starIcon: {
        color: '#FFC107',
    },
})
