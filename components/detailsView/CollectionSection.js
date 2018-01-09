import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
  Dimensions,
} from 'react-native';
import TitleText from '../TitleText';

import { getImageConfig } from '../../repository/tmdbRepo';

class CollectionSection extends React.Component {
    static propTypes = {
        collectionData: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            poster_path: PropTypes.string,
            backdrop_path: PropTypes.string,
        }),
        onViewLinkClick: PropTypes.func,
    }

    render() {
        const imageConfig = getImageConfig();
        const baseUrl = imageConfig.base_url;
        const backdropSize = imageConfig.backdrop_sizes[1];
        const backdropUrl = `${baseUrl}${backdropSize}${this.props.collectionData.backdrop_path}`;
        return (
            <View style={styles.backdropContainer}>
                <TitleText style={styles.collectionTitle}>{"Part of the " + this.props.collectionData.name}</TitleText>
                <TouchableHighlight onPress={() => this.props.onViewLinkClick(this.props.collectionData.id)} style={styles.collectionLink}>
                    <View>
                        <TitleText style={styles.collectionLinkText}>View Collection</TitleText>
                    </View>
                </TouchableHighlight>
                <Image style={styles.collectionBackdrop} source={{ uri: backdropUrl }} />
            </View>
        );
    }
}

export default CollectionSection;

const WIDTH = Dimensions.get('window').width;
const BACKDROP_HEIGHT = WIDTH * 0.5625;

const styles = StyleSheet.create({
    backdropContainer: {
        width: WIDTH,
        height: BACKDROP_HEIGHT,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
    },
    collectionBackdrop: {
        width: WIDTH,
        height: BACKDROP_HEIGHT,
        position: 'absolute',
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
        zIndex: 10,
    },
    collectionLink: {
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        borderRadius: 50,
        padding: 10,
        zIndex: 10,
    },
    collectionLinkText: {
        color: '#EEE',
        fontSize: 20,
        textAlign: 'center',
    }
})
