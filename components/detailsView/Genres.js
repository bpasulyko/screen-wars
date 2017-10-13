import React from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View,
} from 'react-native';
import TextBubble from '../TextBubble';
import BodyText from '../BodyText';
import TitleText from '../TitleText';

const Genres = React.createClass({
    propTypes: {
        itemDetails: React.PropTypes.shape(),
    },

    render() {
        return (
            <View style={styles.container}>
                <TitleText style={styles.title}>Genres</TitleText>
                <View style={styles.genreContainer}>
                    {this.props.itemDetails.genres.map((genre, key) => {
                        return <TextBubble key={key}>{genre.name}</TextBubble>;
                    })}
                </View>
            </View>
        );
    }
});

export default Genres;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    genreContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'center',
    },
    title: {
        fontSize: 20,
        color: '#EEE',
        paddingBottom: 5,
    },
});
