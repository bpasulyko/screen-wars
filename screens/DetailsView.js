import React from 'react';
import _ from 'lodash';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

import LoadingContainer from '../components/LoadingContainer';
import NavBarTitle from '../components/NavBarTitle';
import Backdrop from '../components/detailsView/Backdrop';
import Header from '../components/detailsView/Header';
import SubHeader from '../components/detailsView/SubHeader';
import Rating from '../components/detailsView/Rating';
import Genres from '../components/detailsView/Genres';
import CastList from '../components/detailsView/CastList';
import CrewList from '../components/detailsView/CrewList';
import CollectionButton from '../components/detailsView/CollectionButton';
import Button from '../components/Button';
import DeleteModal from '../components/DeleteModal';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';

export default class DetailsView extends React.Component {
    static route = {
        navigationBar: {
            backgroundColor: '#171717',
            tintColor: '#EEE',
            renderTitle: ({ config: { eventEmitter }, params }) => {
                return <NavBarTitle title="Screen Wars" emitter={eventEmitter}/>;
            },
        },
    }

    state = {
        loading: true,
        itemDetails: {},
        modalVisible: false,
        inCollection: false,
    };

    componentDidMount() {
        const params = this.props.route.params;
        return fetch(`${window.BASE_URL}/${params.type}/${params.id}?api_key=${window.API_KEY}&language=en-US&append_to_response=credits`)
            .then((response) => response.json())
            .then((responseJson) => {
                window.firebase.database().ref(`${params.type}/${params.id}/`).on('value', (details) => {
                    this.setState({
                        itemDetails: _.merge({}, responseJson, details.val(), { type: params.type }),
                        loading: false,
                        inCollection: details.val() !== null,
                    });
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    addItemToCollection = () => {
        const item = this.state.itemDetails;
        const saveFunc = (item.type === 'movie') ? saveMovie : saveTvShow;
        saveFunc(item).then(() => {
            this.setState({
                inCollection: true,
            });
        });
    };

    showDeleteModal = () => {
        this.setState({
            modalVisible: true,
        });
    };

    deleteItem = () => {
        return window.firebase.database().ref(`${this.state.itemDetails.type}/` + this.state.itemDetails.id).remove()
            .then(() => {
                this.setState({
                    inCollection: false,
                });
            });
    };

    closeModal = () => {
        this.setState({
            modalVisible: false,
        });
    };

    renderModal = () => {
        return (
            <DeleteModal
                selectedItem={this.state.itemDetails}
                visible={this.state.modalVisible}
                onClose={this.closeModal}
                onDelete={this.deleteItem}
            />
        );
    };

    formatReleaseDate = () => {
        const item = this.state.itemDetails;
        const releaseDate = (item.type === 'movie') ? item.release_date : item.first_air_date;
        if (releaseDate) {
            return moment.utc(this.state.itemDetails.releaseDate).format('MMMM D, YYYY');
        }
    };

    toggleFavorite = () => {
        const data = this.state.itemDetails;
        data.favorite = !data.favorite;
        const saveFunc = (data.type === 'movie') ? saveMovie : saveTvShow;
        saveFunc(data);
    };

    toggleWatchlist = () => {
        const data = this.state.itemDetails;
        data.watched = !data.watched;
        const saveFunc = (data.type === 'movie') ? saveMovie : saveTvShow;
        saveFunc(data);
    };

    toggleCollection = () => {
        if (this.state.inCollection) {
            this.deleteItem();
        } else {
            this.addItemToCollection();
        }
    };

    render() {
        const item = this.state.itemDetails;
        return (
            <View style={styles.container}>
                {this.renderModal()}
                <LoadingContainer loading={this.state.loading}>
                    <View>
                        <ScrollView>
                            <Backdrop path={item.backdrop_path} />
                            <View style={styles.content}>
                                <Header itemDetails={item} />
                                <SubHeader itemDetails={item} />
                                <Text style={styles.overview}>{item.overview}</Text>
                                <View style={styles.releaseDateContainer}>
                                    <Text style={styles.heading}>RELEASE DATE</Text>
                                    <Text style={{ color: '#EEE' }}>{this.formatReleaseDate()}</Text>
                                </View>
                                <Genres itemDetails={item} />
                                {item.credits && item.credits.cast.length > 0 && <CastList cast={item.credits.cast} />}
                                {item.credits && item.credits.crew.length > 0 && <CrewList crew={item.credits.crew} />}
                            </View>
                        </ScrollView>
                        <CollectionButton
                            favorite={this.state.itemDetails.favorite}
                            watched={this.state.itemDetails.watched}
                            collection={this.state.inCollection}
                            onFavoritesClick={this.toggleFavorite}
                            onWatchlistClick={this.toggleWatchlist}
                            onCollectionClick={this.toggleCollection}
                        />
                    </View>
                </LoadingContainer>
            </View>
        );
    };
}



function saveMovie(data) {
    const dateAdded = data.dateAdded || new Date().toDateString();
    return window.firebase.database().ref('movie/' + data.id).set({
        id: data.id,
        title: data.title,
        poster: data.poster_path,
        releaseDate: data.release_date,
        genres: data.genres,
        rating: data.vote_average.toFixed(1),
        watched: data.watched || false,
        favorite: data.favorite || false,
        dateAdded: dateAdded,
    });
}

function saveTvShow(data) {
    const dateAdded = data.dateAdded || new Date().toDateString();
    return window.firebase.database().ref('tv/' + data.id).set({
        id: data.id,
        title: data.name,
        poster: data.poster_path,
        releaseDate: data.first_air_date,
        genres: data.genres,
        rating: data.vote_average.toFixed(1),
        watched: data.watched || false,
        favorite: data.favorite || false,
        dateAdded: dateAdded,
    });
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        justifyContent: 'center',
    },
    content: {
        padding: 10,
    },
    overview: {
        color: '#EEE',
        lineHeight: 25,
        paddingBottom: 20,
    },
    deleteButton: {
        paddingHorizontal: 50,
        paddingTop: 30,
    },
    releaseDateContainer: {
        paddingVertical: 10,
    },
    heading: {
        fontWeight: '500',
        fontSize: 16,
        color: '#EEE',
        paddingBottom: 5,
    },
});
