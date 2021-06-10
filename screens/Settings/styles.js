import { StyleSheet } from 'react-native';
import { COLOURS } from '../../colours'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOURS.background,
        paddingTop: 40,
      },
    
      row: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLOURS.light_off_primary,
        justifyContent: 'space-between',
        padding: 16,
      },
    
      text: {
        color: COLOURS.primary,
        fontSize: 18,
      },
    
      header: {
        fontSize: 16,
        marginVertical: 16,
        fontWeight: '600',
        letterSpacing: 4,
        color: COLOURS.secondary,
        textTransform: 'uppercase',
        paddingLeft: 16
      },
    
      subtitle: {
        color: COLOURS.secondary,
        fontSize: 18,
      },
    
      title: {
        fontSize: 36,
        color: COLOURS.primary,
        fontWeight: 'bold',
        paddingLeft: 16
      },
})


export default styles;
