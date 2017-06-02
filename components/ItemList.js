import React, { PropTypes } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import Item from './Item';
import BodyText from './BodyText';

const ItemList = React.createClass({
    propTypes: {
        list: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            poster: PropTypes.string,
            title: PropTypes.string,
        })),
        onClick: PropTypes.func,
        noWrap: PropTypes.bool,
        type: PropTypes.string,
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
                <BodyText style={styles.countLabel}>{this.props.list.length} {this.props.type}</BodyText>
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
    countLabel: {
        color: '#EEE',
        fontSize: 16,
        paddingVertical: 15,
        textAlign: 'center',
    },
});
