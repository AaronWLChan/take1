import React from 'react'
import { Text, View, SectionList } from 'react-native'
import SettingsRow from '../../components/SettingsRow'
import { settings } from '../../utility/settingsConfig'
import styles from './styles'

export default function Settings() {

    const renderHeader = ({section: { title }}) => (<Text style={styles.header}>{title}</Text>)

    const renderItem = ({ item }) => (<SettingsRow item={item}/>)

    const renderTitle = () => (<Text style={styles.title}>Settings</Text>)

    return (
      <View style={styles.container}>

        <SectionList
          sections={settings}
          keyExtractor={(item ,index) => item + index}
          renderItem={renderItem}
          ListHeaderComponent={renderTitle}
          renderSectionHeader={renderHeader}
          stickySectionHeadersEnabled={false}
        />
        
      </View>
    );
  }

