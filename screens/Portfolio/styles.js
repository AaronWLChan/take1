import { StyleSheet, Dimensions } from 'react-native';
import { COLOURS } from '../../colours'

const screenWidth = Dimensions.get('window').width


const styles = StyleSheet.create({

    missing_profile_pic: {
        width: 180, 
        height: 180, 
        borderRadius: 400, 
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: COLOURS.off_primary
    },

    initial: {
        fontSize: 72,
        color: COLOURS.primary
    },

    container: {
        flex: 1,
        backgroundColor: COLOURS.background,
        paddingTop: 40,
        paddingHorizontal: 8
    },

    image: {
        width: screenWidth,
        height: 340
    },

    name: {
        color: COLOURS.primary,
        fontSize: 34,
        fontWeight: 'bold',
        paddingBottom: 24,
        alignSelf: 'center'
    },
    
    text: {
        fontSize: 15,
        lineHeight: 24, 
        color: COLOURS.primary
    },

    section: {
        marginBottom: 24

    },

    section_title: {
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: '600',
        paddingBottom: 8,
        letterSpacing: 4,
        color: COLOURS.secondary
    },
})

export default styles;
