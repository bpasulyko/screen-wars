import React from 'react';
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

    formatRuntime(runtime) {
        const hours = Math.floor(runtime/60);
        const mins = runtime%60;
        return (hours > 0) ? `${hours}h ${mins}min` : `${mins}min`;
    },

    render() {
        const item = this.props.itemDetails;
        const baseUrl = window.imageConfig.base_url;
        const posterSize = window.imageConfig.poster_sizes[2];
        const posterUrl = `${baseUrl}${posterSize}${item.poster}`;
        const year = (item.releaseDate) ? item.releaseDate.split('-')[0] : '';
        const runtime = (item.type === 'movie') ? item.runtime : item.episode_run_time[0];
        const formattedRuntime = this.formatRuntime(runtime);
        return (
            <View style={styles.headerContainer}>
                <View style={styles.posterContainer}>
                    <Image style={styles.poster} source={{ uri: posterUrl }} />
                </View>
                <View style={styles.headerContent}>
                    <Text style={[styles.text, styles.title]}>{item.title} ({year})</Text>
                    <View>
                        <Text style={styles.text}>Directed by:</Text>
                        <Text style={styles.text}>Some Director Person</Text>
                    </View>
                    <Text style={[styles.text, styles.runtime]}>{formattedRuntime}</Text>
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
        fontSize: 24,
    },
    runtime: {
        fontSize: 20,
    },
    text: {
        fontFamily: 'star-wars',
        color: '#EEE',
    }
});
