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

const ListTypes = {
    COLLECTION: 'collection',
    WATCHLIST: 'watchlist',
    FAVORITES: 'favorites',
};

const CollectionBreakdown = React.createClass({
    propTypes: {
        data: PropTypes.array,
        onItemClick: PropTypes.func,
        type: PropTypes.string,
    },

    renderLabel({ route }) {
        return <Text style={styles.tabLabel}>{route.key.toUpperCase()}</Text>;
    },

    renderItemList(data, listType) {
        let icon = (this.props.type === 'movies') ? 'film' : 'tv';
        if (listType === ListTypes.WATCHLIST) icon = 'eye-slash';
        if (listType === ListTypes.FAVORITES) icon = 'star-o';
        const noDataMessage = `You haven't added any ${this.props.type} to your ${listType}!`;
        const content = (data.length > 0)
            ? (
                <ScrollView>
                    <ItemList list={data} onClick={this.props.onItemClick} />
                </ScrollView>
            )
            : <NoItems icon={icon} text={noDataMessage} />;
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
                initialTab={ListTypes.COLLECTION}
                renderLabel={this.renderLabel}
                barBackgroundColor="#171717"
                indicatorStyle={styles.tabIndicator}>
                <SlidingTabNavigationItem id={ListTypes.COLLECTION}>
                    {this.renderItemList(this.props.data, ListTypes.COLLECTION)}
                </SlidingTabNavigationItem>
                <SlidingTabNavigationItem id={ListTypes.WATCHLIST}>
                    {this.renderItemList(watchlist, ListTypes.WATCHLIST)}
                </SlidingTabNavigationItem>
                <SlidingTabNavigationItem id={ListTypes.FAVORITES}>
                    {this.renderItemList(favorites, ListTypes.FAVORITES)}
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
