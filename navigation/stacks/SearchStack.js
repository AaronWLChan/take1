import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MediaDetails from '../../screens/MediaDetails'
import MediaList from '../../screens/MediaList';
import Portfolio from '../../screens/Portfolio'
import EpisodeList from '../../screens/EpisodeList'
import EpisodeDetails from '../../screens/EpisodeDetails'
import Search from '../../screens/Search'
import { COLOURS } from '../../colours'
import { ROUTES } from '../../constants/routes'


export default function Stack() {

    const Stack = createStackNavigator();

    const screenOptions = {
      headerTintColor: COLOURS.primary, 
      headerBackTitleVisible: false, 
      headerStyle:{backgroundColor: COLOURS.background, shadowColor: "transparent"}
    
    }

    return (
       <Stack.Navigator initialRouteName={ROUTES.SEARCH} screenOptions={screenOptions}>
            <Stack.Screen name={ROUTES.SEARCH} component={Search} />
            <Stack.Screen name={ROUTES.MEDIA_DETAILS} component={MediaDetails}/>
            <Stack.Screen name={ROUTES.MEDIA_LIST} component={MediaList}/>
            <Stack.Screen name={ROUTES.PORTFOLIO} component={Portfolio}/>
            <Stack.Screen name={ROUTES.EPISODE_LIST} component={EpisodeList}/>
            <Stack.Screen name={ROUTES.EPISODE_DETAILS} component={EpisodeDetails}/>

      </Stack.Navigator>
    )
}
