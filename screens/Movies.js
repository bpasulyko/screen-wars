import React from 'react';
import _ from 'lodash';
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';

import LoadingContainer from '../components/LoadingContainer';
import NavBarTitle from '../components/NavBarTitle';
import ItemList from '../components/ItemList';
import Button from '../components/Button';
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

    handleDeleteItem = (selectedMovie) => {
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
        const baseUrl = window.imageConfig.base_url;
        const size = window.imageConfig.poster_sizes[1];
        const imageUrl = `${baseUrl}${size}${this.state.selectedMovie.poster}`;
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {}}
            >
                <View style={[styles.container, styles.modalContainer]}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalImageContainer}>
                            <Image style={styles.modalImage} source={{ uri: imageUrl }} />
                        </View>
                        <View style={styles.modalDetails}>
                            <Text style={styles.modalText}>{'Delete ' + this.state.selectedMovie.title + '?'}</Text>
                            <View style={styles.modalButtonRow}>
                                <Button onClick={this.closeModal} text="Cancel" styles={styles.modalButton} />
                                <Button onClick={this.deleteMovie} text="Delete" styles={styles.modalButton} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    render() {
        const MovieList = (
            <ScrollView>
                <ItemList list={this.state.movies} onClick={this.handleDeleteItem} />
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
    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        borderRadius: 3,
        backgroundColor: '#333',
        width: 300,
        padding: 10,
        flexDirection: 'row',
    },
    modalDetails: {
        flex: 1,
        flexWrap: 'wrap',
    },
    modalImageContainer: {
        elevation: 5,
        backgroundColor: '#333',
        marginRight: 20,
    },
    modalImage: {
        width: 100,
        height: 150,
        borderRadius: 4,
    },
    modalText: {
        color: '#EEE',
        fontSize: 18,
    },
    modalButtonRow: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    modalButton: {
        marginLeft: 10,
    },
});
