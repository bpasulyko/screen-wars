import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import TitleText from './TitleText';

const TextBubble = React.createClass({
    propTypes: {
        children: React.PropTypes.string,
    },

    render() {
        return <View style={styles.text}><TitleText style={{ color: '#EEE' }}>{this.props.children}</TitleText></View>;
    }
});

export default TextBubble;

const styles = StyleSheet.create({
    text: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#444',
        borderRadius: 4,
        margin: 4,
        elevation: 4,
    },
});
