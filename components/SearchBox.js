import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';

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
            <View style={styles.searchContainer}>
                <FontAwesome name="search" size={18} style={styles.searchIcon} />
                <TextInput
                    ref="search_input"
                    style={styles.input}
                    editable={this.props.editable}
                    placeholder="Search"
                    returnKeyType='search'
                    selectTextOnFocus
                    onChangeText={this.props.onChange}
                    onSubmitEditing={this.props.onSubmit}
                    underlineColorAndroid='rgba(0,0,0,0)'
                />
                {this.props.value && (
                    <TouchableOpacity onPress={this.onClear}>
                        <FontAwesome name="times" size={18} style={styles.searchIcon} />
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}

export default SearchBox;

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#171717',
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: 50,
    },
    input: {
        flex: 1,
        color: '#EEE',
        fontFamily: 'raleway',
    },
    searchIcon: {
        color:'#BBB',
        marginRight: 5,
    },
});
