import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { HomeStack, MoviesStack, TvStack, SettingsStack } from './Router';
import { Font } from 'expo';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

const SideDrawer = (props) => {
    return (
        <View style={styles.drawer}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>SCREEN WARS</Text>
            </View>
            <DrawerItems {...props} />
        </View>
    );
};

const Drawer = DrawerNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (<FontAwesome name="home" size={22} style={{ color: tintColor }} />),
        },
    },
    Movies: {
        screen: MoviesStack,
        navigationOptions: {
            drawerLabel: 'Movies',
            drawerIcon: ({ tintColor }) => (<FontAwesome name="film" size={22} style={{ color: tintColor }} />),
        },
    },
    TvShows: {
        screen: TvStack,
        navigationOptions: {
            drawerLabel: 'TV Shows',
            drawerIcon: ({ tintColor }) => (<FontAwesome name="tv" size={22} style={{ color: tintColor }} />),
        },
    },
    Settings: {
        screen: SettingsStack,
        navigationOptions: {
            drawerLabel: 'Settings',
            drawerIcon: ({ tintColor }) => (<FontAwesome name="cogs" size={22} style={{ color: tintColor }} />),
        },
    },
}, {
    drawerWidth: 280,
    contentComponent: SideDrawer,
    contentOptions: {
        activeTintColor: '#FFF',
        activeBackgroundColor: '#555',
        inactiveTintColor: '#EEE',
    }
});

const styles = StyleSheet.create({
    header: {
        height:180,
        backgroundColor: '#171717',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontFamily: 'star-wars-outline',
        fontSize: 55,
        textAlign: 'center',
        color: '#D32F2F',
    },
    drawer: {
        flex: 1,
        backgroundColor: '#333',
    },
});

export default Drawer;
