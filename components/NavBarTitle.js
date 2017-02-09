import React, { PropTypes } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FontAwesome } from '@exponent/vector-icons';

const NavBarTitle = React.createClass({
    propTypes: {
        title: PropTypes.string,
        searchEnabled: PropTypes.bool,
        emitter: PropTypes.object,
    },

    handleSearchSubmit(e) {
        this.props.emitter.emit('searchSubmitted', e.nativeEvent.text);
    },

    render() {
        if (this.props.searchEnabled) {
            return (
                <View style={styles.titleContainer}>
                    <FontAwesome name="search" size={18} style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        returnKeyType='search'
                        autoFocus={true}
                        onSubmitEditing={this.handleSearchSubmit}
                        underlineColorAndroid='rgba(0,0,0,0)'/>
                </View>
            );
        }
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
        flex: 1,
        alignItems: 'center',
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
    searchIcon: {
        color:'#BBB',
        marginRight: 5,
        marginLeft: 10,
    },
    input: {
        color: '#BBB',
        flex: 1,
        fontSize: 18,
        paddingTop: 3,
        paddingBottom: 7,
        paddingLeft: 5,
        paddingRight: 5,
    },
});
