import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
} from 'react-native';
import {
  Expo
} from 'expo';

const Backdrop = React.createClass({
    propTypes: {
        path: React.PropTypes.string,
    },

    render() {
        const baseUrl = window.imageConfig.base_url;
        const backdropSize = window.imageConfig.backdrop_sizes[1];
        const backdropUrl = `${baseUrl}${backdropSize}${this.props.path}`;
        return (
            <View>
                <Expo.LinearGradient
                    style={styles.backdropImageGradient}
                    colors={['transparent', 'transparent', '#222']} />
                <Image style={styles.backdropImage} source={{ uri: backdropUrl }} />
            </View>
        );
    }
});

export default Backdrop;

const WIDTH = Dimensions.get('window').width;
const BACKDROP_HEIGHT = WIDTH * 0.5625;

const styles = StyleSheet.create({
    backdropImage: {
        width: WIDTH,
        height: BACKDROP_HEIGHT,
    },
    backdropImageGradient: {
        position: 'absolute',
        top: 0,
        zIndex: 2,
        width: WIDTH,
        height: BACKDROP_HEIGHT,
    },
});
