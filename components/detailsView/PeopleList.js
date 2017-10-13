import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import BodyText from '../BodyText';
import TitleText from '../TitleText';
import { MaterialIcons } from '@expo/vector-icons';
import { getImageConfig } from '../../repository/tmdbRepo';

class PeopleList extends React.Component {
    static propTypes = {
        type: PropTypes.oneOf(['cast', 'crew']),
        people: PropTypes.array,
    }

    renderImage = (person) => {
        const imageConfig = getImageConfig();
        const baseUrl = imageConfig.base_url;
        const size = imageConfig.poster_sizes[1];
        const imageUrl = `${baseUrl}${size}${person.profile_path}`;
        const image = (person.profile_path)
            ? <Image style={styles.image} source={{ uri: imageUrl }} />
            : <View style={[styles.image, styles.noImage]}><MaterialIcons name="person" size={24} style={{ color: '#555' }}/></View>
        return (
            <View style={styles.imageContainer}>
                <TouchableHighlight style={styles.image} onPress={() => {}}>
                    {image}
                </TouchableHighlight>
            </View>
        );
    }

    renderPerson = (person, key) => {
        return (
            <View key={key} style={styles.personContainer}>
                {this.renderImage(person)}
                <TitleText style={styles.label}>{person.name}</TitleText>
                <BodyText style={[styles.label, { opacity: 0.4 }]}>{person.character || person.job}</BodyText>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <TitleText style={styles.title}>{_.capitalize(this.props.type)}</TitleText>
                <ScrollView horizontal>
                    {this.props.people.map(this.renderPerson)}
                </ScrollView>
            </View>
        );
    }
}

export default PeopleList;

const IMAGE_WIDTH = (Dimensions.get('window').width - 24) / 3;
const IMAGE_HEIGHT = IMAGE_WIDTH/(2/3);

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    title: {
        fontSize: 20,
        color: '#EEE',
        paddingBottom: 5,
        paddingHorizontal: 20,
    },
    personContainer: {
        elevation: 4,
        alignItems: 'center',
        width: IMAGE_WIDTH,
        margin: 4,
        backgroundColor: '#333',
        borderRadius: 4,
    },
    imageContainer: {
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
    },
    image: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    noImage: {
        backgroundColor: '#171717',
    },
    label: {
        fontSize: 12,
        color: '#EEE',
        padding: 7,
        textAlign: 'center',
    },
});
