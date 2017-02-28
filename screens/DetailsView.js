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
// import DeleteModal from '../components/DeleteModal';
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
    };

    componentDidMount() {
        const params = this.props.route.params;
        return fetch(`${window.BASE_URL}/${params.type}/${params.id}?api_key=${window.API_KEY}&language=en-US`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    itemDetails: responseJson,
                    loading: false,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const item = this.state.itemDetails;
        const baseUrl = window.imageConfig.base_url;
        const posterSize = window.imageConfig.poster_sizes[2];
        const posterUrl = `${baseUrl}${posterSize}${item.poster_path}`;
        const year = (item.release_date) ? item.release_date.split('-')[0] : '';
        return (
            <View style={styles.container}>
                <LoadingContainer loading={this.state.loading}>
                    <ScrollView>
                        <Backdrop path={item.backdrop_path} />
                        <View style={styles.content}>
                            <View style={styles.posterContainer}>
                                <Image style={styles.poster} source={{ uri: posterUrl }} />
                            </View>
                            <Text style={styles.title}>{item.title} ({year})</Text>
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
        elevation: 100,
        zIndex: 2,
        flex: 1,
        flexDirection: 'row',
        padding: 20,
    },
    posterContainer: {
        elevation: 5,
        backgroundColor: '#333',
        width: 90,
        height: 135,
        borderRadius: 4,
    },
    poster: {
        width: 90,
        height: 135,
        borderRadius: 4,
    },
    title: {
        fontSize: 24,
        flex: 1,
        color: '#EEE',
        paddingLeft: 10,
        fontFamily: 'star-wars',
        flexWrap: 'wrap',
    },
});
