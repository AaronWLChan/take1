import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { COLOURS } from '../colours'
import Image from './Image'

export default function ImageListRow({header = "Images", images}) {

    const renderItem = ({ item }) => (
        <Image filePath={item.file_path}/>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{header}</Text>

            <FlatList
                data={images}
                keyExtractor={(item) => item.file_path}
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
