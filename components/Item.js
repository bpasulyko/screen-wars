import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Animated,
  TouchableHighlight,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getImageConfig } from '../repository/tmdbRepo';
import { getMainColor } from '../util/themeUtil';
import TitleText from './TitleText';

class Item extends React.Component {
    static propTypes = {
        item: PropTypes.shape({
            id: PropTypes.number,
            poster: PropTypes.string,
            title: PropTypes.string,
            inCollection: PropTypes.bool,
        }),
        onClick: PropTypes.func,
    }

    componentWillMount() {
        this.animation = new Animated.Value(0);
    }

    handlePress = () => {
        Animated.sequence([
            Animated.timing(this.animation, { toValue: 1, duration: 100 }),
            Animated.timing(this.animation, { toValue: 0, duration: 100 }),
        ]).start();
        this.props.onClick(this.props.item.id);
    }

    renderImage = () => {
        const imageConfig = getImageConfig();
        const baseUrl = imageConfig.base_url;
        const size = imageConfig.poster_sizes[1];
        const imageUrl = `${baseUrl}${size}${this.props.item.poster}`;
        const image = (this.props.item.poster)
            ? <Image style={styles.image} source={{ uri: imageUrl }} />
            : <View style={[styles.image, styles.noImage]}><TitleText style={styles.title}>{this.props.item.title}</TitleText></View>
        return (
            <View>
                {image}
                {this.props.item.inCollection && <MaterialIcons size={12} name="check" style={[{ backgroundColor: getMainColor() }, styles.checkMark]} />}
            </View>
        );
    }

    render() {
        const animatedStyle = {
            transform: [{
                scale: this.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.1]
                })
            }],
        };

        return (
            <Animated.View style={[styles.imageContainer, animatedStyle]}>
                <TouchableHighlight style={styles.image} onPress={this.handlePress}>
                    {this.renderImage()}
                </TouchableHighlight>
            </Animated.View>
        );
    }
}

export default Item;

const ITEM_WIDTH = (Dimensions.get('window').width - 32) / 4;
const ITEM_HEIGHT = ITEM_WIDTH/(2/3);

const styles = StyleSheet.create({
    imageContainer: {
        elevation: 5,
        backgroundColor: '#333',
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        margin: 4,
        borderRadius: 4,
    },
    image: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noImage: {
        backgroundColor: '#171717',
    },
    title: {
        color: '#EEE',
        textAlign: 'center',
    },
    checkMark: {
        position: 'absolute',
        color: '#EEE',
        bottom: 5,
        right: 5,
        padding: 2,
        borderRadius: 100/2,
    },
});
