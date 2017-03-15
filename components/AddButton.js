import React, { PropTypes } from 'react';
import { TextInput, StyleSheet, TouchableHighlight, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const AddButton = React.createClass({
    propTypes: {
        emitter: PropTypes.object,
        searchEnabled: PropTypes.bool,
    },

    componentWillMount() {
        this.animation = new Animated.Value(0);
    },

    componentDidUpdate() {
        if (this.props.reset && !this.props.searchEnabled) {
            Animated.spring(this.animation, { toValue: 0 }).start();
        }
    },

    handlePress() {
        Animated.spring(
            this.animation,
            {
                toValue: this.props.searchEnabled ? 0 : 1,
            }
        ).start();
        this.props.emitter.emit('search');
    },

    render() {
        const animatedStyle = {
            transform: [{
                rotate: this.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-45deg'],
                }),
            }],
        };
        return (
            <TouchableHighlight underlayColor="#333" onPress={this.handlePress} style={styles.addButtonContainer}>
                <Animated.View style={animatedStyle}>
                    <FontAwesome name="plus" size={24} style={styles.icon} />
                </Animated.View>
            </TouchableHighlight>
        );
    }
});

export default AddButton;

const styles = StyleSheet.create({
    addButtonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        width: 45,
        borderRadius: 30,
    },
    icon: {
        color: '#EEE',
    },
});
