import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getImageConfig } from '../repository/tmdbRepo';
import BodyText from './BodyText';

const SearchResultRow = React.createClass({
    propTypes: {
        rowData: React.PropTypes.object,
        onResultSelect: React.PropTypes.func,
    },

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
            ? <Image style={styles.image} source={{ uri: imageUrl }} />
            : <View style={styles.image}><FontAwesome name={icon} size={20} style={styles.icon} /></View>
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
});

export default SearchResultRow;

const styles = StyleSheet.create({
    resultRow: {
        backgroundColor: '#444',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#555',
        borderBottomWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    imageContainer: {
        elevation: 2,
        backgroundColor: '#444',
        borderRadius: 4,
    },
    image: {
        width: 39,
        height: 60,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#171717',
    },
    textContainer: {
        paddingLeft: 10,
        width: 250,
    },
    text: {
        color: '#EEE',
        fontSize: 16,
    },
    icon: {
        color: '#555',
    }
});
