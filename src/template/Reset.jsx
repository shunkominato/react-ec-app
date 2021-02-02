import React, {useState, useCallback} from 'react'
import {TextInput, PrimaryButton} from '../components/UIkit'
import {resetPassword} from '../reducks/users/operations'
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router'

const Reset= () => {
	const dispatch = useDispatch()

	const [email, setEmail] = useState('')


	const inputEmail = useCallback((event) => {
		setEmail(event.target.value)
	}, [setEmail])





	return(
		<div className="c-section-container">
			<h2 className="u-text__headline u-text-center">パスワードを忘れた方</h2>
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



			
			
			<div className="module-spacer--medium"></div>
			
			<div className='center'>
				<PrimaryButton
					label={'signIn'}
					onClick={() => dispatch(resetPassword(email))}
					// onClick={() => console.log('aaa')}
				></PrimaryButton>
			</div>
			<p onClick={() => dispatch(push('/sinUp'))}>アカウント登録</p>
			<p onClick={() => dispatch(push('/reset'))}>パスワード</p>
		</div>

		
	)
}

export default Reset