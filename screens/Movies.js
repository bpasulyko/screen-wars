import React from 'react';
import _ from 'lodash';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ListTypes from '../util/ListTypes'
import LoadingContainer from '../components/LoadingContainer';
import NavBarTitle from '../components/NavBarTitle';
import ItemList from '../components/ItemList';
import NoItems from '../components/NoItems';
import { FontAwesome } from '@expo/vector-icons';
import Router from '../navigation/Router';
import FilterButton from '../components/FilterButton';
import FilterMenu from '../components/FilterMenu';
import ListButtonGroup from '../components/ListButtonGroup';

export default class Movies extends React.Component {
    static route = {
        navigationBar: {
            backgroundColor: '#171717',
            renderTitle: ({ config: { eventEmitter }, params }) => {
                return <NavBarTitle title="Movies" emitter={eventEmitter}/>;
            },
            renderRight: ({ config: { eventEmitter }, params }) => {
                return <FilterButton emitter={eventEmitter} />;
            },
        },
    }

    state = {
        loading: true,
        movies: [],
        showFilterMenu: false,
        activeList: ListTypes.COLLECTION,
    };

    componentWillMount() {
        this.props.route.getEventEmitter().addListener('filter', this.handleFilter);
    }

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

    handleFilter = () => {
        this.setState({ showFilterMenu: !this.state.showFilterMenu });
    };

    handleListButtonClick = (activeList) => {
        this.setState({ activeList });
    };

    renderContent = () => {
        const filteredMovies = this.state.activeList.filter(this.state.movies);
        const text = `You haven't added any movies to your ${this.state.activeList.name}!`
        return (filteredMovies.length > 0)
            ? <ItemList list={filteredMovies} onClick={this.goToDetails} />
            : <NoItems icon={this.state.activeList.icon} text={text} />;
    };

    render() {
        return (
            <View style={styles.container}>
                <FilterMenu show={this.state.showFilterMenu} />
                <ListButtonGroup
                    activeList={this.state.activeList}
                    onListButtonClick={this.handleListButtonClick}
                />
                <LoadingContainer loading={this.state.loading}>
                    {this.renderContent()}
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
