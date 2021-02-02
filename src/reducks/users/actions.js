export const SIGN_IN = "SIGN_IN"
export const signInActions = (userState) => {
    return {
        type: "SIGN_IN",
        payload: {
            isSigned: true,
            role:userState.role,
            uid: userState.uid,
            username: userState.username
        }
    }
}

export const GET_FX = 'GET_FX'
export const setFx = (fxState) => {
    console.log('a')
    console.log(fxState.AUD)
    return {
        type: 'GET_FX',
        payload:{
            AUD: fxState.AUD
        }
    }
}

export const SIGN_OUT = "SIGN_OUT"
export const signOutAction = () => {
    return {
        type: "SIGN_OUT",
        payload: {
            isSigned: false,
            role: '',
            uid: '',
            username: ''
        }
    }
}

export const FETCH_PRODUCT_IN_CART = 'FETCH_PRODUCT_IN_CART'
export const fetchProductsInCartAction = (products) => {
    return {
        type: 'FETCH_PRODUCT_IN_CART',
        payload: products
    }
}

export const FETCH_HISTORYS = 'FETCH_HISTORYS'
export const fetchOrdersHistoryAction = (historys) => {
    return {
      type: FETCH_HISTORYS,
      payload: historys
    }
  }