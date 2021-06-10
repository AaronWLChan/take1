import React from 'react'
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { COLOURS } from '../colours'
import { Ionicons } from '@expo/vector-icons';

export default function ListModal( {data, modalVisible, onValueSelected, onModalDismiss} ) {

    const renderItem = ({item}) => (
            <TouchableOpacity>
                <Text style={styles.item} onPress={() => onValueSelected(item.value)}>{item.display}</Text>
            </TouchableOpacity>
    )

    return (
        <Modal 
            onBackdropPress={onModalDismiss}
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={modalVisible} >
                
                    <View style={styles.container}>

                            <View style={styles.horizontalContainer}>
                                <Text style={styles.title}>Countries</Text>

                                <TouchableOpacity>
                                    <Ionicons name="close" size={24} color={COLOURS.secondary} onPress={onModalDismiss} />

                                </TouchableOpacity>
                            </View>

                            <FlatList
                                data={data}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem}
                            />
                        

                      
                    </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOURS.off_primary, 
        marginVertical: 16, 
        borderRadius: 10, 
        padding: 16
    },

    item: {
        color: COLOURS.primary, 
        fontSize: 21,
        padding: 8,
        paddingBottom: 16,

    },

    title: {
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 4,
        color: COLOURS.secondary,
    },


    horizontalContainer: {
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        padding: 8,
        alignItems: 'baseline'
    },
})
