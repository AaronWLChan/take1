import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { COLOURS } from '../colours'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { getImage } from '../network/tmdb'
import CachedImage from 'react-native-expo-cached-image';
import { Ionicons } from '@expo/vector-icons';

export default function ImageModal({ imagePath, modalVisible, onModalDismiss }) {

    const [error, hasError] = useState(false)

    const _onError = () => (
        hasError(true)
    )

    return (
        <Modal 
            onBackdropPress={onModalDismiss}
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={modalVisible} >
                
                <View style={styles.container}>

                    <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                            <Ionicons name="close" size={24} color={COLOURS.secondary} onPress={onModalDismiss} />
                    </TouchableOpacity>

                    {error ? 
                    
                        <Text style={styles.text}>Failed to load image</Text>
                    
                    :
                        <CachedImage
                        source={{uri: getImage(imagePath)}}
                        style={styles.image}
                        resizeMode="contain"
                        onError={_onError}
                        />
                    }

                   

                </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOURS.off_primary, 
        borderRadius: 10, 
        padding: 16
    },

    image: {
        width: '100%',
        height: 200,
        borderRadius: 10, 

    },

    text: {
        color: COLOURS.primary,
        fontSize: 15,
        alignSelf: 'center',
    },



})
