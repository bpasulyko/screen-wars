import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getIcon, getMainColor } from '../util/themeUtil';

class NavBarTitle extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        noIcon: PropTypes.bool,
    }

    render() {
        return (
            <View style={styles.titleContainer}>
                {!this.props.noIcon && <FontAwesome style={[styles.titleIcon, { color: getMainColor() }]} name={getIcon()} size={70} />}
                <Text style={styles.titleText}>{this.props.title}</Text>
            </View>
        );
    }
}

export default NavBarTitle;

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        backgroundColor: '#171717',
        alignItems: 'center',
    },
    titleIcon: {
        marginRight: 15,
    },
    titleText: {
        color: '#ffe919',
        fontSize: 25,
        fontFamily: 'star-wars-outline',
    },
});
