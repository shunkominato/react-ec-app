import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {push} from 'connected-react-router'
import {fetchFx} from '../reducks//users/operations'
import {setFx} from '../reducks/users/actions'
import {getFxAUD} from '../reducks/users/selectors'

const Login = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state)
    const AUD = fetchFx(selector)
    console.log(AUD)
    console.log('fff')
    // console.log(dispatch(fetchFx(selector)))



    return(
        <div>
            <h2>ログイン</h2>
            <button onClick={() => dispatch(fetchFx(selector,1))}>
            ボタン
            </button>
            {selector.fx.AUD}
        </div>
    )
}
export default Login