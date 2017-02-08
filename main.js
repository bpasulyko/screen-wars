import Exponent from 'exponent';
import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    StatusBar,
} from 'react-native';
import {
    NavigationProvider,
    StackNavigation,
} from '@exponent/ex-navigation';
import Router from './navigation/Router';
import Drawer from './navigation/Drawer';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDxIqLoE2tSxlm76VsnomRdccAyKRg8VA0",
    authDomain: "screen-wars.firebaseapp.com",
    databaseURL: "https://screen-wars.firebaseio.com",
    storageBucket: "screen-wars.appspot.com",
    messagingSenderId: "82685205616"
};
firebase.initializeApp(config);
window.firebase = firebase;

window.API_KEY = 'c61fe26ad89f613231e56e67cff3779d';
window.BASE_URL = 'https://api.themoviedb.org/3';

class App extends React.Component {
    state = {
        appIsReady: false,
    }

    componentWillMount() {
        this.loadAssetsAsync();
        this.loadImageConfig();
    }

    async loadAssetsAsync() {
        await Exponent.Font.loadAsync({
            'star-wars': require('./assets/fonts/SFDistantGalaxy.ttf'),
            'star-wars-outline': require('./assets/fonts/SFDistantGalaxyOutline.ttf'),
        });
    }

    loadImageConfig() {
        return fetch(`${BASE_URL}/configuration?api_key=${API_KEY}`)
            .then((response) => response.json())
            .then((responseJson) => {
                window.imageConfig = responseJson.images;
                this.setState({ appIsReady: true });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.appIsReady) {
            return (
                <View style={styles.container}>
                    <NavigationProvider router={Router}>
                        <Drawer/>
                    </NavigationProvider>

                    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                    {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
                </View>
            );
        } else {
            return (
                <Exponent.Components.AppLoading />
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    statusBarUnderlay: {
        height: 24,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
});

Exponent.registerRootComponent(App);
