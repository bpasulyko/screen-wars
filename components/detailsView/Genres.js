import React from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

const Genres = React.createClass({
    propTypes: {
        itemDetails: React.PropTypes.shape(),
    },

    renderGenresList() {
        const item = this.props.itemDetails;
        return item.genres.map((genre, key) => {
            return <Text key={key} style={styles.genre}>{window.genres[genre].name}</Text>;
        });
    },

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>GENRES</Text>
                <View style={styles.genreContainer}>
                    {this.renderGenresList()}
                </View>
            </View>
        );
    }
});

export default Genres;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    genreContainer: {
        flexDirection: 'row',
    },
    title: {
        fontWeight: '500',
        fontSize: 16,
        color: '#EEE'
    },
    genre: {
        paddingVertical: 3,
        paddingHorizontal: 10,
        backgroundColor: '#444',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#555',
        color: '#EEE',
        margin: 2,
    },
});
