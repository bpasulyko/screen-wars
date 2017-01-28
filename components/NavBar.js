import React, { PropTypes } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
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
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        returnKeyType='search'
                        autoFocus={true}
                        onSubmitEditing={this.handleSearchSubmit}
                        underlineColorAndroid='#BBB'/>
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

const SearchButton = React.createClass({
    propTypes: {
        emitter: PropTypes.object,
        searchEnabled: PropTypes.bool,
    },

    handlePress() {
        this.props.emitter.emit('search');
    },

    render() {
        const icon = (!this.props.searchEnabled) ? 'search' : 'times';
        return (
            <TouchableHighlight underlayColor="#333" onPress={this.handlePress} style={styles.searchButtonContainer}>
                <FontAwesome name={icon} size={24} style={styles.searchIcon} />
            </TouchableHighlight>
        );
    }
});

export default function getNavigationBar(title) {
    return {
        navigationBar: {
            backgroundColor: '#171717',
            renderTitle: ({ config: { eventEmitter }, params }) => {
                return <NavBarTitle title={title} emitter={eventEmitter} searchEnabled={params.search}/>;
            },
            renderRight: ({ config: { eventEmitter }, params }) => {
                return <SearchButton emitter={eventEmitter} searchEnabled={params.search}/>;
            },
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
        color: '#EEE',
        fontSize: 25,
        fontFamily: 'star-wars',
    },
    searchButtonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        width: 45,
        borderRadius: 30,
    },
    searchIcon: {
        color: '#EEE',
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
