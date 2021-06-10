import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { getImage } from '../../network/tmdb'
import { COLOURS } from '../../colours'
import { ROUTES } from '../../constants/routes'
import CachedImage from 'react-native-expo-cached-image'

export default function SeasonCard({ tv_id, season, navigation }) {

    const onPress = () => (navigation.push(ROUTES.EPISODE_LIST, {tv_id: tv_id, season_number: season.season_number}))

    const [error, hasError] = useState(false)

    const MissingImage = () => (
        <View style={styles.alt_poster}>
            <Text style={styles.alt_text}>{season.season_number > 0 ? season.season_number : season.name.substring(0,1)}</Text>
        </View>
    )

    const _onError = () => (
        hasError(true)
    )

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
        
        {season.poster_path ?
        
            error ? <MissingImage/> :
        
            <CachedImage
            source = {{ uri: getImage(season.poster_path) }}
            style = {styles.poster}
            onError={_onError}
            />

        : 
            <MissingImage/>
        
        }
     

        <Text style={styles.name} numberOfLines={1}>{season.name}</Text>

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
        marginBottom: 16,
        width: 200
    },

    poster: {
        width: 200,
        height: 120,
        borderRadius: 8,
        borderWidth: 0.1,
        borderColor: COLOURS.secondary
    },

    name: {
        marginTop: 8,
        color: COLOURS.primary,
        fontSize: 15
    },

    alt_poster: {
        width: 200,
        height: 120,
        borderRadius: 8,
        borderWidth: 0.1,
        borderColor: COLOURS.secondary,
        backgroundColor: COLOURS.off_primary,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },


    alt_text: {
        color: COLOURS.primary,
        fontSize: 40
    },

    overview: {
        color: COLOURS.secondary,
        fontSize: 12
    }

})
