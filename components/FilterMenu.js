import React, { PropTypes } from 'react';
import _ from 'lodash';

import {
  StyleSheet,
  Text,
  Animated,
  View,
} from 'react-native';

const FilterMenu = React.createClass({
    propTypes: {
        show: PropTypes.bool,
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
        const value = (this.props.show) ? 70 : 0;
        Animated.timing(this.animation, { toValue: value, duration: 250 }).start();
    },

    render() {
        const animatedStyle = { height: this.animation };
        return (
            <Animated.View style={[styles.container, animatedStyle]}>
                <Text>BLAH</Text>
            </Animated.View>
        );
    }
});

export default FilterMenu;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
});
