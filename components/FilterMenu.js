import React, { PropTypes } from 'react';
import _ from 'lodash';
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';

import {
  StyleSheet,
  View,
  Picker,
  Button,
  TouchableOpacity,
} from 'react-native';

import SortOptions from '../util/SortOptions'
import { getGenres } from '../repository/tmdbRepo';
import BodyText from './BodyText';
import TitleText from './TitleText';

const FilterMenu = React.createClass({
    propTypes: {
        show: PropTypes.bool,
        selectedGenre: PropTypes.number,
        selectedSort: PropTypes.number,
        onGenreChange: PropTypes.func,
        onSortChange: PropTypes.func,
        onClose: PropTypes.func,
        onClear: PropTypes.func,
    },

    getDefaultProps() {
        return {
            show: false,
        }
    },

    renderHeader() {
        return (
            <View style={[styles.header, styles.modalPadding]}>
                <TouchableOpacity onPress={this.props.onClear}>
                    <MaterialIcons name="close" size={28} style={{ color: '#EEE' }} />
                </TouchableOpacity>
                <TitleText style={styles.heading}>Filters</TitleText>
                <TouchableOpacity onPress={this.props.onClose}>
                    <MaterialIcons name="check" size={28} style={{ color: '#EEE' }} />
                </TouchableOpacity>
            </View>
        );
    },

    renderGenrePicker() {
        const allGenres = [{
            id: 0,
            name: 'All',
        }].concat(_.values(_.sortBy(getGenres(), 'name')));
        return (
            <View style={styles.pickerContainer}>
                <BodyText style={styles.pickerLabel}>Genre</BodyText>
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
                <BodyText style={styles.pickerLabel}>Sort</BodyText>
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
        return (
            <Modal
                isVisible={this.props.show}
                style={styles.container}
                animationIn="slideInDown"
                animationOut="slideOutUp"
            >
                <View style={styles.modalContent}>
                    {this.renderHeader()}
                    <View style={[styles.dropdownContainer, styles.modalPadding]}>
                        {this.renderGenrePicker()}
                        {this.renderSortPicker()}
                    </View>
                </View>
            </Modal>
        );
    }
});

export default FilterMenu;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        margin: 0,
    },
    modalPadding: {
        paddingHorizontal: 10,
    },
    modalContent: {
        backgroundColor: '#171717',
        paddingBottom: 25,
        justifyContent: 'center',
        borderRadius: 4,
    },
    header: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    heading: {
        fontSize: 24,
        color: '#EEE',
        alignSelf: 'center',
    },
    pickerContainer: {
        paddingTop: 15,
    },
    pickerLabel: {
        color: '#EEE',
        fontSize: 12,
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
        borderColor: '#444',
    },
});
