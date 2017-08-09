import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { HomeStack, MoviesStack, TvStack } from './Router';
import { Font } from 'expo';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

// const Drawer = React.createClass({
//     renderHeader() {
//         return (
//             <View style={styles.header}>
//                 <Text style={styles.headerTitle}>SCREEN WARS</Text>
//             </View>
//         );
//     },
//
//     renderTitle(title, icon, isSelected) {
//         return (
//             <View style={styles.titleContainer}>
//                 <FontAwesome
//                     style={[styles.icon, isSelected ? styles.selectedTitleText : {}]}
//                     name={icon}
//                     size={24}
//                 />
//                 <TitleText style={[styles.titleText, isSelected ? styles.selectedTitleText : {}]}>
//                     {title}
//                 </TitleText>
//             </View>
//         );
//     },
//
//     render() {
//         return (
//             <DrawerNavigation id='main' initialItem='home' drawerWidth={280} drawerStyle={styles.drawer} renderHeader={this.renderHeader}>
//                 <DrawerNavigationItem
//                     id='home'
//                     selectedStyle={styles.selectedItemStyle}
//                     renderTitle={isSelected => this.renderTitle('Home', 'home', isSelected)}>
//                     <HomeStack />
//                 </DrawerNavigationItem>
//                 <DrawerNavigationItem
//                     id='movies'
//                     selectedStyle={styles.selectedItemStyle}
//                     renderTitle={isSelected => this.renderTitle('Movies', 'film', isSelected)}>
//                     <MoviesStack />
//                 </DrawerNavigationItem>
//                 <DrawerNavigationItem
//                     id='tvshows'
//                     selectedStyle={styles.selectedItemStyle}
//                     renderTitle={isSelected => this.renderTitle('TV Shows', 'tv', isSelected)}>
//                     <TvStack />
//                 </DrawerNavigationItem>
//             </DrawerNavigation>
//         );
//     }
// });
//
// const styles = StyleSheet.create({
//     header: {
//         height:180,
//         backgroundColor: '#171717',
//         justifyContent: 'center',
//     },
//     headerTitle: {
//         position: 'absolute',
//         bottom: 30,
//         fontFamily: 'star-wars-outline',
//         fontSize: 55,
//         textAlign: 'center',
//         lineHeight: 50,
//         color: '#D32F2F',
//     },
//     drawer: {
//         backgroundColor: '#333',
//     },
//     selectedItemStyle: {
//         backgroundColor: '#555',
//     },
//     selectedTitleText: {
//         color: '#EEE'
//     },
//     icon: {
//         color: '#EEE',
//     },
//     titleText: {
//         color: '#EEE',
//         marginLeft: 18,
//     },
//     titleContainer: {
//         flexDirection: 'row',
//         flex: 1,
//         height: 40,
//         alignItems: 'center',
//     },
// });

const Drawer = DrawerNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            drawer: {
                label: 'Home',
            },
        },
    },
    Movies: {
        screen: MoviesStack,
        navigationOptions: {
            drawer: {
                label: 'Movies',
            },
        },
    },
    TvShows: {
        screen: TvStack,
        navigationOptions: {
            drawer: {
                label: 'TV Shows',
            },
        },
    },
});

export default Drawer;
