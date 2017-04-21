import React, { PropTypes } from 'react';
import _ from 'lodash';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ListTypes = {
    COLLECTION: 'Collection',
    WATCHLIST: 'Watchlist',
    FAVORITES: 'Favorites',
};

const ListButtonGroup = React.createClass({
    propTypes: {
        onListButtonClick: PropTypes.func,
        activeList: PropTypes.string,
    },

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonGroup}>
                    {_.values(ListTypes).map((type, key) => {
                        const buttonStyles = [styles.button];
                        if (type.toLowerCase() === this.props.activeList) {
                            buttonStyles.push(styles.active);
                        }
                        return <Text key={key} onPress={() => this.props.onListButtonClick(type.toLowerCase())} style={buttonStyles}>{type}</Text>
                    })}
                </View>
            </View>
        );
    }
});

export default ListButtonGroup;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        height: 70,
    },
    buttonGroup: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderRadius: 4,
        borderColor: '#555',
        borderWidth: 2,
        backgroundColor: '#555',
    },
    button: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        color: '#EEE',
        backgroundColor: '#555',
        paddingVertical: 10,
        fontWeight: 'bold',
        opacity: 0.5,
    },
    active: {
        backgroundColor: '#171717',
        color: '#EEE',
        borderRadius: 4,
        opacity: 1,
    }
});
