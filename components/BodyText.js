import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BodyText = ({ style, children, onPress }) => {
    return <Text style={[styles.text, style]} onPress={onPress}>{children}</Text>;
};

export default BodyText;

const styles = StyleSheet.create({
    text: {
        fontFamily: 'raleway',
    }
});
