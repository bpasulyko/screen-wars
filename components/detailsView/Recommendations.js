import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import { getImageConfig } from '../../repository/tmdbRepo';
import ItemList from '../ItemList';
import TitleText from '../TitleText';

const Recommendations = ({ items, type, onPress }) => {
    const itemList = items.map((item) => {
        return {
            id: item.id,
            poster: item.poster || item.poster_path,
            title: item.title || item.name,
        };
    });

    return (
        <View style={styles.container}>
            <TitleText style={styles.heading}>Recommendations</TitleText>
            <ItemList list={itemList} onClick={(id) => onPress(id, type)} noWrap />
        </View>
    );
};

export default Recommendations;

const styles = StyleSheet.create({
    container: {
        paddingBottom: 100,
    },
    heading: {
        color: '#EEE',
        fontSize: 20,
        paddingHorizontal: 20,
        paddingBottom: 5,
    },
});
