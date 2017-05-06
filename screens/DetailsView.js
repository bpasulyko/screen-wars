import React from 'react';
import _ from 'lodash';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
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
import CollectionSection from '../components/detailsView/CollectionSection';
import CollectionButton from '../components/detailsView/CollectionButton';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Button from '../components/Button';
import Router from '../navigation/Router';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { getByType } from '../repository/tmdbRepo';

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
        return getByType(params.type, params.id)
            .then((responseJson) => {
                window.firebase.database().ref(`${params.type}/${params.id}/`).on('value', (details) => {
                    this.setState({
                        itemDetails: _.merge({}, responseJson, details.val(), { type: params.type }),
                        loading: false,
                        inCollection: details.val() !== null,
                    });
                });
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

    formatReleaseDate = () => {
        const item = this.state.itemDetails;
        const releaseDate = (item.type === 'movie') ? item.release_date : item.first_air_date;
        if (releaseDate) {
            return moment(releaseDate).format('MMMM D, YYYY');
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

    goToCollection = (id) => {
        this.props.navigator.replace(Router.getRoute('collection', { id: id }));
    };

    goToSeasons = () => {
        console.log('seasons');
    };

    render() {
        const item = this.state.itemDetails;
        return (
            <View style={styles.container}>
                <LoadingContainer loading={this.state.loading}>
                    <View>
                        <ScrollView>
                            <Backdrop path={item.backdrop_path} />
                            <View>
                                <Header itemDetails={item} />
                                <SubHeader itemDetails={item} onSeasonsClick={this.goToSeasons} />
                                <View style={styles.overview}>
                                    <TitleText style={styles.heading}>Overview</TitleText>
                                    <BodyText style={styles.overviewText}>{item.overview}</BodyText>
                                </View>
                                {item.belongs_to_collection && (
                                    <CollectionSection collectionData={item.belongs_to_collection} onViewLinkClick={this.goToCollection} />
                                )}
                                <View style={styles.releaseDateContainer}>
                                    <TitleText style={styles.heading}>Release Date</TitleText>
                                    <BodyText style={styles.releaseDate}>{this.formatReleaseDate()}</BodyText>
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
    const dateAdded = data.dateAdded || Date.now();
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
    const dateAdded = data.dateAdded || Date.now();
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
    overview: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: 'rgba(211, 47, 47, 0.75)',
    },
    overviewText: {
        color: '#EEE',
        fontSize: 15,
        lineHeight: 25,
    },
    releaseDateContainer: {
        padding: 20,
    },
    releaseDate: {
        color: '#EEE',
        fontSize: 15,
    },
    heading: {
        fontSize: 20,
        color: '#EEE',
        paddingBottom: 5,
    },
});
