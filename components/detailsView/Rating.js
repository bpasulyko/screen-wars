import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class Rating extends React.Component {
    static propTypes = {
        rating: PropTypes.number,
    }

    renderStars = () => {
        const rating = this.props.rating/2;
        const fullStars = Math.floor(rating);
        const halfStar = (rating % 1 > 0.5) ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        const classes = [];
        for (var i = 0; i < fullStars; i++) {
            classes.push('star');
        }
        if (halfStar) {
            classes.push('star-half');
        }
        return classes.map((iconClass, i) => <FontAwesome key={i} name={iconClass} size={18} style={styles.icon} />);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.rating}>{this.props.rating.toFixed(1)}</Text>
                <View style={styles.stars}>
                    {this.renderStars()}
                </View>
            </View>
        );
    }
}

export default Rating;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rating: {
        fontSize: 28,
        color: '#EEE',
        fontFamily: 'star-wars',
    },
    stars: {
        flexDirection: 'row',
    },
    icon: {
        color: '#FFC107',
    }
});
