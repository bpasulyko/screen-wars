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
import Rating from '../components/detailsView/Rating';
import Button from '../components/Button';
import DeleteModal from '../components/DeleteModal';
import { FontAwesome } from '@exponent/vector-icons';

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
    };

    componentDidMount() {
        const params = this.props.route.params;
        return fetch(`${window.BASE_URL}/${params.type}/${params.item.id}?api_key=${window.API_KEY}&language=en-US`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    itemDetails: _.merge({}, responseJson, params.item),
                    loading: false,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    showDeleteModal = () => {
        this.setState({
            modalVisible: true,
        });
    };

    deleteMovie = () => {
        console.log('deleted!');
        return window.firebase.database().ref('movies/' + this.state.itemDetails.id).remove()
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
                onDelete={this.deleteMovie}
            />
        );
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
                            <Rating rating={item.vote_average} />
                            <Text style={styles.tagline}>{item.tagline}</Text>
                            <Text style={styles.overview}>{item.overview}</Text>
                            <View style={styles.deleteButton}>
                                <Button color="#D32F2F" text="Delete" icon="trash" onClick={this.showDeleteModal} />
                            </View>
                        </View>
                    </ScrollView>
                </LoadingContainer>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tagline: {
        color: '#EEE',
        fontStyle: 'italic',
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 10,
    },
    overview: {
        color: '#EEE',
        lineHeight: 25,
    },
    deleteButton: {
        width: 300,
        padding: 20,
    },
});
