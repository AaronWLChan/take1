import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import MovieCard from './MediaCard'
import { Ionicons } from '@expo/vector-icons';
import { ROUTES } from '../../constants/routes'
import { COLOURS } from '../../colours'

export default function MediaRow({ header, category, movies, navigation, type, identifier, totalPages }) {

  const renderItem = ({ item }) => (<MovieCard item={item} navigation={navigation} type={type}/>)

  const onArrowPress = () => (navigation.navigate(ROUTES.MEDIA_LIST, {category: category, type: type, header: header, identifier: identifier}))
  
  return (
      <View style={styles.container}>

            <View style={styles.horizontal_container}>
                <Text style={styles.header}>{header}</Text>
                
                {(category && totalPages > 1 ) && 
                  <TouchableOpacity style={styles.touchable} >
                    <Ionicons name="arrow-forward" size={24} color={COLOURS.secondary} onPress={onArrowPress} />
                  </TouchableOpacity>
                
                }

            </View>

            <FlatList
              data={movies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              horizontal={true}
              removeClippedSubviews
              showsHorizontalScrollIndicator={false}
            />

        </View>
  )
}

const styles = StyleSheet.create({

    touchable: {
      paddingLeft: 4
    },

    container: {
        marginBottom: 24
    },

    horizontal_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      paddingRight: 8
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
