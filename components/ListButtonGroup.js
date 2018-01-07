import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  StyleSheet,
  View,
} from 'react-native';

import ListTypes from '../util/ListTypes';
import BodyText from './BodyText';
import TitleText from './TitleText';

class ListButtonGroup extends React.Component {
    static propTypes = {
        onListButtonClick: PropTypes.func,
        activeList: PropTypes.shape({
            name: PropTypes.string,
            title: PropTypes.string,
            icon: PropTypes.string,
        }),
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonGroup}>
                    {_.values(ListTypes).map((type, key) => {
                        const buttonStyles = [styles.button];
                        if (type.name === this.props.activeList.name) {
                            buttonStyles.push(styles.active);
                        }
                        return <TitleText key={key} onPress={() => this.props.onListButtonClick(type)} style={buttonStyles}>{type.title}</TitleText>
                    })}
                </View>
            </View>
        );
    }
}

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
        borderColor: '#444',
        borderWidth: 2,
        backgroundColor: '#444',
    },
    button: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        color: '#EEE',
        backgroundColor: '#444',
        paddingVertical: 10,
        opacity: 0.5,
    },
    active: {
        backgroundColor: '#171717',
        color: '#EEE',
        borderRadius: 4,
        opacity: 1,
    }
});
