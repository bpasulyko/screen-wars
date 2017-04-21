import React, { PropTypes } from 'react';
import { ActivityIndicator } from 'react-native';

const LoadingContainer = React.createClass({
    propTypes: {
        loading: PropTypes.bool,
    },

    render() {
        return (this.props.loading)
            ? <ActivityIndicator style={[ { transform: [{ scale: 2 }] } ]} size="large" color="#D32F2F" />
            : this.props.children;
    }
});

export default LoadingContainer;
