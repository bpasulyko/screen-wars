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
import Backdrop from '../components/detailsView/Backdrop';

import { getImageConfig, getCollection } from '../repository/tmdbRepo';

export default class Collection extends React.Component {
    state = {
        loading: true,
        data: {},
    };

    componentDidMount() {
        const params = this.props.navigation.state.params;
        return getCollection(params.id)
            .then((responseJson) => {
                this.setState({
                    loading: false,
                    data: responseJson,
                })
            });
    }

    goToDetails = (selectedMovieId) => {
        this.props.navigation.navigate('MovieDetails', {
            id: selectedMovieId,
            type: 'movie',
        });
    };

    renderContent = () => {
        const imageConfig = getImageConfig();
        const baseUrl = imageConfig.base_url;
        const posterSize = imageConfig.poster_sizes[2];
        const posterUrl = `${baseUrl}${posterSize}${this.state.data.poster_path}`;
        const posterImage = (this.state.data.poster_path)
            ? <Image style={styles.poster} source={{ uri: posterUrl }} />
            : <View style={[styles.poster, styles.noImage]}><FontAwesome name="film" size={40} style={styles.noImageIcon} /></View>
        return (
            <View>
                <View style={styles.headerContainer}>
                    <Backdrop path={this.state.data.backdrop_path} singleImage />
                    <View style={styles.posterContainer}>
                        {posterImage}
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
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        height: 310,
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
    noImage: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#171717',
    },
    noImageIcon: {
        color: '#555',
    },
});
