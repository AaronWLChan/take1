import React from 'react'
import Modal from 'react-native-modal'
import { COLOURS } from '../colours'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function MoreTextModal({ title, text, modalVisible, onModalDismiss }) {

    return (
        <Modal 
            onBackdropPress={onModalDismiss}
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={modalVisible} >
                
                    <View style={styles.container}>
                        
                        <ScrollView showsVerticalScrollIndicator={false}>
                            
                            <View style={styles.horizontalContainer}>
                                <Text style={styles.title}>{title}</Text>

                                <TouchableOpacity>
                                    <Ionicons name="close" size={24} color={COLOURS.secondary} onPress={onModalDismiss} />

                                </TouchableOpacity>
                            </View>
                            <Text style={styles.text}>{text}</Text>
                        </ScrollView>

                      
                    </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: COLOURS.off_primary, 
        marginVertical: 16, 
        borderRadius: 10, 
        padding: 16
    },

    text: {
        fontSize: 15,
        lineHeight: 24, 
        color: COLOURS.primary
    },

    title: {
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 4,
        color: COLOURS.secondary
    },

    horizontalContainer: {
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        paddingBottom: 8, 
        alignItems: 'baseline'
    },

})
