import * as Actions from './actions'
import initialState from '../redusers/initialState'

export const productsReducer = (state = initialState.products, action) => {
    switch(action.type){
        case Actions.FETCH_PRODUCTS:
            return {
                ...state,
                list: [...action.payload]
            }
        case Actions.DELETE_PRODUCT:
            return{
                ...state,
                list: [...action.payload]
            }
        default:
            return state
    }
}