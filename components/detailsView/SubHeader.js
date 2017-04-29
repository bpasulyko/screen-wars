import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
} from 'react-native';
import Rating from './Rating';
import BodyText from '../BodyText';

const SubHeader = React.createClass({
    propTypes: {
        itemDetails: React.PropTypes.shape(),
    },

    render() {
        const item = this.props.itemDetails;
        return (
            <View style={styles.subheader}>
                <View style={styles.ratingContainer}>
                    <Rating rating={item.vote_average} />
                </View>
                <View style={styles.detailsContainer}>
                    {item.type == 'movie' && <BodyText style={styles.tagline}>{item.tagline.toUpperCase()}</BodyText>}
                    {item.type === 'tv' && <BodyText style={styles.seasons}>{item.number_of_seasons + ' seasons'}</BodyText>}
                    {item.type === 'tv' && <BodyText style={styles.seasons}>{item.number_of_episodes + ' episodes'}</BodyText>}
                </View>
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
        paddingVertical: 25,
    },
    ratingContainer: {
        width: 100,
    },
    detailsContainer: {
        width: 240,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 10,
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
        paddingLeft: 10,
    },
});
