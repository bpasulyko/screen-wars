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
import Drawer from './navigation/Drawer';
import * as firebase from 'firebase';
import { firebaseConfig } from './util/firebaseUtil';
import { setIcon } from './util/themeUtil';
import _ from 'lodash';
import { loadAppDefaults } from './repository/tmdbRepo';

firebase.initializeApp(firebaseConfig);
window.firebase = firebase;

export default class App extends React.Component {
    state = {
        appIsReady: false,
        fontLoaded: false,
        iconLoaded: false,
    }

    componentWillMount() {
        this.loadAssetsAsync();
        this.loadIcon();
        loadAppDefaults().then(() => this.setState({ appIsReady: true }));
    }

    loadIcon = () => {
        window.firebase.database().ref('icon/').on('value', (icon) => {
            setIcon(icon.val());
            this.setState({ iconLoaded: true });
        });
    }

    async loadAssetsAsync() {
        await Expo.Font.loadAsync({
            'star-wars': require('./assets/fonts/SFDistantGalaxy.ttf'),
            'star-wars-outline': require('./assets/fonts/SFDistantGalaxyOutline.ttf'),
            'raleway-bold': require('./assets/fonts/Raleway-ExtraBold.ttf'),
            'raleway': require('./assets/fonts/Raleway-Regular.ttf'),
            'Arial': require('./assets/fonts/Raleway-Regular.ttf'),
        });
        this.setState({ fontLoaded: true });
    }

    render() {
        if (this.state.appIsReady && this.state.fontLoaded && this.state.iconLoaded) {
            return (
                <View style={styles.container}>
                    <View style={styles.statusBarUnderlay} />
                    <Drawer/>
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
        backgroundColor: '#171717',
    },
});
