import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar, View, Platform } from 'react-native'
import RootNavigator from './navigation/RootNavigator'
import configureStore from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = configureStore()

export default function App() {
  
  return (

    <Provider store={store}>

        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>

            <StatusBar barStyle="light-content"/>

            <View style={{paddingTop: Platform.OS === 'ios' ? 24 : 0, flex: 1, backgroundColor: "#000"}}>
              <RootNavigator/>
            </View>

          </NavigationContainer>
        </PersistGate>


    </Provider>
  );
}

