import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { FontAwesome } from '@exponent/vector-icons';

const Rating = React.createClass({
    propTypes: {
        rating: React.PropTypes.number,
    },

    renderStars() {
        const rating = this.props.rating/2;
        const fullStars = Math.floor(rating);
        const halfStar = (rating % 1 > 0.5) ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        const classes = [];
        for (var i = 0; i < fullStars; i++) {
            classes.push('star');
        }
        if (halfStar) {
            classes.push('star-half-o');
        }
        for (var j = 0; j < emptyStars; j++) {
            classes.push('star-o');
        }
        return classes.map((iconClass, i) => <FontAwesome key={i} name={iconClass} size={35} style={styles.icon} />);
    },

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.rating}>{this.props.rating}</Text>
                <View style={styles.stars}>
                    {this.renderStars()}
                </View>
            </View>
        );
    }
});

export default Rating;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    rating: {
        fontSize: 22,
        backgroundColor: '#EEE',
        paddingVertical:7,
        paddingHorizontal:12,
        borderRadius:1000,
        color: '#222',
        fontFamily: 'star-wars',
    },
    stars: {
        flexDirection: 'row',
        paddingLeft: 30,
    },
    icon: {
        color: '#FFC107',
        paddingHorizontal: 5,
    }
});
