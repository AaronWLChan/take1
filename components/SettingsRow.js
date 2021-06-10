import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, Switch } from 'react-native'
import { COLOURS } from '../colours'
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking'
import ListModal from '../components/ListModal'
import countries from '../constants/countries'
import { updatePreference } from '../redux/configSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function SettingsRow({ item }) {
    //Call and get key,
    const [modalVisible, setModalVisible] = useState(false)

    const dispatch = useDispatch()

    const existingValue = useSelector((state) => item.key === "country" ? state.country : state.adult)

    const toggleSwitch = () => {
        dispatch(updatePreference({ key: item.key, newValue: !existingValue }))
    }

    const handlePress = () => {

      if (item.action == "link"){
        Linking.openURL(item.link)
      }

      //If list
      else{
        setModalVisible(true)
      }

    }

    const onValueSelected = (value) => {
        setModalVisible(false)

        dispatch(updatePreference({ key: item.key, newValue: value }))
    }

    const onModalDismiss = () => {
      setModalVisible(false)
    }

    let selectedList = undefined

    if (item.action === "list"){

      if (item.key === "country"){
        selectedList = countries
      }

    }

    return (
          <TouchableOpacity style={styles.container} disabled={item.action == "switch"} onPress={handlePress}>
                  <View style={styles.row}>

                    {item.icon && 
                      <View style={{marginRight: 16, backgroundColor: COLOURS.accent, borderRadius: 10, padding: 4}}>
                        <Ionicons name={item.icon} size={24} color={COLOURS.primary} />
                      </View>
                    
                    }

                    <Text style={styles.text}>{item.title}</Text>
                  </View>

                  {
                    item.action == "switch" ?
                      <Switch onValueChange={toggleSwitch} value={existingValue}/>

                      :

                    <>
                      <View style={styles.row}>
                          <Text style={styles.subtitle}>{existingValue}</Text>
                          <Ionicons name="chevron-forward" size={24} color={COLOURS.secondary} style={{marginLeft: 4}} />
                      </View>

                      <ListModal data={selectedList} modalVisible={modalVisible} onModalDismiss={onModalDismiss} onValueSelected={onValueSelected}/>


                    </>

                  }

               

            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLOURS.light_off_primary,
        justifyContent: 'space-between',
        padding: 16,
      },


    row: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    text: {
        color: COLOURS.primary,
        fontSize: 18,
    },

    subtitle: {
        color: COLOURS.secondary,
        fontSize: 18,
      },

})
