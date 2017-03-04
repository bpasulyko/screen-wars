import React from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

const Header = React.createClass({
    propTypes: {
        itemDetails: React.PropTypes.shape(),
    },

    formatYear() {
        const item = this.props.itemDetails;
        if (item.type === 'movie') {
            return item.releaseDate.split('-')[0];
        } else {
            return (item.status === 'Ended')
                ? `${item.releaseDate.split('-')[0]}-${item.last_air_date.split('-')[0]}`
                : `${item.releaseDate.split('-')[0]}-`;
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
                <Text style={[styles.text, { fontSize: 11 }]}>{label}</Text>
                <Text style={[styles.text, { fontSize: 16 }]}>{directors.map((x) => x.name).join(', ')}</Text>
            </View>
        );
    },

    render() {
        const item = this.props.itemDetails;
        const baseUrl = window.imageConfig.base_url;
        const posterSize = window.imageConfig.poster_sizes[2];
        return (
            <View style={styles.headerContainer}>
                <View style={styles.posterContainer}>
                    <Image style={styles.poster} source={{ uri: `${baseUrl}${posterSize}${item.poster}` }} />
                </View>
                <View style={styles.headerContent}>
                    <Text style={[styles.text, styles.title]}>{item.title} ({this.formatYear()})</Text>
                    {this.renderDirectorSection()}
                    <Text style={[styles.text, styles.runtime]}>{this.formatRuntime()}</Text>
                </View>
            </View>
        );
    }
});

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
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
    },
    headerContent: {
        flex: 1,
        flexWrap: 'wrap',
        paddingLeft: 10,
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
    },
    runtime: {
        fontSize: 16,
    },
    text: {
        color: '#EEE',
    }
});
