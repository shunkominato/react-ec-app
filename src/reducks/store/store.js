import {createStore as reduxCreateStore, combineReducers, applyMiddleware} from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { fxReducer, userReducer } from '../users/reducers'
import { productsReducer } from '../products/reducers'
import thunk from 'redux-thunk'

export default function createStore(history) {
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            fx: fxReducer,
            users: userReducer,
            products: productsReducer
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
}