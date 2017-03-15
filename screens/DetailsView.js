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
        inCollection: true,
    };

    componentDidMount() {
        const params = this.props.route.params;
        return fetch(`${window.BASE_URL}/${params.type}/${params.item.id}?api_key=${window.API_KEY}&language=en-US&append_to_response=credits`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    itemDetails: _.merge({}, responseJson, params.item, { type: params.type }),
                    loading: false,
                    inCollection: params.inCollection,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    addItemToCollection = () => {
        const item = this.state.itemDetails;
        const saveFunc = (item.media_type === 'movie') ? saveMovie : saveTvShow;
        saveFunc(item).then(() => {
            const title = item.title || item.name;
            this.props.navigator.showLocalAlert(title + ' added!', {
                text: { color: '#EEE' },
                container: { backgroundColor: '#222' },
            });
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
                this.props.navigator.pop();
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

    render() {
        const item = this.state.itemDetails;
        return (
            <View style={styles.container}>
                {this.renderModal()}
                <LoadingContainer loading={this.state.loading}>
                    <ScrollView>
                        <Backdrop path={item.backdrop_path} />
                        <View style={styles.content}>
                            <Header itemDetails={item} />
                            {!this.state.inCollection && (
                                <Button color="#D32F2F" text="Add to Collection" onClick={this.addItemToCollection} />
                            )}
                            <SubHeader itemDetails={item} />
                            <Text style={styles.overview}>{item.overview}</Text>
                            <View style={styles.releaseDateContainer}>
                                <Text style={styles.heading}>RELEASE DATE</Text>
                                <Text style={{ color: '#EEE' }}>{this.formatReleaseDate()}</Text>
                            </View>
                            <Genres itemDetails={item} />
                            {item.credits && item.credits.cast.length > 0 && <CastList cast={item.credits.cast} />}
                            {item.credits && item.credits.crew.length > 0 && <CrewList crew={item.credits.crew} />}
                            {this.state.inCollection && (
                                <View style={styles.deleteButton}>
                                    <Button color="#D32F2F" text="Delete" icon="trash" onClick={this.showDeleteModal} />
                                </View>
                            )}
                        </View>
                    </ScrollView>
                </LoadingContainer>
            </View>
        );
    };
}



function saveMovie(data) {
    return window.firebase.database().ref('movie/' + data.id).set({
        id: data.id,
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
        id: data.id,
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
