import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { push } from 'connected-react-router'
import {getUserId, getUsername} from '../reducks/users/selectors'
import {signInActions, signOutAction} from '../reducks/users/actions'
import {signOut} from '../reducks/users/operations'


const Home = () => {
	const selector = useSelector(state => state)
	console.log('selector')
	console.log(selector)
	const uid = getUserId(selector)
	const username = getUsername(selector)
	const dispatch = useDispatch()
	return(
		<div>
			<h2>home</h2>
			<p>{uid}</p>
			<p>{username}</p>
				<button onClick={() => {
						// dispatch(signInActions({uid:"0101", username:"komi"}))
						dispatch(push('/login'))
					// console.log('aa')
				}}>
				ボタン
      </button>
	  <button onClick={() => {
		  dispatch(signOut())
	  }}>sign out</button>
		</div>
	)

}

export default Home