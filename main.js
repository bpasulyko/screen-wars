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

class App extends React.Component {
    state = {
        appIsReady: false,
    }

    componentWillMount() {
        this.loadAssetsAsync();
    }

    async loadAssetsAsync() {
        await Exponent.Font.loadAsync({
            'star-wars': require('./assets/fonts/SFDistantGalaxy.ttf'),
            'star-wars-outline': require('./assets/fonts/SFDistantGalaxyOutline.ttf'),
        });

        this.setState({ appIsReady: true });
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
