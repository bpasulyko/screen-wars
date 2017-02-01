import React, { PropTypes } from 'react';
import { TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@exponent/vector-icons';

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

export default SearchButton;

const styles = StyleSheet.create({
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
});
