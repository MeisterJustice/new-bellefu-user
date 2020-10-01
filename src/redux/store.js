import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import Cookie from "js-cookie"


import {
    userSigninReducer,
    userSignupReducer,
    userUpdateReducer,
} from './reducers/userReducer'


const user = Cookie.getJSON("user") || null


export const initialState = {
    isAuthenticated: false,
    userSignin: { user},
    
    
}

const  reducers = combineReducers({
     //USER STORE
     userSignin: userSigninReducer,
     userSignup: userSignupReducer,
     userUpdate: userUpdateReducer,
 
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers,initialState,  composeEnhancer(applyMiddleware(thunk)))


export default store;