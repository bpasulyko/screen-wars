import React, { PropTypes } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';
import {
  StyleSheet,
} from 'react-native';

const CollectionButton = React.createClass({
    propTypes: {
        favorite: PropTypes.bool,
        watched: PropTypes.bool,
        collection: PropTypes.bool,
        onFavoritesClick: PropTypes.func,
        onWatchlistClick: PropTypes.func,
        onCollectionClick: PropTypes.func,
    },
    render() {
        const favoriteIcon = (this.props.favorite) ? 'star' : 'star-o';
        const favoriteIconStyle = (this.props.favorite) ? { color: '#FFC107' } : {};
        const watchedIcon = (this.props.watched) ? 'eye' : 'eye-slash';
        const watchedIconStyle = (this.props.watched) ? { color: '#388E3C' } : {};
        const collectionIcon = (this.props.collection) ? 'delete' : 'playlist-add';
        const collectionText = (this.props.collection) ? 'Remove' : 'Add to Collection';
        return (
            <ActionButton
                buttonColor="#D32F2F"
                degrees={135}
                spacing={5}
                autoInactive={false}
                useNativeFeedback={false}
                bgColor="rgba(0,0,0,0.8)"
                icon={<FontAwesome name="plus" style={styles.icon} />}
            >
                <ActionButton.Item
                    useNativeFeedback={false}
                    spaceBetween={5}
                    buttonColor="rgba(0,0,0,0)"
                    textContainerStyle={styles.itemContainer}
                    textStyle={styles.itemText}
                    title="Favorites"
                    onPress={this.props.onFavoritesClick}
                >
                    <FontAwesome name={favoriteIcon} style={[styles.itemIcons, favoriteIconStyle]} />
                </ActionButton.Item>
                <ActionButton.Item
                    useNativeFeedback={false}
                    spaceBetween={5}
                    buttonColor="rgba(0,0,0,0)"
                    textContainerStyle={styles.itemContainer}
                    textStyle={styles.itemText}
                    title="Watched"
                    onPress={this.props.onWatchlistClick}
                >
                    <FontAwesome name={watchedIcon} style={[styles.itemIcons, watchedIconStyle]} />
                </ActionButton.Item>
                <ActionButton.Item
                    useNativeFeedback={false}
                    spaceBetween={5}
                    buttonColor="rgba(0,0,0,0)"
                    textContainerStyle={styles.itemContainer}
                    textStyle={styles.itemText}
                    title={collectionText}
                    onPress={this.props.onCollectionClick}
                >
                    <MaterialIcons name={collectionIcon} style={styles.itemIcons} />
                </ActionButton.Item>
            </ActionButton>
        );
    }
});

export default CollectionButton;

const styles = StyleSheet.create({
    icon: {
        fontSize: 16,
        color: '#EEE',
    },
    itemIcons: {
        fontSize: 30,
        color: '#EEE',
    },
    itemContainer: {
        backgroundColor: "#333",
        borderColor: "#444",
    },
    itemText: {
        color: "#EEE",
        fontWeight: 'bold',
    },
});
