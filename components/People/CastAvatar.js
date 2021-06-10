import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { getImage } from '../../network/tmdb'
import { COLOURS } from '../../colours'
import { ROUTES } from '../../constants/routes'
import CachedImage from 'react-native-expo-cached-image'

export default function CastAvatar( {castMember, navigation} ) {

    const [error, hasError] = useState(false)

    const _onError = () => {
        hasError(true)
    }

    const MissingAvatar = () => (
        <View style={styles.missing_avatar}>
            <Text style={styles.initial}>{castMember.name.substring(0,1)}</Text>
        </View>
    )

    const onAvatarPress = () => (navigation.push(ROUTES.PORTFOLIO, {castID: castMember.id}))

    return (
        <TouchableOpacity style={styles.container} onPress={onAvatarPress}>
            
            {castMember.profile_path ? 

                error ? <MissingAvatar/> :
            
                <CachedImage
                source={{uri: getImage(castMember.profile_path, "w185")}}
                style={styles.avatar}
                onError={_onError}
                />
            
                :
            
                <MissingAvatar/>
            }
            

            <Text style={styles.name} numberOfLines={1}>{castMember.name}</Text>

            
            { castMember.character ?
                <Text style={styles.role} numberOfLines={1}>{castMember.character}</Text>

                :
                
                <Text style={styles.role} numberOfLines={1}>{castMember.job}</Text>
            }
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: {
        marginHorizontal: 12,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100
    },


    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 4
    },

    missing_avatar:{
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOURS.off_primary
    },

    name: {
        fontSize: 14,
        color: COLOURS.primary,
        textAlign: 'center'
    },

    initial: {
        fontSize: 36,
        color: COLOURS.primary
    },

    role: {
        fontSize: 12,
        color: COLOURS.secondary,
        textAlign: 'center'
    },

})
