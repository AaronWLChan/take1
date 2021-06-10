import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { getImage } from '../../network/tmdb'
import { COLOURS } from '../../colours'
import { Ionicons } from '@expo/vector-icons';
import { ROUTES } from '../../constants/routes'
import CachedImage from 'react-native-expo-cached-image';


export default function EpisodeCard({ episode, tv_id, season_number, navigation }) {

    const onPress = () => (navigation.push(ROUTES.EPISODE_DETAILS, {tv_id: tv_id, season_number: season_number, episode_number: episode.episode_number}))

    const [error, hasError] = useState(false)

    const MissingImage = () => (
        <View style={styles.alt_poster}>
            <Ionicons name="image" size={64} color={COLOURS.secondary}/>
        </View>
    )

    const _onError = () => (
        hasError(true)
    )

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>

        {episode.still_path ? 

            error ? <MissingImage/> :

            <View style={styles.poster_container}>
                <CachedImage
                source = {{ uri: getImage(episode.still_path) }}
                style = {styles.poster}
                onError = {_onError}
                />
            </View>
            
        :
            <MissingImage/>
        }


        <Text style={styles.name} numberOfLines={1}>{episode.season_number > 0 ? `S${episode.season_number}E${episode.episode_number}: ${episode.name}` : episode.name}</Text>
        <Text style={styles.overview} numberOfLines={4}>{episode.overview}</Text>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginRight: 8,
        marginLeft: 8,
        marginBottom: 36,
        flex: 1
    },

    alt_poster: {
        flex: 1,
        height: 140,
        borderRadius: 8,
        borderWidth: 0.1,
        borderColor: COLOURS.secondary,
        backgroundColor: COLOURS.off_primary,

        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: COLOURS.background,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4,  
        elevation: 5,
    },

    poster_container: {
        shadowColor: COLOURS.background,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4,  
        elevation: 5,
    }, 

    poster: {
        flex: 1,
        height: 140,
        borderRadius: 8,
        borderWidth: 0.1,
        borderColor: COLOURS.secondary
    },

    name: {
        marginTop: 8,
        color: COLOURS.primary,
        fontSize: 15,
        marginBottom: 4
    },

    overview: {
        color: COLOURS.secondary,
        fontSize: 12
    }

})
