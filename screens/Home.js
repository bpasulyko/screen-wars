import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
} from 'react-native';

import LoadingContainer from '../components/LoadingContainer';
import getNavigationBar from '../components/NavBar';
import SearchResults from '../components/SearchResults';

export default class Home extends React.Component {
    static route = getNavigationBar("Home");

    state = {
        loading: true,
        search: false,
        searchResults: null,
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
        this.setState({
            search: !this.state.search,
            searchResults: null,
        });
    };

    handleSearchSubmit = (queryString) => {
        return fetch(`${window.BASE_URL}/search/multi?api_key=${window.API_KEY}&language=en-US&query=${queryString}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ searchResults: responseJson.results });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.searchResults && <SearchResults results={this.state.searchResults} />}
                <View style={styles.content}>
                    <LoadingContainer loading={this.state.loading}>
                        <Text style={{ color: '#fff' }}>CONTENT STUFF</Text>
                    </LoadingContainer>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
