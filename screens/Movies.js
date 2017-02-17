import React from 'react';
import _ from 'lodash';
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import LoadingContainer from '../components/LoadingContainer';
import NavBarTitle from '../components/NavBarTitle';
import ItemList from '../components/ItemList';
import DeleteModal from '../components/DeleteModal';
import { FontAwesome } from '@exponent/vector-icons';

export default class Movies extends React.Component {
    static route = {
        navigationBar: {
            backgroundColor: '#171717',
            renderTitle: ({ config: { eventEmitter }, params }) => {
                return <NavBarTitle title="Movies" emitter={eventEmitter}/>;
            },
        },
    }

    state = {
        loading: true,
        movies: [],
        modalVisible: false,
        selectedMovie: null,
    };

    componentDidMount() {
        window.firebase.database().ref('movies/').on('value', (movies) => {
            this.setState({
                loading: false,
                movies: _.sortBy(_.values(movies.val()), 'title'),
            })
        });
    }

    showDeleteModal = (selectedMovie) => {
        this.setState({
            modalVisible: true,
            selectedMovie: selectedMovie,
        });
    };

    deleteMovie = () => {
        return window.firebase.database().ref('movies/' + this.state.selectedMovie.id).remove()
            .then(() => {
                this.props.navigator.showLocalAlert(this.state.selectedMovie.title + ' deleted!', {
                    text: { color: '#EEE' },
                    container: { backgroundColor: '#222' },
                });
                this.closeModal();
            });
    };

    closeModal = () => {
        this.setState({
            modalVisible: false,
            selectedMovie: null,
        });
    };

    renderModal = () => {
        return (
            <DeleteModal
                selectedItem={this.state.selectedMovie}
                visible={this.state.modalVisible}
                onClose={this.closeModal}
                onDelete={this.deleteMovie}
            />
        );
    };

    render() {
        const MovieList = (
            <ScrollView>
                <ItemList list={this.state.movies} onClick={this.showDeleteModal} />
            </ScrollView>
        );
        const NoMovies = (
            <View style={styles.noMovies}>
                <FontAwesome name="film" size={100} style={styles.icon} />
                <Text style={styles.noMoviesText}>You haven't added any movies to your collection!</Text>
            </View>
        );
        return (
            <View style={styles.container}>
                {this.state.selectedMovie && this.renderModal()}
                <LoadingContainer loading={this.state.loading}>
                    {this.state.movies.length > 0 && MovieList || NoMovies}
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
    noMovies: {
        padding: 20,
    },
    icon: {
        color: '#888',
        textAlign: 'center',
        marginBottom: 20,
    },
    noMoviesText: {
        color: '#EEE',
        fontSize: 20,
        textAlign: 'center',
    },
});
