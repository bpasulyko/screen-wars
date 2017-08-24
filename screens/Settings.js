import React from 'react';

import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import LoadingContainer from '../components/LoadingContainer';
import TitleText from '../components/TitleText';

class Settings extends React.Component {
    state = {
        loading: true,
        icon: null,
    };

    componentDidMount() {
        window.firebase.database().ref('icon/').on('value', (icon) => {
            this.setState({
                loading: false,
                icon: icon.val(),
            });
        });
    }

    handleClick = (icon) => {
        this.setState({ icon });
    }

    handleSave = () => {
        window.firebase.database().ref('icon').set(this.state.icon);
    }

    renderRebelButton = () => {
        const rebelContainerStyles = this.state.icon === 'rebel'
            ? styles.rebelIconContainer
            : styles.iconContainerInactive;
        const rebelIconStyles = this.state.icon === 'rebel'
            ? styles.iconActive
            : styles.iconInactive;
        return (
            <TouchableNativeFeedback onPress={() => this.handleClick('rebel')}>
                <View style={[styles.iconContainer, rebelContainerStyles]}>
                    <FontAwesome name="rebel" size={100} style={rebelIconStyles} />
                </View>
            </TouchableNativeFeedback>
        );
    }

    renderEmpireButton = () => {
        const empireContainerStyles = this.state.icon === 'empire'
            ? styles.empireIconContainer
            : styles.iconContainerInactive;
        const empireIconStyles = this.state.icon === 'empire'
            ? styles.iconActive
            : styles.iconInactive;
        return (
            <TouchableNativeFeedback onPress={() => this.handleClick('empire')}>
                <View style={[styles.iconContainer, empireContainerStyles]}>
                    <FontAwesome name="empire" size={100} style={empireIconStyles} />
                </View>
            </TouchableNativeFeedback>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <LoadingContainer loading={this.state.loading}>
                    <View>
                        <TitleText style={styles.title}>Choose Alligiance</TitleText>
                        {this.renderRebelButton()}
                        {this.renderEmpireButton()}
                    </View>
                </LoadingContainer>
            </View>
        );
    }

}

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 20,
        color: '#EEE',
        padding: 15,
    },
    iconContainer: {
        paddingVertical: 20,
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
        elevation: 5,
        borderRadius: 10,
    },
    iconContainerInactive: {
        backgroundColor: '#171717',
    },
    rebelIconContainer: {
        backgroundColor: '#D32F2F',
    },
    empireIconContainer: {
        backgroundColor: '#1976D2',
    },
    iconActive: {
        color: '#171717',
    },
    iconInactive: {
        color: '#BBB',
    }
});
