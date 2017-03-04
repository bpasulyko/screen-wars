import React from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import TextBubble from '../TextBubble';

const Genres = React.createClass({
    propTypes: {
        itemDetails: React.PropTypes.shape(),
    },

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>GENRES</Text>
                <View style={styles.genreContainer}>
                    {this.props.itemDetails.genres.map((genre, key) => {
                        return <TextBubble key={key}>{window.genres[genre].name}</TextBubble>;
                    })}
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
        color: '#EEE',
        paddingBottom: 5,
    },
});
