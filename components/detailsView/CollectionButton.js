import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';
import {
    View,
    StyleSheet,
} from 'react-native';

class CollectionButton extends React.Component {
    static propTypes = {
        inCollection: PropTypes.bool,
        inWatchlist: PropTypes.bool,
        inFavorites: PropTypes.bool,
        onAdd: PropTypes.func,
        onDelete: PropTypes.func,
        toggleFavorite: PropTypes.func,
    }

    renderDefaultView = () => {
        return (
            <ActionButton
                autoInactive={false}
                buttonColor="#D32F2F"
                degrees={135}
                spacing={5}
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
                    title="Collection"
                    onPress={() => this.props.onAdd({ watched: true })}
                >
                    <MaterialIcons name="playlist-add" style={styles.itemIcons} />
                </ActionButton.Item>
                <ActionButton.Item
                    useNativeFeedback={false}
                    spaceBetween={5}
                    buttonColor="rgba(0,0,0,0)"
                    textContainerStyle={styles.itemContainer}
                    textStyle={styles.itemText}
                    title="Watchlist"
                    onPress={() => this.props.onAdd({ watched: false })}
                >
                    <FontAwesome name="eye" style={styles.itemIcons} />
                </ActionButton.Item>
            </ActionButton>
        );
    };

    renderInCollectionView = () => {
        const favoriteIcon = (this.props.inFavorites) ? 'star' : 'star-o';
        const favoriteIconStyle = (this.props.inFavorites) ? { color: '#FFC107' } : {};
        return (
            <ActionButton
                autoInactive={false}
                buttonColor="#D32F2F"
                degrees={135}
                spacing={5}
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
                    title="Favorite"
                    onPress={this.props.toggleFavorite}
                >
                    <FontAwesome name={favoriteIcon} style={[styles.itemIcons, favoriteIconStyle]} />
                </ActionButton.Item>
                <ActionButton.Item
                    useNativeFeedback={false}
                    spaceBetween={5}
                    buttonColor="rgba(0,0,0,0)"
                    textContainerStyle={styles.itemContainer}
                    textStyle={styles.itemText}
                    title="Remove"
                    onPress={this.props.onDelete}
                >
                    <MaterialIcons name="delete" style={styles.itemIcons} />
                </ActionButton.Item>
            </ActionButton>
        );
    };

    renderInWatchlistView = () => {
        return (
            <ActionButton
                autoInactive={false}
                buttonColor="#D32F2F"
                degrees={135}
                spacing={5}
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
                    title="Move to Collection"
                    onPress={() => this.props.onAdd({ watched: true })}
                >
                    <MaterialIcons name="playlist-add" style={styles.itemIcons} />
                </ActionButton.Item>
                <ActionButton.Item
                    useNativeFeedback={false}
                    spaceBetween={5}
                    buttonColor="rgba(0,0,0,0)"
                    textContainerStyle={styles.itemContainer}
                    textStyle={styles.itemText}
                    title="Remove"
                    onPress={this.props.onDelete}
                >
                    <MaterialIcons name="delete" style={styles.itemIcons} />
                </ActionButton.Item>
            </ActionButton>
        );
    };

    render() {
        if (this.props.inWatchlist) {
            return this.renderInWatchlistView();
        } else if (this.props.inCollection) {
            return this.renderInCollectionView();
        } else {
            return this.renderDefaultView();
        }
    }
}

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
