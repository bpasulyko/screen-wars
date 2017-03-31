import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import {
  StackNavigation,
  DrawerNavigation,
  DrawerNavigationItem,
} from '@expo/ex-navigation';
import { FontAwesome } from '@expo/vector-icons';
import Router from './Router';
import { Font } from 'expo';

const Drawer = React.createClass({
    renderHeader() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>SCREEN WARS</Text>
            </View>
        );
    },

    renderTitle(title, icon, isSelected) {
        return (
            <View style={styles.titleContainer}>
                <FontAwesome
                    style={[styles.icon, isSelected ? styles.selectedTitleText : {}]}
                    name={icon}
                    size={24}
                />
                <Text style={[styles.titleText, isSelected ? styles.selectedTitleText : {}]}>
                    {title}
                </Text>
            </View>
        );
    },

    render() {
        return (
            <DrawerNavigation id='main' initialItem='home' drawerWidth={280} drawerStyle={styles.drawer} renderHeader={this.renderHeader}>
                <DrawerNavigationItem
                    id='home'
                    selectedStyle={styles.selectedItemStyle}
                    renderTitle={isSelected => this.renderTitle('Home', 'home', isSelected)}>
                    <StackNavigation id='home' initialRoute={Router.getRoute('home')} />
                </DrawerNavigationItem>
                <DrawerNavigationItem
                    id='movies'
                    selectedStyle={styles.selectedItemStyle}
                    renderTitle={isSelected => this.renderTitle('Movies', 'film', isSelected)}>
                    <StackNavigation id='movies' initialRoute={Router.getRoute('movies')} />
                </DrawerNavigationItem>
                <DrawerNavigationItem
                    id='tvshows'
                    selectedStyle={styles.selectedItemStyle}
                    renderTitle={isSelected => this.renderTitle('TV Shows', 'tv', isSelected)}>
                    <StackNavigation id='tvshows' initialRoute={Router.getRoute('tvshows')} />
                </DrawerNavigationItem>
            </DrawerNavigation>
        );
    }
});

const styles = StyleSheet.create({
    header: {
        height:180,
        backgroundColor: '#171717',
        justifyContent: 'center',
    },
    headerTitle: {
        position: 'absolute',
        bottom: 30,
        fontFamily: 'star-wars-outline',
        fontSize: 55,
        textAlign: 'center',
        lineHeight: 50,
        color: '#D32F2F',
    },
    drawer: {
        backgroundColor: '#333',
    },
    selectedItemStyle: {
        backgroundColor: '#555',
    },
    selectedTitleText: {
        color: '#EEE'
    },
    icon: {
        color: '#EEE',
    },
    titleText: {
        color: '#EEE',
        fontWeight: 'bold',
        marginLeft: 18,
    },
    titleContainer: {
        flexDirection: 'row',
        flex: 1,
        height: 40,
        alignItems: 'center',
    },
});

export default Drawer;
