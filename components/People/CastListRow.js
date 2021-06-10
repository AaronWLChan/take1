import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import CastAvatar from './CastAvatar'
import { COLOURS } from '../../colours'

export default function CastListRow({ cast, header, navigation}) {

    const renderItem = ({ item }) => (<CastAvatar castMember={item} navigation={navigation}/>)

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{header ? header : 'Cast'}</Text>

            <FlatList
            data={cast}
            keyExtractor={(item) => item.credit_id.toString()}
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
