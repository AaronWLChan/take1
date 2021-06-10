import { StyleSheet } from 'react-native';
import { COLOURS } from '../../colours'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 8,
        paddingLeft: 8,
        backgroundColor: COLOURS.background
      }, 
  
      title: {
        fontSize: 36,
        color: COLOURS.primary,
        fontWeight: 'bold',
        paddingBottom: 16,
      },

      country: {
        fontSize: 16,
        color: COLOURS.secondary,
        textTransform: 'uppercase',
        fontWeight: '600',
        letterSpacing: 4,
      },
  
      list: {
        marginLeft: 8
      },

      header_container: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginRight: 8
      }
})

export default styles;
