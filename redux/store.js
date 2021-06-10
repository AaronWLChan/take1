import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import configReducer from './configSlice'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
    key: "root",
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, configReducer)

export default () => {
    let store = configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"]
            }
        })
    })

    let persistor = persistStore(store)

    return { store, persistor }
}
