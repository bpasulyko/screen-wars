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
        movies: null,
    };

    componentDidMount() {
        window.firebase.database().ref('movies/').on('value', (movies) => {
            this.setState({
                loading: false,
                movies: movies.val(),
            })
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <LoadingContainer loading={this.state.loading}>
                    {this.state.movies && (
                        <ScrollView>
                            <ItemList list={_.sortBy(_.values(this.state.movies), 'title')} />
                        </ScrollView>
                    )}
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
