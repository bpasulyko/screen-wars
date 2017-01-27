import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LoadingContainer from '../components/LoadingContainer';
import getNavigationBar from '../components/NavBar';

export default class Movies extends React.Component {
    static route = getNavigationBar("Movies");

    state = {
        loading: true,
    };

    componentDidMount = () => {
        setTimeout(() => this.setState({ loading: false }), 3000);
    };

    render() {
        return (
            <View style={styles.container}>
                <LoadingContainer loading={this.state.loading}>
                    <Text>BOOM</Text>
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
