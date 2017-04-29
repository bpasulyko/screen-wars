import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TitleText = ({ style, children, onPress }) => {
    return <Text style={[styles.text, style]} onPress={onPress}>{children}</Text>;
};

export default TitleText;

const styles = StyleSheet.create({
    text: {
        fontFamily: 'raleway-bold',
    }
});
