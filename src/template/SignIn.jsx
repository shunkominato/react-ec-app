import React, {useState, useCallback} from 'react'
import {TextInput, PrimaryButton} from '../components/UIkit'
import {signIn} from '../reducks/users/operations'
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router'

const SignIn = () => {
	const dispatch = useDispatch()

	const [email, setEmail] = useState(''),
				[password, setPassword] = useState('')


	const inputEmail = useCallback((event) => {
		setEmail(event.target.value)
	}, [setEmail])

	const inputPassword = useCallback((event) => {
		setPassword(event.target.value)
	}, [setPassword])



	return(
		<div className="c-section-container">
			<h2 className="u-text__headline u-text-center">アカウント登録</h2>
			<div className="module-spacer--medium"></div>



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
			
			
			<div className="module-spacer--medium"></div>
			
			<div className='center'>
				<PrimaryButton
					label={'signIn'}
					onClick={() => dispatch(signIn(email, password))}
					// onClick={() => console.log('aaa')}
				></PrimaryButton>
			</div>
			<p onClick={() => dispatch(push('/sinUp'))}>アカウント登録</p>
			<p onClick={() => dispatch(push('/reset'))}>パスワード</p>
		</div>

		
	)
}

export default SignIn