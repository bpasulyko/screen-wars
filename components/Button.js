import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import Item from './Item';

const Button = React.createClass({
    propTypes: {
        text: React.PropTypes.string,
        onClick: React.PropTypes.func,
        color: React.PropTypes.string,
        styles: React.PropTypes.number,
    },

    render() {
        const customStyles = (this.props.styles) ? [styles.button, this.props.styles] : styles.button;
        return (
            <TouchableNativeFeedback onPress={this.props.onClick}>
                <View style={customStyles}>
                    <Text style={styles.buttonText}>{this.props.text.toUpperCase()}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
});

export default Button;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#555',
        elevation: 4,
        borderRadius: 2,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        padding: 8,
        fontWeight: '500',
    },
});
