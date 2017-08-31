import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getIcon, getMainColor } from '../util/themeUtil';

const NavBarTitle = React.createClass({
    propTypes: {
        title: PropTypes.string,
        noIcon: PropTypes.bool,
    },

    render() {
        return (
            <View style={styles.titleContainer}>
                {!this.props.noIcon && <FontAwesome style={[styles.titleIcon, { color: getMainColor() }]} name={getIcon()} size={70} />}
                <Text style={styles.titleText}>{this.props.title}</Text>
            </View>
        );
    }
});

export default NavBarTitle;

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        backgroundColor: '#171717',
        alignItems: 'center',
        paddingLeft: 15,
    },
    titleIcon: {
        marginRight: 15,
    },
    titleText: {
        color: '#EEE',
        fontSize: 25,
        fontFamily: 'star-wars',
    },
});
