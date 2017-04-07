import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function NoItems({ icon, text }) {
    return (
        <View style={styles.noItems}>
            <FontAwesome name={icon} size={100} style={styles.icon} />
            <Text style={styles.noItemsText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    noItems: {
        padding: 20,
    },
    icon: {
        color: '#888',
        textAlign: 'center',
        marginBottom: 20,
    },
    noItemsText: {
        color: '#EEE',
        fontSize: 20,
        textAlign: 'center',
    },
});