import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Button = React.createClass({
    propTypes: {
        text: React.PropTypes.string,
        onClick: React.PropTypes.func,
        color: React.PropTypes.string,
        icon: React.PropTypes.string,
        styles: React.PropTypes.number,
    },

    render() {
        const customStyles = (this.props.styles) ? [styles.button, this.props.styles] : [styles.button];
        if (this.props.color) {
            customStyles.push({ backgroundColor: this.props.color });
        }
        return (
            <TouchableNativeFeedback onPress={this.props.onClick}>
                <View style={customStyles}>
                    {this.props.icon && <FontAwesome name={this.props.icon} size={18} style={styles.icon} />}
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
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        padding: 8,
        fontWeight: '500',
    },
    icon: {
        color: 'white',
        padding: 8,
        paddingRight: 5,
    }
});
