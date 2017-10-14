import React from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getImageConfig } from '../../repository/tmdbRepo';
import BodyText from '../BodyText';
import TitleText from '../TitleText';

const Header = React.createClass({
    propTypes: {
        itemDetails: React.PropTypes.shape(),
        onPosterPress: React.PropTypes.func,
    },

    formatYear() {
        const item = this.props.itemDetails;
        if (item.type === 'movie') {
            return item.release_date.split('-')[0];
        } else {
            return (item.status === 'Ended')
                ? `${item.first_air_date.split('-')[0]}-${item.last_air_date.split('-')[0]}`
                : `${item.first_air_date.split('-')[0]}-`;
        }
    },

    formatRuntime() {
        const item = this.props.itemDetails;
        const runtime = (item.type === 'movie') ? item.runtime : item.episode_run_time[0];
        const hours = Math.floor(runtime/60);
        const mins = runtime%60;
        return (hours > 0) ? `${hours}h ${mins}min` : `${mins}min`;
    },

    renderDirectorSection() {
        const item = this.props.itemDetails;
        const directors = (item.type === 'movie')
            ? _.filter(item.credits.crew, { job: 'Director' })
            : item.created_by
        const label = (item.type === 'movie') ? 'Directed by' : 'Created by';
        return (
            <View>
                <BodyText style={[styles.text, { fontSize: 11 }]}>{label}</BodyText>
                <BodyText style={[styles.text, { fontSize: 16 }]}>{directors.map((x) => x.name).join(', ')}</BodyText>
            </View>
        );
    },

    render() {
        const imageConfig = getImageConfig();
        const item = this.props.itemDetails;
        const baseUrl = imageConfig.base_url;
        const posterSize = imageConfig.poster_sizes[2];
        const icon = (item.type === 'movie' ? 'film' : 'tv');
        const posterImage = (item.poster_path)
            ? <Image style={styles.poster} source={{ uri: `${baseUrl}${posterSize}${item.poster_path}` }} />
            : <View style={[styles.poster, styles.noImage]}><FontAwesome name={icon} size={50} style={styles.icon} /></View>
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.posterContainer} onPress={this.props.onPosterPress}>
                    {posterImage}
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <TitleText style={[styles.text, styles.title]}>
                        {item.title || item.name} <BodyText style={styles.year}>({this.formatYear()})</BodyText>
                    </TitleText>
                    {this.renderDirectorSection()}
                    <BodyText style={[styles.text, styles.runtime]}>{this.formatRuntime()}</BodyText>
                </View>
            </View>
        );
    }
});

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
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
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
    },
    runtime: {
        fontSize: 16,
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
    }
});
