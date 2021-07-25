import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import Store from './src/Store/configureStore'
import Navigation from "./src/Navigation/navigation"

//Persister le store
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import { setCustomText } from 'react-native-global-props';
console.disableYellowBox = true

export const fontFamily = "Raleway-Regular"

export default function App() {
    const customTextProps = {
        style: {
            fontFamily: fontFamily,
            color: "black"
        }
    }
    setCustomText(customTextProps)

  let persistor = persistStore(Store)
  return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
            <Navigation/>
        </PersistGate>
      </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
      fontFamily: "Raleway-Regular",
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
