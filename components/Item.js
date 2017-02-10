import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native';
import Item from './Item';

const ItemList = React.createClass({
    propTypes: {
        item: React.PropTypes.object,
    },

    render() {
        const baseUrl = window.imageConfig.base_url;
        const imageUrl = `${baseUrl}original${this.props.item.poster}`;
        return (
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: imageUrl }} />
            </View>
        );
    }
});

export default ItemList;

const ITEM_WIDTH = (Dimensions.get('window').width - 40) / 4;
const ITEM_HEIGHT = ITEM_WIDTH/(2/3);

const styles = StyleSheet.create({
    imageContainer: {
        elevation: 5,
        backgroundColor: '#333',
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        margin: 4,
    },
    image: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        borderRadius: 4,
    },
});
