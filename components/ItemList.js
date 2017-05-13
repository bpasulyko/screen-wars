import React, { PropTypes } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import Item from './Item';

const ItemList = React.createClass({
    propTypes: {
        list: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            poster: PropTypes.string,
            title: PropTypes.string,
        })),
        onClick: PropTypes.func,
        noWrap: PropTypes.bool,
    },

    getDefaultProps() {
        return {
            noWrap: false,
        };
    },

    render() {
        if (this.props.noWrap) {
            return (
                <ScrollView horizontal>
                    {this.props.list.map((item, index) => <Item key={index} item={item} onClick={this.props.onClick} />)}
                </ScrollView>
            );
        }
        return (
            <ScrollView>
                <View style={styles.listContainer}>
                    {this.props.list.map((item, index) => <Item key={index} item={item} onClick={this.props.onClick} />)}
                </View>
            </ScrollView>
        );
    }
});

export default ItemList;

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
