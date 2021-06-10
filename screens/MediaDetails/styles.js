import { StyleSheet, Dimensions } from 'react-native';
import { COLOURS } from '../../colours'

const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    header_container: {
        paddingLeft: 16,
        marginTop: -80,
    },

    header_image_missing: {
        paddingLeft: 16,
        paddingTop: 40,
    },

    subheader_container: {
        flexDirection: 'row',
        paddingLeft: 16,
    },

    goodRating: {
        color: COLOURS.green,
        fontSize: 24,
        alignSelf: 'center',
        fontWeight: 'bold'
    },

    moderateRating: {
        color: COLOURS.yellow,
        fontSize: 24,
        alignSelf: 'center',
        fontWeight: 'bold'
    },

    badRating: {
        color: COLOURS.red,
        fontSize: 24,
        alignSelf: 'center',
        fontWeight: 'bold'
    },

    title: {
        color: COLOURS.primary,
        fontSize: 34,
        fontWeight: 'bold',
    },

    detail_container: {
        padding: 16,
        backgroundColor: COLOURS.background
    },

    section_title: {
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: '600',
        paddingBottom: 8,
        letterSpacing: 4,
        color: COLOURS.secondary
    },

    section_title_link: {
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: '600',
        paddingBottom: 8,
        letterSpacing: 4,
        color: COLOURS.accent
    },

    section: {
        paddingBottom: 16

    },

    container: {
        flex: 1,
        backgroundColor: COLOURS.background,
        alignItems: 'center'
      }, 

    backdrop: {
        width: screenWidth,
        height: 340,
    },

    gradient: {
        width: screenWidth,
        height: 340,
    },

    poster_container: {
        shadowColor: COLOURS.background,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 4,  
        elevation: 5,
        marginTop: -100,
        alignItems: 'center'
    },

    poster: {
        width: 120,
        height: 200,
        borderRadius: 8,
    },

    text: {
        fontSize: 15,
        lineHeight: 24, 
        color: COLOURS.primary
    },

    horizontal_container:{
        flexDirection: 'column',
    }
})

export default styles;
