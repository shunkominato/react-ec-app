import {fetchOrdersHistoryAction, fetchProductsInCartAction, setFx, signInActions, signOutAction} from './actions'
import {push} from 'connected-react-router'
import {auth, db, FirebaseTimeStamp} from '../../firebase/index'

export const fetchFx = (num,nm) => {
	return async (dispatch, getState) => {
		const state = getState()
		console.log('zz')
		console.log(nm)

			const url = 'https://api.exchangeratesapi.io/latest'
			const response = await fetch(url).then(res => res.json()).catch(() => null)
			console.log(response.rates.AUD)

			dispatch(setFx({
				AUD:response.rates.AUD
			}))

			console.log(state)
		
	}
}

export const signIn = (email, password) => {
	return async (dispatch) => {
		if(email === '' || password === ''){
			alert('必須項目が未入力です')
			return false
		}
		console.log('in')

		auth.signInWithEmailAndPassword(email, password)
		.then(result => {
			if(result.user){
				console.log('signIn')
				console.log(result)
				const uid = result.user.uid

				db.collection('users').doc(uid).get()
				.then(snapshot => {
					console.log('成功')
					console.log(snapshot)
					const data = snapshot.data
					console.log(data.role)

					dispatch(signInActions({
						isSigned: true,
						role: data.role,
						uid: uid,
						username: data.username
					}))

					dispatch(push('/'))
				})
			}
		})
	}
}

export const signUp= (username, email, password, confirmPassword) => {
	return async (dispatch) => {
		if(username === '' || email === '' || password === '' || confirmPassword === ''){
			alert('必須項目が未入力です')
			return false
		}

		if(password !== confirmPassword){
			alert('password')
			return false
		}

		return auth.createUserWithEmailAndPassword(email, password)
		.then(result => {
			console.log(result)
			const user = result.user

			if(user){
				const uid = user.uid
				const timestamp = FirebaseTimeStamp.now()

				const userInitialData = {
					created_at: timestamp,
					email: email,
					role: 'customer',
					uid: uid,
					updated_at: timestamp,
					username: username
				}

				db.collection('users').doc(uid).set(userInitialData)
				.then((res) => {
					console.log(res)
					dispatch(signInActions(userInitialData))
					dispatch(push('/'))
				})
			}
		})
	}
}

export const listenAuthState = () => {
	return async (dispatch) => {
		return auth.onAuthStateChanged(user => {
			if(user){
				const uid = user.uid

				db.collection('users').doc(uid).get()
				.then(snapshot => {
					const data = snapshot.data

					dispatch(signInActions({
						isSigned: true,
						role: data.role,
						uid: uid,
						username: data.username
					}))

					// dispatch(push('/'))
				})
			} else {
				dispatch(push('/signIn'))
			}
		})
	}
}

export const signOut = () => {
	return async (dispatch) => {
		console.log('signout')
		auth.signOut()
		.then(() => {
			dispatch(signOutAction())
			dispatch(push('/sinIn'))
		})
	}
}

export const resetPassword = (email) => {
	return async (dispatch) => {
		if(!email) {
			alert('hっす項目')
			return false
		}

		auth.sendPasswordResetEmail(email)
		.then(() => {
			alert('メールそうしんしました')
			dispatch(push('/signIn'))
		})
	}
}

export const addProductToCart = (addProduct) => {
	return async (dispatch, getState) => {
		const uid = getState().users.uid;
		const cartRef = db.collection('users').doc(uid).collection('cart').doc();
		console.log('oparator')
		console.log(cartRef)
		addProduct['cartId'] = cartRef.id;
		await cartRef.set(addProduct);
		// dispatch(push('/'));
	}
}

export const fetchProductsInCart = (products) => {
	return async (dispatch) => {
		console.log('fetchproduct')
		dispatch(fetchProductsInCartAction(products))
	}
}

export const fetchOrdersHistory = () => {
	return async (dispatch, getState) => {
			
			const uid = getState().users.uid;
			const userRef = db.collection('users').doc(uid)
			const list = []

			userRef.collection('orders').orderBy('update_at', 'desc').get()
			.then((snapShots) => {
					snapShots.forEach(snapshot => {
							const data = snapshot.data()
							list.push(data);
					})
					dispatch(fetchOrdersHistoryAction(list))
			})
	}

}