import React from 'react';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Animated,
    ActivityIndicator,
} from 'react-native';
import { getMainColor } from '../util/themeUtil';

class SearchBox extends React.Component {
    static propTypes = {
        value: PropTypes.string,
        onClear: PropTypes.func,
        editable: PropTypes.bool,
        onChange: PropTypes.func,
        onSubmit: PropTypes.func,
        loading: PropTypes.bool,
        containerStyle: PropTypes.object,
    }

    static defaultProps = {
        editable: true,
        loading: false,
    }

    state = {
        focused: false,
    }

    componentWillMount() {
        this.animation = new Animated.Value(0);
    }

    onClear = () => {
        this.refs['search_input'].blur();
        this.refs['search_input'].clear();
        this.props.onClear();
    }

    toggleFocus = () => {
        const value = this.state.focused ? 0 : 100;
        Animated.timing(this.animation, { toValue: value, duration: 100 }).start();
        this.setState({ focused: !this.state.focused });
    }

    renderRightIcon = () => {
        const iconColor = this.state.focused ? getMainColor() : '#777';
        if (this.props.loading) {
            return <ActivityIndicator color={getMainColor()} />;
        } else if (this.props.value) {
            return (
                <TouchableOpacity onPress={this.onClear}>
                    <MaterialIcons name="close" size={24} style={{ color: iconColor }} />
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    }

    render() {
        const borderColor = this.animation.interpolate({
            inputRange: [0, 100],
            outputRange: ['#FFF', getMainColor()],
        });
        const iconColor = this.state.focused ? getMainColor() : '#777';
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <Animated.View style={[styles.searchContainer, { borderColor: borderColor }]}>
                    <MaterialIcons name="search" size={24} style={{ marginRight: 5, color: iconColor }} />
                    <TextInput
                        ref="search_input"
                        style={styles.input}
                        editable={this.props.editable}
                        placeholder="Search"
                        placeholderTextColor="#777"
                        selectionColor={getMainColor()}
                        returnKeyType='search'
                        selectTextOnFocus
                        onFocus={this.toggleFocus}
                        onBlur={this.toggleFocus}
                        onChangeText={this.props.onChange}
                        onSubmitEditing={this.props.onSubmit}
                        underlineColorAndroid='rgba(0,0,0,0)'
                    />
                    {this.renderRightIcon()}
                </Animated.View>
            </View>
        );
    }
}

export default SearchBox;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#171717',
        paddingHorizontal: 15,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        elevation: 4,
        borderRadius: 3,
        paddingHorizontal: 10,
        borderWidth: 2,
    },
    input: {
        flex: 1,
        fontFamily: 'raleway',
        fontSize: 18,
    },
});
