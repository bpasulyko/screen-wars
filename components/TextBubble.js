import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

const TextBubble = React.createClass({
    propTypes: {
        children: React.PropTypes.string,
    },

    render() {
        return <Text style={styles.text}>{this.props.children}</Text>;
    }
});

export default TextBubble;

const styles = StyleSheet.create({
    text: {
        paddingVertical: 3,
        paddingHorizontal: 10,
        backgroundColor: '#444',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#555',
        color: '#EEE',
        margin: 2,
    },
});
