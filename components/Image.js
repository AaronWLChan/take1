import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import CachedImage from 'react-native-expo-cached-image'
import { Ionicons } from '@expo/vector-icons';
import { COLOURS } from '../colours'
import { getImage } from '../network/tmdb'
import ImageModal from './ImageModal'


export default function Image({ filePath }) {

    const [error, hasError] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const onImageClick = () => {
        setModalVisible(true)
    }

    const _onError = () => (
        hasError(true)
    )

    if (error){
        return (
            <View style={styles.missingImage}>
                <Ionicons name="image" size={48} color={COLOURS.secondary}/>
            </View>
        )
    }

    return (
        <>
            <TouchableOpacity onPress={onImageClick}> 
                    <CachedImage
                    source={{uri: getImage(filePath, "w185")}}
                    style={styles.image}
                    onError={_onError}
                    />
            </TouchableOpacity>

            <ImageModal imagePath={filePath} modalVisible={modalVisible} onModalDismiss={() => {setModalVisible(false)}}/>

        </>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 180,
        height: 100,
        marginHorizontal: 8,
        marginBottom: 8,
        borderRadius: 8
    },

    missingImage: {
        width: 180,
        height: 100,
        marginHorizontal: 8,
        marginBottom: 8,
        borderRadius: 8,
        borderColor: COLOURS.secondary,
        backgroundColor: COLOURS.off_primary,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },

})
