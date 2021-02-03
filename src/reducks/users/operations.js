import {fetchOrdersHistoryAction, fetchProductsInCartAction, setFx, signInActions, signOutAction} from './actions'
import {push} from 'connected-react-router'
import {auth, db, FirebaseTimeStamp} from '../../firebase/index'

export const fetchFx = (num,nm) => {
	return async (dispatch, getState) => {
		const state = getState()


			const url = 'https://api.exchangeratesapi.io/latest'
			const response = await fetch(url).then(res => res.json()).catch(() => null)


			dispatch(setFx({
				AUD:response.rates.AUD
			}))
	}
}

export const signIn = (email, password) => {
	return async (dispatch) => {
		if(email === '' || password === ''){
			alert('必須項目が未入力です')
			return false
		}

		auth.signInWithEmailAndPassword(email, password)
		.then(result => {
			if(result.user){
				const uid = result.user.uid

				db.collection('users').doc(uid).get()
				.then(snapshot => {

					const data = snapshot.data

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
		addProduct['cartId'] = cartRef.id;
		await cartRef.set(addProduct);
		// dispatch(push('/'));
	}
}

export const fetchProductsInCart = (products) => {
	return async (dispatch) => {
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