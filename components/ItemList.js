import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import Item from './Item';
import BodyText from './BodyText';

class ItemList extends React.Component {
    static propTypes = {
        list: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            poster: PropTypes.string,
            title: PropTypes.string,
            inCollection: PropTypes.bool,
        })),
        onClick: PropTypes.func,
        noWrap: PropTypes.bool,
        type: PropTypes.string,
    }

    static defaultProps = {
        noWrap: false,
    }

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
                {this.props.type && <BodyText style={styles.countLabel}>{this.props.list.length} {this.props.type}</BodyText>}
            </ScrollView>
        );
    }
}

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
        opacity: 0.5,
    },
});
