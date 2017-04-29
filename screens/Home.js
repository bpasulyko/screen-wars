import React from 'react';
import _ from 'lodash';

import {
  StyleSheet,
  View,
  ListView,
  Image,
} from 'react-native';

import LoadingContainer from '../components/LoadingContainer';
import NavBarTitle from '../components/NavBarTitle';
import AddButton from '../components/AddButton';
import SearchResults from '../components/SearchResults';
import BodyText from '../components/BodyText';
import Router from '../navigation/Router';
import { multiSearch } from '../repository/tmdbRepo';

export default class Home extends React.Component {
    static route = {
        navigationBar: {
            backgroundColor: '#171717',
            renderTitle: ({ config: { eventEmitter }, params }) => {
                return <NavBarTitle title="Home" emitter={eventEmitter} searchEnabled={params.search}/>;
            },
            renderRight: ({ config: { eventEmitter }, params }) => {
                return (
                    <AddButton
                        emitter={eventEmitter}
                        searchEnabled={params.search}
                        reset={params.searchResults === null}
                    />
                );
            },
        }
    }

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
            searchResults: this.state.searchResults,
        });
    }

    handleSearch = () => {
        this.setState({
            search: !this.state.search,
            searchResults: null,
        });
    };

    handleSearchSubmit = (queryString) => {
        return multiSearch(queryString).then((results) => this.setState({ searchResults: results }));
    };

    goToDetails = (selectedItem) => {
        this.props.navigator.push(Router.getRoute('details', {
            id: selectedItem.id,
            type: selectedItem.media_type,
        }));
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <LoadingContainer loading={this.state.loading}>
                        <BodyText style={{ color: '#fff' }}>CONTENT STUFF</BodyText>
                    </LoadingContainer>
                </View>
                {this.state.searchResults && (
                    <SearchResults
                        results={this.state.searchResults}
                        onResultSelect={this.goToDetails}
                    />
                )}
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
