import React from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import TextBubble from '../TextBubble';
import BodyText from '../BodyText';
import TitleText from '../TitleText';
import { FontAwesome } from '@expo/vector-icons';

const CastList = React.createClass({
    propTypes: {
        cast: React.PropTypes.array,
    },

    getInitialState() {
        return {
            expanded: false,
        };
    },

    renderCastList() {
        if (this.state.expanded) {
            return this.props.cast.map((person, key) => {
                return <TextBubble key={key}>{person.name}</TextBubble>;
            });
        }
        return this.props.cast.slice(0, 3).map((person, key) => {
            return <TextBubble key={key}>{person.name}</TextBubble>;
        });
    },

    toggleCastList() {
        this.setState({ expanded: !this.state.expanded });
    },

    render() {
        const toggleLabel = (this.state.expanded) ? 'compress' : 'expand';
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <TitleText style={styles.title}>Cast</TitleText>
                    <TouchableOpacity onPress={this.toggleCastList}>
                        <FontAwesome
                            name={toggleLabel}
                            size={20}
                            style={styles.toggle}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.castListContainer}>
                    {this.renderCastList()}
                </View>
            </View>
        );
    }
});

export default CastList;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    castListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 5,
    },
    title: {
        fontSize: 16,
        color: '#EEE',
        paddingBottom: 5,
    },
    toggle: {
        color: '#EEE',
        paddingHorizontal: 10,
    },
});
