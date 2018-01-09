import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import { MaterialIcons } from '@expo/vector-icons';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { getMainColor } from '../../util/themeUtil';
import { getImageConfig } from '../../repository/tmdbRepo';
import TitleText from '../TitleText';

const PosterGallery = ({ visible, onClose, images }) => {
    const renderPoster = (img, key, total) => {
        const imageConfig = getImageConfig();
        const baseUrl = imageConfig.base_url;
        const posterSize = imageConfig.poster_sizes[3];
        return (
            <View key={key}>
                <Image style={[styles.poster, { borderColor: getMainColor() }]} source={{ uri: `${baseUrl}${posterSize}{img.file_path}` }} />
                <View style={[styles.pagination, { backgroundColor: getMainColor(), borderColor: getMainColor() }]}>
                    <TitleText style={styles.count}>{`${key + 1} of ${total}`}</TitleText>
                </View>
            </View>
        );
    };

    return (
        <Modal
            isVisible={visible}
            style={styles.container}
            animationIn="bounceIn"
            animationOut="bounceOut"
        >
            <View style={styles.modalContent}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <MaterialIcons name="close" size={30} style={{ color: '#EEE' }}/>
                </TouchableOpacity>
                <Swiper showsPagination={false}>
                    {images.map((img, key) => renderPoster(img, key, images.length))}
                </Swiper>
            </View>
        </Modal>
    );
};

export default PosterGallery;

const ENTIRE_WIDTH = Dimensions.get('window').width;
const IMAGE_WIDTH = ENTIRE_WIDTH * 0.95;
const IMAGE_HEIGHT = IMAGE_WIDTH/(2/3);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    modalContent: {
        marginTop: 40,
        marginBottom: 40,
        flex: 1,
        alignSelf: 'stretch',
    },
    poster: {
        alignSelf: 'center',
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderWidth: 2,
    },
    pagination: {
        alignSelf: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        width: IMAGE_WIDTH,
        paddingVertical: 15,
    },
    count: {
        color: '#EEE',
        fontSize: 17,
    },
    closeButton: {
        position: 'absolute',
        zIndex: 1000,
        top: 2,
        right: 10,
        padding: 10,
    },
});
