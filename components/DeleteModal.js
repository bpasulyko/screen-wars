import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  Image,
} from 'react-native';
import Button from '../components/Button';

const DeleteModal = React.createClass({
    propTypes: {
        selectedItem: PropTypes.shape(),
        visible: PropTypes.bool,
        onClose: PropTypes.func,
        onDelete: PropTypes.func,
    },

    render() {
        const baseUrl = window.imageConfig.base_url;
        const size = window.imageConfig.poster_sizes[2];
        const imageUrl = `${baseUrl}${size}${this.props.selectedItem.poster}`;
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {}}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalImageContainer}>
                            <Image style={styles.modalImage} source={{ uri: imageUrl }} />
                        </View>
                        <View style={styles.modalDetails}>
                            <Text style={styles.modalText}>{'Delete ' + this.props.selectedItem.title + '?'}</Text>
                            <View style={styles.modalButtonRow}>
                                <Button onClick={this.props.onClose} text="Cancel" styles={styles.modalButton} />
                                <Button onClick={this.props.onDelete} text="Delete" styles={styles.modalButton} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
});

export default DeleteModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        borderRadius: 3,
        backgroundColor: '#333',
        width: 300,
        padding: 10,
        flexDirection: 'row',
    },
    modalDetails: {
        flex: 1,
        flexWrap: 'wrap',
    },
    modalImageContainer: {
        elevation: 5,
        backgroundColor: '#333',
        marginRight: 20,
    },
    modalImage: {
        width: 100,
        height: 150,
        borderRadius: 4,
    },
    modalText: {
        color: '#EEE',
        fontSize: 18,
    },
    modalButtonRow: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    modalButton: {
        marginLeft: 10,
    },
});
