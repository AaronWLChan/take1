import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { COLOURS } from '../colours'  

export default function LoadingLayout() {
    return (
        <View style={styles.container}>
            <ActivityIndicator color={COLOURS.accent} size="large"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: COLOURS.background, },
})
