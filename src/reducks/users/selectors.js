import {createSelector} from 'reselect'

// const usersSelector = (state) => state.users
const fxSelector = (state) => state.fx
const usersSelector = (state) => state.users

// export const getUserId = createSelector(
//     [usersSelector],
//     state => state.uid
// )

export const getUserId = createSelector(
    [usersSelector],
    state => state.uid
)

export const getUsername = createSelector(
    [usersSelector],
    state => state.username
)

export const getFxAUD = createSelector(
    [fxSelector],
    state => state.fx
)

export const getIsSignedIn = createSelector(
    [usersSelector],
    state => state.isSigned
)

export const getProductsInCart = createSelector(
    [usersSelector],
    state => state.cart
)

export const getOrdersHistorys = createSelector(
    [usersSelector],
    state => state.orders
)