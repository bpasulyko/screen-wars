import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Rating from './Rating';
import BodyText from '../BodyText';

const SubHeader = React.createClass({
    propTypes: {
        itemDetails: React.PropTypes.shape(),
        onSeasonsClick: React.PropTypes.func,
    },

    renderMovieTagLine(item) {
        return (
            <View style={styles.detailsContainer}>
                <BodyText style={styles.tagline}>{item.tagline.toUpperCase()}</BodyText>
            </View>
        );
    },

    renderEpisodesSection(item) {
        return (
            <TouchableHighlight onPress={() => this.props.onSeasonsClick()} style={styles.detailsContainer}>
                <View style={styles.details}>
                    <View>
                        <BodyText style={styles.seasons}>{item.number_of_seasons + ' seasons'}</BodyText>
                        <BodyText style={styles.seasons}>{item.number_of_episodes + ' episodes'}</BodyText>
                    </View>
                    <FontAwesome name="chevron-right" size={14} style={styles.icon} />
                </View>
            </TouchableHighlight>
        );
    },

    render() {
        const item = this.props.itemDetails;
        const details = (item.type === 'movie')
            ? this.renderMovieTagLine(item)
            : this.renderEpisodesSection(item);
        return (
            <View style={styles.subheader}>
                <View style={styles.ratingContainer}>
                    <Rating rating={item.vote_average} />
                </View>
                {details}
            </View>
        );
    }
});

export default SubHeader;

const WIDTH = Dimensions.get('window').width / 4;

const styles = StyleSheet.create({
    subheader: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    ratingContainer: {
        flex: 0.3,
    },
    detailsContainer: {
        flex: 0.7,
        borderRadius: 4,
        marginLeft: 20,
    },
    details: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingVertical: 10,
        borderRadius: 4,
    },
    tagline: {
        color: '#EEE',
        fontStyle: 'italic',
        textAlign: 'center',
        fontSize: 15,
    },
    seasons: {
        color: '#EEE',
        fontSize: 18,
    },
    icon: {
        color: '#EEE',
    }
});
