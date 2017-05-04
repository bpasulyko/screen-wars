import React, { PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  Dimensions,
} from 'react-native';
import TitleText from '../TitleText';

import { getImageConfig } from '../../repository/tmdbRepo';

const CollectionSection = React.createClass({
    propTypes: {
        collectionData: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            poster_path: PropTypes.string,
            backdrop_path: PropTypes.string,
        }),
    },

    goToCollection() {
        console.log(this.props.collectionData.id);
    },

    render() {
        const imageConfig = getImageConfig();
        const baseUrl = imageConfig.base_url;
        const backdropSize = imageConfig.backdrop_sizes[1];
        const backdropUrl = `${baseUrl}${backdropSize}${this.props.collectionData.backdrop_path}`;
        return (
            <View>
                <Image style={styles.collectionBackdrop} source={{ uri: backdropUrl }}>
                    <TitleText style={styles.collectionTitle}>{"Part of the " + this.props.collectionData.name}</TitleText>
                    <TouchableHighlight onPress={this.goToCollection} style={styles.collectionLink}>
                        <View>
                            <TitleText style={styles.collectionLinkText}>View Collection</TitleText>
                        </View>
                    </TouchableHighlight>
                </Image>
            </View>
        );
    }
});

export default CollectionSection;

const WIDTH = Dimensions.get('window').width;
const BACKDROP_HEIGHT = WIDTH * 0.5625;

const styles = StyleSheet.create({
    collectionBackdrop: {
        width: WIDTH,
        height: BACKDROP_HEIGHT,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    collectionTitle: {
        color: '#EEE',
        fontSize: 20,
        textShadowColor: 'black',
        textShadowOffset: {
            width: 2,
            height: 2,
        },
        textShadowRadius: 10,
    },
    collectionLink: {
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        borderRadius: 50,
        padding: 10,
    },
    collectionLinkText: {
        color: '#EEE',
        fontSize: 20,
        textAlign: 'center',
    }
})
