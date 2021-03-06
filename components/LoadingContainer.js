import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { getMainColor } from '../util/themeUtil';

class LoadingContainer extends React.Component {
    static propTypes = {
        loading: PropTypes.bool,
    }

    render() {
        return (this.props.loading)
            ? (
                <View style={styles.spinner}>
                    <ActivityIndicator style={[ { transform: [{ scale: 2 }] } ]} size="large" color={getMainColor()} />
                </View>
            )
            : this.props.children;
    }
}

export default LoadingContainer;

const styles = StyleSheet.create({
    spinner: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
});
