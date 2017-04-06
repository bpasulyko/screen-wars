import React from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View,
} from 'react-native';

import LoadingContainer from '../components/LoadingContainer';
import NavBarTitle from '../components/NavBarTitle';
import DeleteModal from '../components/DeleteModal';
import Router from '../navigation/Router';
import CollectionBreakdown from './CollectionBreakdown';

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
        return (
            <View style={styles.container}>
                <LoadingContainer loading={this.state.loading}>
                    <CollectionBreakdown data={this.state.tvShows} onItemClick={this.goToDetails} />
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
