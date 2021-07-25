import { createStore } from "redux"
import userReducer from './Reducers/userReducer'

//Les modules pour persister les Reducers
import { persistCombineReducers } from 'redux-persist'
import { AsyncStorage } from 'react-native'

const rootPersistConfig = {
    key: 'root2',
    storage: AsyncStorage
}

export default createStore(persistCombineReducers(
    rootPersistConfig,{userReducer}
))
