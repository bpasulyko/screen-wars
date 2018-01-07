import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
} from 'react-native';
import TitleText from './TitleText';

class TextBubble extends React.Component {
    static propTypes = {
        children: PropTypes.string,
    }

    render() {
        return <View style={styles.text}><TitleText style={{ color: '#EEE' }}>{this.props.children}</TitleText></View>;
    }
}

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
