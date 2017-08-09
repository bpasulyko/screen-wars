import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const NavBarTitle = React.createClass({
    propTypes: {
        title: PropTypes.string,
    },

    render() {
        return (
            <View style={styles.titleContainer}>
                <FontAwesome style={styles.titleIcon} name="rebel" size={70} />
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
        color: '#D32F2F',
        marginRight: 15,
    },
    titleText: {
        color: '#EEE',
        fontSize: 25,
        fontFamily: 'star-wars',
    },
});
