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
import Header from '../components/detailsView/Header';
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
        return (
            <View style={styles.container}>
                <LoadingContainer loading={this.state.loading}>
                    <ScrollView>
                        <Backdrop path={item.backdrop_path} />
                        <View style={styles.content}>
                            <Header itemDetails={item} />
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
        flex: 1,
        padding: 10,
    },
});
