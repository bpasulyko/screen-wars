import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Item from './Item';

const ItemList = React.createClass({
    propTypes: {
        list: React.PropTypes.array,
    },

    render() {
        return (
            <View style={styles.listContainer}>
                {this.props.list.map((item, index) => <Item key={index} item={item} />)}
            </View>
        );
    }
});

export default ItemList;

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 4,
    },
});