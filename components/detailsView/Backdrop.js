import React from 'react';
import Swiper from 'react-native-swiper';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo';
import { getImageConfig } from '../../repository/tmdbRepo';
import TitleText from '../../components/TitleText';

const Backdrop = ({ images, path, singleImage }) => {
    const imageConfig = getImageConfig();
    const baseUrl = imageConfig.base_url;
    const backdropSize = imageConfig.backdrop_sizes[1];
    if (singleImage) {
        return (
            <View>
                <LinearGradient
                    style={styles.backdropImageGradient}
                    colors={['transparent', 'transparent', '#222']} />
                <Image style={styles.backdropImage} source={{ uri: `${baseUrl}${backdropSize}${path}` }} />
            </View>
        );
    }
    return (
        <View>
            <Swiper
                showsPagination={false}
                style={styles.backdropImage}
            >
                {images.map((img, key) => (
                    <View key={key} >
                        <LinearGradient
                            style={styles.backdropImageGradient}
                            colors={['transparent', 'transparent', '#222']} />
                        <Image style={styles.backdropImage} source={{ uri: `${baseUrl}${backdropSize}${img}` }} />
                        <TitleText style={styles.pagination}>{key + 1} of {images.length}</TitleText>
                    </View>
                ))}
            </Swiper>
        </View>
    );
};

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
    pagination: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 3,
        color: '#EEE',
        fontSize: 14,
        textShadowColor: 'black',
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowRadius: 10,
    },
});
