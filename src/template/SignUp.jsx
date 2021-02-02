import React, {useState, useCallback} from 'react'
import {TextInput, PrimaryButton} from '../components/UIkit'
import {signUp} from '../reducks/users/operations'
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router'

const SignUp = () => {
	const dispatch = useDispatch()

	const [username, setUsername] = useState(''),
				[email, setEmail] = useState(''),
				[password, setPassword] = useState(''),
				[confirmPassword, setConfirmPassword] = useState('')

	const inputUsername = useCallback((event) => {
		setUsername(event.target.value)
	}, [setUsername])

	const inputEmail = useCallback((event) => {
		setEmail(event.target.value)
	}, [setEmail])

	const inputPassword = useCallback((event) => {
		setPassword(event.target.value)
	}, [setPassword])

	const inputConfirmPassword = useCallback((event) => {
		setConfirmPassword(event.target.value)
	}, [setConfirmPassword])


	return(
		<div className="c-section-container">
			<h2 className="u-text__headline u-text-center">アカウント登録</h2>
			<div className="module-spacer--medium"></div>
			<TextInput
				fullWidth={true}
				label={'ユーザー名'}
				multiline={false}
				rows={1}
				value={username}
				type={'text'}
				onChange={inputUsername}
				></TextInput>


			<TextInput
				fullWidth={true}
				label={'メールアドレス'}
				multiline={false}
				rows={1}
				value={email}
				type={'email'}
				onChange={inputEmail}
				></TextInput>


			<TextInput
				fullWidth={true}
				label={'パスワード'}
				multiline={false}
				rows={1}
				value={password}
				type={'password'}
				onChange={inputPassword}
				>
				</TextInput>
			

			<TextInput
				fullWidth={true}
				label={'パスワード確認'}
				multiline={false}
				rows={1}
				value={confirmPassword}
				type={'password'}
				onChange={inputConfirmPassword}
				></TextInput>
			
			<div className="module-spacer--medium"></div>
			
			<div className='center'>
				<PrimaryButton
					label={'登録'}
					onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
				></PrimaryButton>
				{/* <p onClick={dispatch(push('/sinUp'))}>アカウント登録</p> */}
			{/* <p onClick={dispatch(push('/reset'))}>パスワード</p> */}
			</div>
		</div>

		
	)
}

export default SignUp