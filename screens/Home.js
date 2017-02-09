import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
} from 'react-native';

import LoadingContainer from '../components/LoadingContainer';
import NavBarTitle from '../components/NavBarTitle';
import AddButton from '../components/AddButton';
import SearchResults from '../components/SearchResults';

export default class Home extends React.Component {
    static route = {
        navigationBar: {
            backgroundColor: '#171717',
            renderTitle: ({ config: { eventEmitter }, params }) => {
                return <NavBarTitle title="Home" emitter={eventEmitter} searchEnabled={params.search}/>;
            },
            renderRight: ({ config: { eventEmitter }, params }) => {
                return <AddButton emitter={eventEmitter} searchEnabled={params.search}/>;
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

    handleResultSelect = (data) => {
        const saveFunc = (data.media_type === 'movie') ? saveMovie : saveTvShow;
        saveFunc(data).then(() => {
            const title = data.title || data.name;
            this.props.navigator.showLocalAlert(title + ' added!', {
                text: { color: '#EEE' },
                container: { backgroundColor: '#222' },
            });
        });
        this.setState({
            search: false,
            searchResults: null,
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <LoadingContainer loading={this.state.loading}>
                        <Text style={{ color: '#fff' }}>CONTENT STUFF</Text>
                    </LoadingContainer>
                </View>
                {this.state.searchResults && (
                    <SearchResults
                        results={this.state.searchResults}
                        onResultSelect={this.handleResultSelect}
                    />
                )}
            </View>
        );
    };
}

function saveMovie(data) {
    return window.firebase.database().ref('movies/' + data.id).set({
        title: data.title,
        poster: data.poster_path,
        releaseDate: data.release_date,
        genres: data.genre_ids,
        rating: data.vote_average.toFixed(1),
        watched: true,
    });
}

function saveTvShow(data) {
    return window.firebase.database().ref('tv/' + data.id).set({
        title: data.name,
        poster: data.poster_path,
        releaseDate: data.first_air_date,
        genres: data.genre_ids,
        rating: data.vote_average.toFixed(1),
        watched: true,
    });
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
