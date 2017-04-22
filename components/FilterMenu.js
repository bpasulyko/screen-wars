import React, { PropTypes } from 'react';
import _ from 'lodash';

import {
  StyleSheet,
  Text,
  Animated,
  View,
  Picker,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import SortOptions from '../util/SortOptions'

const FilterMenu = React.createClass({
    propTypes: {
        show: PropTypes.bool,
        selectedGenre: PropTypes.number,
        selectedSort: PropTypes.number,
        onGenreChange: PropTypes.func,
        onSortChange: PropTypes.func,
    },

    getDefaultProps() {
        return {
            show: false,
        }
    },

    componentWillMount() {
        this.animation = new Animated.Value(0);
    },

    componentDidUpdate() {
        const value = (this.props.show) ? 80 : 0;
        Animated.timing(this.animation, { toValue: value, duration: 250 }).start();
    },

    renderGenrePicker() {
        const allGenres = [{
            id: 0,
            name: 'All',
        }].concat(_.values(_.sortBy(window.genres, 'name')));
        return (
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>GENRE</Text>
                <View style={styles.wrapper}>
                    <Picker style={styles.picker} mode="dropdown" selectedValue={this.props.selectedGenre} onValueChange={this.props.onGenreChange}>
                        {allGenres.map((genre, key) => {
                            return <Picker.Item key={key} label={genre.name} value={genre.id} />;
                        })}
                    </Picker>
                </View>
            </View>
        );
    },

    renderSortPicker() {
        return (
            <View style={styles.pickerContainer}>
                <Text style={styles.pickerLabel}>SORT</Text>
                <View style={styles.wrapper}>
                    <Picker style={styles.picker} mode="dropdown" selectedValue={this.props.selectedSort} onValueChange={this.props.onSortChange}>
                        {_.values(SortOptions).map((option, key) => {
                            return <Picker.Item key={key} label={option.name} value={option.id} />;
                        })}
                    </Picker>
                </View>
            </View>
        );
    },

    render() {
        const animatedStyle = { height: this.animation };
        return (
            <Animated.View style={[styles.container, animatedStyle]}>
                {this.renderGenrePicker()}
                {this.renderSortPicker()}
            </Animated.View>
        );
    }
});

export default FilterMenu;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#171717',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    pickerContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    pickerLabel: {
        color: '#EEE',
        fontSize: 9,
        paddingBottom: 5,
    },
    picker: {
        color: '#EEE',
        height: 35,
    },
    wrapper: {
        backgroundColor: '#333',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#777',
    },
});
