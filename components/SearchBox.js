import React from 'react';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { getMainColor } from '../util/themeUtil';

class SearchBox extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        onClear: PropTypes.func,
        editable: PropTypes.bool,
        onChange: PropTypes.func,
        onSubmit: PropTypes.func,
    }

    static defaultProps = {
        editable: true,
    }

    onClear = () => {
        this.refs['search_input'].blur();
        this.refs['search_input'].clear();
        this.props.onClear();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <MaterialIcons name="search" size={24} style={{ marginRight: 5, color: '#777' }} />
                    <TextInput
                        ref="search_input"
                        style={styles.input}
                        editable={this.props.editable}
                        placeholder="Search"
                        placeholderTextColor="#777"
                        selectionColor={getMainColor()}
                        returnKeyType='search'
                        selectTextOnFocus
                        onChangeText={this.props.onChange}
                        onSubmitEditing={this.props.onSubmit}
                        underlineColorAndroid='rgba(0,0,0,0)'
                    />
                    {this.props.value && (
                        <TouchableOpacity onPress={this.onClear}>
                            <MaterialIcons name="close" size={24} style={{ color: '#777' }} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    }
}

export default SearchBox;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#171717',
        height: 55,
        paddingBottom: 10,
        paddingHorizontal: 15,
        elevation: 5,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        elevation: 4,
        borderRadius: 2,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        fontFamily: 'raleway',
        fontSize: 18,
    },
});
