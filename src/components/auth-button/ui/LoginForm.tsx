import Button from '../../ui/button/Button.tsx'
import { useForm } from 'react-hook-form'
import type { IAuthForm } from '../auth.interface.ts'

const LoginForm = () => {
	const { handleSubmit, formState, register } = useForm<IAuthForm>()

	const submitHandler = (data: IAuthForm) => {
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<input
				type='email'
				placeholder='Введите email/логин'
				{...register('email')}
			/>
			<input
				type='password'
				placeholder='Введите пароль'
				{...register('password')}
			/>
			<Button>Войти</Button>
		</form>
	)
}

export default LoginForm
