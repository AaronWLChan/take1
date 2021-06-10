import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLOURS } from '../../colours'
import CachedImage from 'react-native-expo-cached-image'
import { getImage } from '../../network/tmdb'

export default function LargeAvatar({ name, profilePath }) {

    const [error, hasError] = useState(false)

    const _onError = () => (
        hasError(true)
    )

    if (error) {
        return (
            <View style={styles.missing_profile_pic}>
                <Text style={styles.initial}>{name.substring(0, 1)}</Text>
            </View>
        )
    }

    return (
        <CachedImage
                source={{uri: getImage(profilePath)}}
                style={styles.profile_pic}
                onError={_onError}
            />
    
    )
}

const styles = StyleSheet.create({
    profile_pic: {
        width: 180, 
        height: 180, 
        borderRadius: 400, 
        alignSelf: 'center',
        marginBottom: 16
    },

    missing_profile_pic: {
        width: 180, 
        height: 180, 
        borderRadius: 400, 
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: COLOURS.off_primary
    },

    initial: {
        fontSize: 72,
        color: COLOURS.primary
    },

})
