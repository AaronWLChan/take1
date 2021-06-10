import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import SeasonCard from './SeasonCard'
import { COLOURS } from '../../colours'

export default function SeasonListRow({ tv_id, seasons, navigation}) {

    const renderItem = ({ item }) => (<SeasonCard tv_id={tv_id} season={item} navigation={navigation}/>)

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Seasons</Text>

            <FlatList
            data={seasons}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        marginBottom: 24
    },

    header: {
        fontSize: 16,
        marginBottom: 16,
        fontWeight: '600',
        letterSpacing: 4,
        color: COLOURS.secondary,
        textTransform: 'uppercase',

      },

})
