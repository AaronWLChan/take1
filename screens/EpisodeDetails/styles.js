import { StyleSheet } from 'react-native';
import { COLOURS } from '../../colours'

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOURS.background,
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 16
    },

    title: {
        color: COLOURS.primary,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16
    },

    text: {
        fontSize: 15,
        lineHeight: 24, 
        color: COLOURS.primary
    },

    section: {
        paddingBottom: 16

    },

    section_title: {
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: '600',
        paddingBottom: 8,
        letterSpacing: 4,
        color: COLOURS.secondary
    },

    rating: {
        backgroundColor: COLOURS.green,
        padding: 8,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    
    },

    ratingText: {
        color: COLOURS.primary,
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default styles;
