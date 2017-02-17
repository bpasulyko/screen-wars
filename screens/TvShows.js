import React from 'react';
import _ from 'lodash';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LoadingContainer from '../components/LoadingContainer';
import NavBarTitle from '../components/NavBarTitle';
import ItemList from '../components/ItemList';
import DeleteModal from '../components/DeleteModal';
import { FontAwesome } from '@exponent/vector-icons';

export default class TvShows extends React.Component {
    static route = {
        navigationBar: {
            backgroundColor: '#171717',
            renderTitle: ({ config: { eventEmitter }, params }) => {
                return <NavBarTitle title="TV" emitter={eventEmitter}/>;
            },
        },
    }

    state = {
        loading: true,
        tvShows: [],
        selectedTvShow: null,
        modalVisible: false,
    };

    componentDidMount = () => {
        window.firebase.database().ref('tv/').on('value', (tvShows) => {
            this.setState({
                loading: false,
                tvShows: _.sortBy(_.values(tvShows.val()), 'title'),
            })
        });
    };

    showDeleteModal = (selectedTvShow) => {
        this.setState({
            modalVisible: true,
            selectedTvShow: selectedTvShow,
        });
    };

    deleteTvShow = () => {
        return window.firebase.database().ref('tv/' + this.state.selectedTvShow.id).remove()
            .then(() => {
                this.props.navigator.showLocalAlert(this.state.selectedTvShow.title + ' deleted!', {
                    text: { color: '#EEE' },
                    container: { backgroundColor: '#222' },
                });
                this.closeModal();
            });
    };

    closeModal = () => {
        this.setState({
            modalVisible: false,
            selectedTvShow: null,
        });
    };

    renderModal = () => {
        return (
            <DeleteModal
                selectedItem={this.state.selectedTvShow}
                visible={this.state.modalVisible}
                onClose={this.closeModal}
                onDelete={this.deleteTvShow}
            />
        );
    };

    render() {
        const TvShowList = (
            <ScrollView>
                <ItemList list={this.state.tvShows} onClick={this.showDeleteModal} />
            </ScrollView>
        );
        const NoTvShows = (
            <View style={styles.noTvShows}>
                <FontAwesome name="tv" size={100} style={styles.icon} />
                <Text style={styles.noTvShowsText}>You haven't added any TV shows to your collection!</Text>
            </View>
        );
        return (
            <View style={styles.container}>
                {this.state.selectedTvShow && this.renderModal()}
                <LoadingContainer loading={this.state.loading}>
                    {this.state.tvShows.length > 0 && TvShowList || NoTvShows}
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
    noTvShows: {
        padding: 20,
    },
    icon: {
        color: '#888',
        textAlign: 'center',
        marginBottom: 20,
    },
    noTvShowsText: {
        color: '#EEE',
        fontSize: 20,
        textAlign: 'center',
    }
});
