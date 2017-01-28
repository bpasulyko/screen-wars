import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import LoadingContainer from '../components/LoadingContainer';
import getNavigationBar from '../components/NavBar';

export default class Home extends React.Component {
    static route = getNavigationBar("Home");

    state = {
        loading: true,
        search: false,
        queryString: 'BOOM',
    };

    componentWillMount() {
        this.props.route.getEventEmitter().addListener('search', this.handleSearch);
        this.props.route.getEventEmitter().addListener('searchSubmitted', this.handleSearchSubmit);
    }

    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 3000);
    }

    componentDidUpdate() {
        this.props.navigator.updateCurrentRouteParams({
            search: this.state.search,
        });
    }

    handleSearch = () => {
        this.setState({ search: !this.state.search });
    };

    handleSearchSubmit = (queryString) => {
        this.setState({ queryString: queryString });
    };

    render() {
        return (
            <View style={styles.container}>
                <LoadingContainer loading={this.state.loading}>
                    <Text>{this.state.queryString}</Text>
                </LoadingContainer>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
