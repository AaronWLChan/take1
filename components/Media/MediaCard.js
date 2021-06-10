import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import { getImage } from '../../network/tmdb'
import { COLOURS } from '../../colours'
import { Ionicons } from '@expo/vector-icons';
import CachedImage from 'react-native-expo-cached-image';
import { ROUTES } from '../../constants/routes'

export default function MediaCard({ item, navigation, type}) {

    const [error, hasError] = useState(false)

    const onCardPress = () => (navigation.push(ROUTES.MEDIA_DETAILS, {id: item.id, type: type}))

    const DefaultSource = () => (
        <View style={styles.alt_poster}>
            <Ionicons name="image" size={48} color={COLOURS.secondary}/>
            <Text numberOfLines={2} style={styles.alt_text}>{type == 'movie' ? item.title : item.name}</Text>
        </View>
    )

    const _onError = () => {
        hasError(true)
    }

    
    return (
        <TouchableOpacity style={styles.container} onPress={onCardPress}>
            
            {item.poster_path ? 

                error ? <DefaultSource/> :

                <CachedImage
                    source = {{ uri: getImage(item.poster_path, "w154") }}
                    style = {styles.poster}
                    onError = {_onError}
                    />
            : 
                <DefaultSource/>
            
            }
          

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    container: {
        shadowColor: COLOURS.background,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4,  
        elevation: 5,
        marginRight: 8,
        marginLeft: 8,
        marginBottom: 16
    },

    poster: {
        width: 120,
        height: 200,
        borderRadius: 8,
        borderWidth: 0.1,
        borderColor: COLOURS.secondary
    },

    alt_poster: {
        width: 120,
        height: 200,
        borderRadius: 8,
        borderWidth: 0.1,
        borderColor: COLOURS.secondary,
        backgroundColor: COLOURS.off_primary,

        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    alt_text: {
        color: COLOURS.secondary,
        fontSize: 12,
        marginHorizontal: 8,
        textAlign: 'center'
    }


})
