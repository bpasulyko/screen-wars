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
import NoItems from '../components/NoItems';
import { FontAwesome } from '@expo/vector-icons';
import Router from '../navigation/Router';

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
    };

    componentDidMount() {
        window.firebase.database().ref('movie/').on('value', (movies) => {
            this.setState({
                loading: false,
                movies: _.sortBy(_.values(movies.val()), 'title'),
            })
        });
    }

    goToDetails = (selectedMovie) => {
        this.props.navigator.push(Router.getRoute('details', {
            id: selectedMovie.id,
            type: 'movie',
        }));
    };

    render() {
        const MovieList = (
            <ScrollView>
                <ItemList list={this.state.movies} onClick={this.goToDetails} />
            </ScrollView>
        );
        const content = (this.state.movies.length > 0)
            ? MovieList
            : <NoItems icon="film" text="You haven't added any movies to your collection!" />;
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
