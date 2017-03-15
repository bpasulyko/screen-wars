import React from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import TextBubble from '../TextBubble';
import { FontAwesome } from '@expo/vector-icons';

const CrewList = React.createClass({
    propTypes: {
        crew: React.PropTypes.array,
    },

    getInitialState() {
        return {
            expanded: false,
        };
    },

    renderCrewList() {
        if (this.state.expanded) {
            const crew = _.groupBy(this.props.crew, 'department');
            return _.keys(crew).map((dept, key) => {
                 return this.renderDepartmentSection(dept, key, crew);
            });
        }
    },

    renderDepartmentSection(dept, key, crew) {
        return (
            <View style={styles.departmentContainer} key={key}>
                <Text style={styles.dept}>{dept.toUpperCase()}</Text>
                <View style={styles.crewListContainer}>
                    {crew[dept].map((person, i) => {
                        return <TextBubble key={i}>{person.name}</TextBubble>;
                    })}
                </View>
            </View>
        );
    },

    toggleCrewList() {
        this.setState({ expanded: !this.state.expanded });
    },

    render() {
        const toggleLabel = (this.state.expanded) ? 'compress' : 'expand';
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>CREW</Text>
                    <TouchableOpacity onPress={this.toggleCrewList}>
                        <FontAwesome
                            name={toggleLabel}
                            size={20}
                            style={styles.toggle}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    {this.renderCrewList()}
                </View>
            </View>
        );
    }
});

export default CrewList;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    crewListContainer: {
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
        fontWeight: '500',
        fontSize: 16,
        color: '#EEE',
    },
    toggle: {
        color: '#EEE',
        paddingHorizontal: 10,
    },
    departmentContainer: {
        paddingVertical: 10,
    },
    dept: {
        fontSize: 12,
        color: '#EEE',
    },
});
