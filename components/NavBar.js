import React, { PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@exponent/vector-icons';

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

export default function getNavigationBar(title) {
    return {
        navigationBar: {
            backgroundColor: '#171717',
            titleStyle: {
                color: '#FFF',
            },
            renderTitle: () => { return <NavBarTitle title={title}/>; },
        },
    };
};

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    titleIcon: {
        color: '#D32F2F',
        marginRight: 15,
    },
    titleText: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'star-wars',
    },
});
