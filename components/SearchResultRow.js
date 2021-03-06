import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getImageConfig } from '../repository/tmdbRepo';
import BodyText from './BodyText';

class SearchResultRow extends React.Component {
    static propTypes = {
        rowData: PropTypes.object,
        onResultSelect: PropTypes.func,
    }

    render() {
        const imageConfig = getImageConfig();
        const baseUrl = imageConfig.base_url;
        const size = imageConfig.poster_sizes[0];
        const imageUrl = `${baseUrl}${size}${this.props.rowData.poster_path}`;
        const releaseDate = this.props.rowData.first_air_date || this.props.rowData.release_date;
        const title = this.props.rowData.title || this.props.rowData.name;
        const year = (releaseDate) ? `(${releaseDate.split('-')[0]})` : null;
        const icon = (this.props.rowData.media_type === 'movie' ? 'film' : 'tv');
        const posterImage = (this.props.rowData.poster_path)
            ? <Image style={styles.poster} source={{ uri: imageUrl }} />
            : <View style={[styles.poster, styles.noImage]}><FontAwesome name={icon} size={20} style={styles.icon} /></View>
        return (
            <TouchableHighlight onPress={this.props.onResultSelect}>
                <View style={styles.resultRow}>
                    <View style={styles.imageContainer}>
                        {posterImage}
                    </View>
                    <View style={styles.textContainer}>
                        <BodyText style={styles.text} ellipsizeMode='tail' numberOfLines={1}>{title}</BodyText>
                        {year && <BodyText style={styles.text}>{year}</BodyText>}
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

export default SearchResultRow;

const styles = StyleSheet.create({
    resultRow: {
        backgroundColor: '#444',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#555',
        borderBottomWidth: 1,
        padding: 5,
    },
    imageContainer: {
        elevation: 4,
        borderRadius: 2,
        width: 39,
        height: 60,
    },
    poster: {
        borderRadius: 2,
        flex: 1,
    },
    noImage: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#171717',
    },
    textContainer: {
        paddingHorizontal: 10,
        width: 270,
    },
    text: {
        color: '#EEE',
        fontSize: 16,
    },
    icon: {
        color: '#555',
    }
});
