import React, { PropTypes } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const LoadingContainer = React.createClass({
    propTypes: {
        loading: PropTypes.bool,
    },

    render() {
        return (this.props.loading)
            ? (
                <View style={styles.spinner}>
                    <ActivityIndicator style={[ { transform: [{ scale: 2 }] } ]} size="large" color="#D32F2F" />
                </View>
            )
            : this.props.children;
    }
});

export default LoadingContainer;

const styles = StyleSheet.create({
    spinner: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
});
