import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Animated,
  TouchableHighlight,
} from 'react-native';
import { getImageConfig } from '../repository/tmdbRepo';

const Item = React.createClass({
    propTypes: {
        item: React.PropTypes.object,
        onClick: React.PropTypes.func,
    },

    componentWillMount() {
        this.animation = new Animated.Value(0);
    },

    handlePress() {
        Animated.sequence([
            Animated.timing(this.animation, { toValue: 1, duration: 100 }),
            Animated.timing(this.animation, { toValue: 0, duration: 100 }),
        ]).start();
        this.props.onClick(this.props.item);
    },

    render() {
        const imageConfig = getImageConfig();
        const baseUrl = imageConfig.base_url;
        const size = imageConfig.poster_sizes[1];
        const imageUrl = `${baseUrl}${size}${this.props.item.poster}`;
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
                    <Image style={styles.image} source={{ uri: imageUrl }} />
                </TouchableHighlight>
            </Animated.View>
        );
    }
});

export default Item;

const ITEM_WIDTH = (Dimensions.get('window').width - 40) / 4;
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
    },
});
