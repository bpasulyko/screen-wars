import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

const SearchResultRow = React.createClass({
    propTypes: {
        image: React.PropTypes.string,
        title: React.PropTypes.string,
        year: React.PropTypes.string,
    },

    render() {
        const baseUrl = window.imageConfig.base_url;
        const size = 'original';
        const path = this.props.image;
        const imageUrl = `${baseUrl}${size}${path}`;

        const year = (this.props.year) ? `(${this.props.year.split('-')[0]})` : null;
        return (
            <View style={styles.resultRow}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: imageUrl }} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text} ellipsizeMode='tail' numberOfLines={1}>{this.props.title}</Text>
                    {year && <Text style={styles.text}>{year}</Text>}
                </View>
            </View>
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
        elevation: 5,
        backgroundColor: '#444',
    },
    image: {
        width: 39,
        height: 60,
        borderRadius: 4,
        borderWidth:1,
        borderColor: '#777',
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
