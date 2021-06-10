import { StyleSheet } from 'react-native';
import { COLOURS } from '../../colours'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOURS.background,
        paddingTop: 40
    },

    text: {
        fontSize: 15,
        lineHeight: 24, 
        color: COLOURS.primary
    },

    header: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '600',
        letterSpacing: 4,
        color: COLOURS.secondary,
        textTransform: 'uppercase',

      },
})

export default styles;
