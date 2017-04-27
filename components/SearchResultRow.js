import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';
import { getImageConfig } from '../repository/tmdbRepo';

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
        return (
            <TouchableHighlight onPress={this.props.onResultSelect}>
                <View style={styles.resultRow}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: imageUrl }} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text} ellipsizeMode='tail' numberOfLines={1}>{title}</Text>
                        {year && <Text style={styles.text}>{year}</Text>}
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
    },
    textContainer: {
        paddingLeft: 10,
        width: 250,
    },
    text: {
        color: '#EEE',
        fontSize: 16,
    }
});
