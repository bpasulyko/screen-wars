import React from 'react';
import _ from 'lodash';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';

import LoadingContainer from '../components/LoadingContainer';
import NavBarTitle from '../components/NavBarTitle';
import ItemList from '../components/ItemList';
import { FontAwesome } from '@expo/vector-icons';
import Router from '../navigation/Router';
import TitleText from '../components/TitleText';

import { getImageConfig, getCollection } from '../repository/tmdbRepo';

export default class Collection extends React.Component {
    static route = {
        navigationBar: {
            backgroundColor: '#171717',
            tintColor: '#EEE',
            renderTitle: ({ config: { eventEmitter }, params }) => {
                return <NavBarTitle title="Screen Wars" emitter={eventEmitter} />;
            },
        },
    }

    state = {
        loading: true,
        data: {},
    };

    componentDidMount() {
        const params = this.props.route.params;
        return getCollection(params.id)
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    data: responseJson,
                })
            });
    }

    goToDetails = (selectedMovieId) => {
        this.props.navigator.replace(Router.getRoute('details', {
            id: selectedMovieId,
            type: 'movie',
        }));
    };

    renderContent = () => {
        const imageConfig = getImageConfig();
        const baseUrl = imageConfig.base_url;
        const backdropSize = imageConfig.backdrop_sizes[1];
        const backdropUrl = `${baseUrl}${backdropSize}${this.state.data.backdrop_path}`;
        const posterSize = imageConfig.poster_sizes[2];
        const posterUrl = `${baseUrl}${posterSize}${this.state.data.poster_path}`;
        return (
            <View>
                <View style={styles.headerContainer}>
                    <Image style={styles.backdropImage} source={{ uri: backdropUrl }} />
                    <View style={styles.posterContainer}>
                        <Image style={styles.poster} source={{ uri: posterUrl }} />
                    </View>
                    <TitleText style={styles.title}>{this.state.data.name}</TitleText>
                </View>
                {this.state.data.parts && this.renderItemList(this.state.data.parts)}
            </View>
        );
    };

    renderItemList = (items) => {
        const itemList = _.sortBy(items, 'release_date').map((item) => {
            return {
                id: item.id,
                poster: item.poster_path,
                title: item.title,
            };
        });
        return <ItemList list={itemList} onClick={this.goToDetails} />;
    };

    render() {
        return (
            <View style={styles.container}>
                <LoadingContainer loading={this.state.loading}>
                    <ScrollView>
                        {this.renderContent()}
                    </ScrollView>
                </LoadingContainer>
            </View>
        );
    };
}

const WIDTH = Dimensions.get('window').width;
const BACKDROP_HEIGHT = WIDTH * 0.5625;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        height: 310,
    },
    backdropImage: {
        width: WIDTH,
        height: BACKDROP_HEIGHT,
    },
    posterContainer: {
        position: 'absolute',
        top: 140,
        zIndex: 2,
        flexDirection: 'row',
        marginHorizontal: 20,
        elevation: 5,
        backgroundColor: 'transparent',
        borderRadius: 4,
    },
    poster: {
        width: 100,
        height: 150,
        borderRadius: 4,
    },
    title: {
        paddingLeft: 130,
        paddingRight: 15,
        paddingTop: 15,
        fontSize: 24,
        color: '#EEE',
    },
});
