import React, { PropTypes } from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
} from 'react-native';
import {
    SlidingTabNavigation,
    SlidingTabNavigationItem,
} from '@expo/ex-navigation';
import ItemList from '../components/ItemList';
import NoItems from '../components/NoItems';

const CollectionBreakdown = React.createClass({
    propTypes: {
        data: PropTypes.array,
        onItemClick: PropTypes.func,
    },

    renderLabel({ route }) {
        return <Text style={styles.tabLabel}>{route.key.toUpperCase()}</Text>;
    },

    renderItemList(data) {
        const content = (data.length > 0)
            ? (
                <ScrollView>
                    <ItemList list={data} onClick={this.props.onItemClick} />
                </ScrollView>
            )
            : <NoItems icon="film" text="You haven't added any movies to your collection!" />;
        return (
            <View style={styles.container}>
                {content}
            </View>
        );
    },

    render() {
        const watchlist = _.filter(this.props.data, { watched: false });
        const favorites = _.filter(this.props.data, { favorite: true });;
        return (
            <SlidingTabNavigation
                id="sliding-tab-navigation"
                navigatorUID="sliding-tab-navigation"
                initialTab="collection"
                renderLabel={this.renderLabel}
                barBackgroundColor="#171717"
                indicatorStyle={styles.tabIndicator}>
                <SlidingTabNavigationItem id="collection">
                    {this.renderItemList(this.props.data)}
                </SlidingTabNavigationItem>
                <SlidingTabNavigationItem id="watchlist">
                    {this.renderItemList(watchlist)}
                </SlidingTabNavigationItem>
                <SlidingTabNavigationItem id="favorites">
                    {this.renderItemList(favorites)}
                </SlidingTabNavigationItem>
            </SlidingTabNavigation>
        );
    }
});

export default CollectionBreakdown;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabLabel: {
        margin: 8,
        fontSize: 12,
        color: '#EEE',
    },
    tabIndicator: {
        backgroundColor: '#D32F2F',
    },
});
