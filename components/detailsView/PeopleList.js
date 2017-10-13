import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
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
            : <View style={[styles.image, styles.noImage]}><MaterialIcons name="person" size={80} style={{ color: '#555' }}/></View>
        return (
            <View style={styles.imageContainer}>
                {image}
            </View>
        );
    }

    renderPerson = (person, key) => {
        return (
            <TouchableOpacity key={key} style={styles.personContainer} onPress={() => {}}>
                <View>
                    {this.renderImage(person)}
                    <View style={styles.labelContainer}>
                        <TitleText style={styles.nameLabel}>{person.name}</TitleText>
                        <BodyText style={styles.roleLabel}>{person.character || person.job}</BodyText>
                    </View>
                </View>
            </TouchableOpacity>
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

const IMAGE_WIDTH = (Dimensions.get('window').width - 30) / 3;
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
        width: IMAGE_WIDTH,
        margin: 5,
    },
    imageContainer: {
        elevation: 4,
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        borderRadius: 4,
    },
    image: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noImage: {
        backgroundColor: '#171717',
    },
    labelContainer: {
        padding: 7,
    },
    nameLabel: {
        fontSize: 12,
        color: '#EEE',
        textAlign: 'center',
        paddingBottom: 3,
    },
    roleLabel: {
        fontSize: 10,
        color: '#EEE',
        opacity: 0.4,
        textAlign: 'center',
    },
});
