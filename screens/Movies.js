import React from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View,
} from 'react-native';

import LoadingContainer from '../components/LoadingContainer';
import NavBarTitle from '../components/NavBarTitle';
import Router from '../navigation/Router';
import CollectionBreakdown from './CollectionBreakdown';

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
        return (
            <View style={styles.container}>
                <LoadingContainer loading={this.state.loading}>
                    <CollectionBreakdown data={this.state.movies} onItemClick={this.goToDetails} />
                </LoadingContainer>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
    },
});
