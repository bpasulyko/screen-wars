import React, { Component } from 'react';
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
} from '@exponent/ex-navigation';
import { Ionicons } from '@exponent/vector-icons';
import Router from './Router';
import { Font } from 'exponent';

const Drawer = React.createClass({
    renderHeader() {
        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>SCREEN WARS</Text>
            </View>
        );
    },

    renderTitle(title, isSelected) {
        return (
            <Text style={[styles.titleText, isSelected ? styles.selectedTitleText : {}]}>
                {title}
            </Text>
        );
    },

    renderIcon(name, isSelected) {
        return (
            <Ionicons
                style={[styles.icon, isSelected ? styles.selectedTitleText : null]}
                name={name}
                size={24}
            />
        );
    },

    render() {
        return (
            <DrawerNavigation id='main' initialItem='home' drawerWidth={300} drawerStyle={styles.drawer} renderHeader={this.renderHeader}>
                <DrawerNavigationItem
                    id='home'
                    selectedStyle={styles.selectedItemStyle}
                    renderTitle={isSelected => this.renderTitle('Home', isSelected)}
                    renderIcon={isSelected => this.renderIcon('md-alert', isSelected)}>
                    <StackNavigation id='home' initialRoute={Router.getRoute('home')} />
                </DrawerNavigationItem>
                <DrawerNavigationItem
                    id='movies'
                    selectedStyle={styles.selectedItemStyle}
                    renderTitle={isSelected => this.renderTitle('Movies', isSelected)}>
                    <StackNavigation id='movies' initialRoute={Router.getRoute('movies')} />
                </DrawerNavigationItem>
            </DrawerNavigation>
        );
    }
});

const styles = StyleSheet.create({
    header: {
        flex: 1,
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
        backgroundColor: '#444',
    },
    selectedItemStyle: {
        backgroundColor: '#AAA',
    },
    selectedTitleText: {
        color: 'white'
    },
    icon: {
        color: 'purple',
    },
    titleText: {
        color: '#222',
        fontWeight: 'bold',
        marginLeft: 18,
    },
});

export default Drawer;
