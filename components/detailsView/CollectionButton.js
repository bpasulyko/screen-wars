import React, { PropTypes } from 'react';
import { FontAwesome } from '@expo/vector-icons';
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
        const watchedIcon = (this.props.watched) ? 'eye' : 'eye-slash';
        const collectionIcon = (this.props.collection) ? 'trash' : 'plus';
        const collectionText = (this.props.collection) ? 'Remove' : 'Add';
        return (
            <ActionButton
                buttonColor="#D32F2F"
                degrees={135}
                autoInactive={false}
                useNativeFeedback={false}
                bgColor="rgba(0,0,0,0.8)"
                icon={<FontAwesome name="plus" style={styles.icon} />}
            >
                <ActionButton.Item
                    useNativeFeedback={false}
                    buttonColor="rgba(0,0,0,0)"
                    textContainerStyle={styles.itemContainer}
                    textStyle={styles.itemText}
                    title="Favorites"
                    onPress={this.props.onFavoritesClick}
                >
                    <FontAwesome name={favoriteIcon} style={styles.itemIcons} />
                </ActionButton.Item>
                <ActionButton.Item
                    useNativeFeedback={false}
                    buttonColor="rgba(0,0,0,0)"
                    textContainerStyle={styles.itemContainer}
                    textStyle={styles.itemText}
                    title="Watched"
                    onPress={this.props.onWatchlistClick}
                >
                    <FontAwesome name={watchedIcon} style={styles.itemIcons} />
                </ActionButton.Item>
                <ActionButton.Item
                    useNativeFeedback={false}
                    buttonColor="rgba(0,0,0,0)"
                    textContainerStyle={styles.itemContainer}
                    textStyle={styles.itemText}
                    title={collectionText}
                    onPress={this.props.onCollectionClick}
                >
                    <FontAwesome name={collectionIcon} style={styles.itemIcons} />
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
        fontSize: 34,
        color: '#EEE',
    },
    itemContainer: {
        backgroundColor: "#333",
        borderColor: "#444",
    },
    itemText: {
        color: "#EEE",
        fontSize: 14,
        fontWeight: 'bold',
    },
});
