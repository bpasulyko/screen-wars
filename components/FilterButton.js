import React, { PropTypes } from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const FilterButton = React.createClass({
    propTypes: {
        emitter: PropTypes.object,
    },

    handlePress() {
        this.props.emitter.emit('filter');
    },

    render() {
        return (
            <TouchableHighlight underlayColor="#333" onPress={this.handlePress} style={styles.addButtonContainer}>
                <FontAwesome name="sliders" size={24} style={styles.icon} />
            </TouchableHighlight>
        );
    }
});

export default FilterButton;

const styles = StyleSheet.create({
    addButtonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        width: 45,
        borderRadius: 30,
    },
    icon: {
        color: '#EEE',
    },
});
