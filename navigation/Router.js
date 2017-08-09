import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import NavBarTitle from '../components/NavBarTitle';
import { StackNavigator } from 'react-navigation';
import Home from '../screens/Home';
import Movies from '../screens/Movies';
import TvShows from '../screens/TvShows';
import DetailsView from '../screens/DetailsView';
import Collection from '../screens/Collection';
import Seasons from '../screens/Seasons';
import Episodes from '../screens/Episodes';

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
            },
            // headerRight FilterButton
        }),
    },
    Details: {
        screen: DetailsView,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: '#EEE',
            headerTitle: <NavBarTitle title="Screen Wars" />,
            headerStyle: {
                backgroundColor: '#171717',
            },
        }),
    },
    Collection: {
        screen: Collection,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: '#EEE',
            headerTitle: <NavBarTitle title="Screen Wars" />,
            headerStyle: {
                backgroundColor: '#171717',
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
            },
            // headerRight FilterButton
        }),
    },
    Details: {
        screen: DetailsView,
        navigationOptions: ({ navigation }) => ({
            headerTintColor: '#EEE',
            headerTitle: <NavBarTitle title="Screen Wars" />,
            headerStyle: {
                backgroundColor: '#171717',
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
            },
        }),
    },
});
