import { StyleSheet } from 'react-native';
import { COLOURS } from '../../colours'

const styles = StyleSheet.create({
    avatar_container: {
        marginVertical: 4,
        marginHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100
    },

    container: {
        flex: 1,
        paddingTop: 8,
        paddingLeft: 16,
        backgroundColor: COLOURS.background
    },

    title: {
        fontSize: 36,
        color: COLOURS.primary,
        fontWeight: 'bold',
        paddingBottom: 16
    },

    header: {
        fontSize: 16,
        marginBottom: 16,
        marginTop: 16,
        fontWeight: '600',
        letterSpacing: 4,
        color: COLOURS.secondary,
        textTransform: 'uppercase',
      },

      avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 4
    },

    missing_avatar:{
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOURS.off_primary
    },

    name: {
        fontSize: 14,
        color: COLOURS.primary,
        textAlign: 'center'
    },

    initial: {
        fontSize: 36,
        color: COLOURS.primary
    },

    search_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1D1D1F',
        padding: 12,
        borderRadius: 4,
        marginRight: 16

    },

    searchBar: {
        paddingLeft: 8,
        paddingRight: 4,
        flex: 1,
        backgroundColor: '#1D1D1F',
        fontSize: 18,
        color: '#828287',
        
    },
})

export default styles;
