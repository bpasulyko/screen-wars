import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import NavBarTitle from '../components/NavBarTitle';
import FilterButton from '../components/FilterButton';
import { StackNavigator } from 'react-navigation';
import Home from '../screens/Home';
import Movies from '../screens/Movies';
import TvShows from '../screens/TvShows';
import DetailsView from '../screens/DetailsView';
import Collection from '../screens/Collection';
import Seasons from '../screens/Seasons';
import Episodes from '../screens/Episodes';
import Settings from '../screens/Settings';

const DrawerIcon = ({ navigate }) => {
    return (
        <TouchableOpacity onPress={() => navigate('DrawerOpen')}>
            <MaterialIcons name="menu" size={24} style={{ paddingLeft: 15, color: '#EEE' }} />
        </TouchableOpacity>
    );
};

export const HomeStack = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: '#EEE',
            headerTitle: <NavBarTitle title="Screen Wars" />,
            headerLeft: <DrawerIcon {...navigation} />,
            headerStyle: {
                backgroundColor: '#171717',
                elevation: 0,
            },
        }),
    },
    ...MoviesStack,
    ...TvStack,
});

export const MoviesStack = StackNavigator({
    Movies: {
        screen: Movies,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: '#EEE',
            headerTitle: <NavBarTitle title="Movies" />,
            headerLeft: <DrawerIcon {...navigation} />,
            headerStyle: {
                backgroundColor: '#171717',
                elevation: 0,
            },
            headerRight: <FilterButton onPress={() => navigation.setParams({ filter: true })} />,
        }),
    },
    MovieDetails: {
        screen: DetailsView,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: '#EEE',
            headerStyle: {
                position: 'absolute',
                backgroundColor: 'transparent',
                zIndex: 100,
                top: 0,
                left: 0,
                right: 0,
                elevation: 0,
            },
        }),
    },
    Collection: {
        screen: Collection,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: '#EEE',
            headerStyle: {
                position: 'absolute',
                backgroundColor: 'transparent',
                zIndex: 100,
                top: 0,
                left: 0,
                right: 0,
                elevation: 0,
            },
        }),
    },
});

export const TvStack = StackNavigator({
    TvShows: {
        screen: TvShows,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: '#EEE',
            headerTitle: <NavBarTitle title="TV" />,
            headerLeft: <DrawerIcon {...navigation} />,
            headerStyle: {
                backgroundColor: '#171717',
                elevation: 0,
            },
            headerRight: <FilterButton onPress={() => navigation.setParams({ filter: true })} />,
        }),
    },
    TvDetails: {
        screen: DetailsView,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: '#EEE',
            headerStyle: {
                position: 'absolute',
                backgroundColor: 'transparent',
                zIndex: 100,
                top: 0,
                left: 0,
                right: 0,
                elevation: 0,
            },
        }),
    },
    Seasons: {
        screen: Seasons,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: '#EEE',
            headerTitle: <NavBarTitle title="Seasons" />,
            headerStyle: {
                backgroundColor: '#171717',
                elevation: 0,
            },
        }),
    },
    Episodes: {
        screen: Episodes,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: '#EEE',
            headerTitle: <NavBarTitle title="Episodes" />,
            headerStyle: {
                backgroundColor: '#171717',
                elevation: 0,
            },
        }),
    },
});

export const SettingsStack = StackNavigator({
    Settings: {
        screen: Settings,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: '#EEE',
            headerTitle: <NavBarTitle title="Settings" noIcon />,
            headerLeft: <DrawerIcon {...navigation} />,
            headerStyle: {
                backgroundColor: '#171717',
                elevation: 0,
            },
        }),
    },
});
