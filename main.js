import Expo from 'expo';
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
} from '@expo/ex-navigation';
import Router from './navigation/Router';
import Drawer from './navigation/Drawer';
import * as firebase from 'firebase';
import _ from 'lodash';
import { loadAppDefaults } from './repository/tmdbRepo';

var config = {
    apiKey: "AIzaSyDxIqLoE2tSxlm76VsnomRdccAyKRg8VA0",
    authDomain: "screen-wars.firebaseapp.com",
    databaseURL: "https://screen-wars.firebaseio.com",
    storageBucket: "screen-wars.appspot.com",
    messagingSenderId: "82685205616"
};
firebase.initializeApp(config);
window.firebase = firebase;

class App extends React.Component {
    state = {
        appIsReady: false,
        fontLoaded: false,
    }

    componentWillMount() {
        this.loadAssetsAsync();
        loadAppDefaults().then(() => this.setState({ appIsReady: true }));
    }

    async loadAssetsAsync() {
        await Expo.Font.loadAsync({
            'star-wars': require('./assets/fonts/SFDistantGalaxy.ttf'),
            'star-wars-outline': require('./assets/fonts/SFDistantGalaxyOutline.ttf'),
            'raleway-bold': require('./assets/fonts/Raleway-ExtraBold.ttf'),
            'raleway': require('./assets/fonts/Raleway-Regular.ttf'),
        });
        this.setState({ fontLoaded: true })
    }

    render() {
        if (this.state.appIsReady && this.state.fontLoaded) {
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
                <Expo.AppLoading />
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

Expo.registerRootComponent(App);
