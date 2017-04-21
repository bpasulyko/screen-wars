import React from 'react';
import _ from 'lodash';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LoadingContainer from '../components/LoadingContainer';
import NavBarTitle from '../components/NavBarTitle';
import ItemList from '../components/ItemList';
import NoItems from '../components/NoItems';
import DeleteModal from '../components/DeleteModal';
import { FontAwesome } from '@expo/vector-icons';
import Router from '../navigation/Router';

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
    };

    componentDidMount = () => {
        window.firebase.database().ref('tv/').on('value', (tvShows) => {
            this.setState({
                loading: false,
                tvShows: _.sortBy(_.values(tvShows.val()), 'title'),
            })
        });
    };

    goToDetails = (selectedTvShow) => {
        this.props.navigator.push(Router.getRoute('details', {
            id: selectedTvShow.id,
            type: 'tv',
        }));
    };

    render() {
        const content = (this.state.tvShows.length > 0)
            ? <ItemList list={this.state.tvShows} onClick={this.goToDetails} />
            : <NoItems icon="tv" text="You haven't added any TV shows to your collection!" />;
        return (
            <View style={styles.container}>
                <LoadingContainer loading={this.state.loading}>
                    {content}
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
});
