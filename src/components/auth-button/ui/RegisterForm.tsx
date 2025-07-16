import Button from '../../ui/button/Button.tsx'
import { useForm } from 'react-hook-form'
import type { IRegisterForm } from '../auth.interface.ts'

const RegisterForm = () => {
	const { handleSubmit, formState, register } = useForm<IRegisterForm>()

	const submitHandler = (data: IRegisterForm) => {
		console.log(data)
	}

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<input type='email' placeholder='Введите email' {...register('email')} />
			<input type='text' placeholder='Введите логин' {...register('login')} />
			<input
				type='password'
				placeholder='Введите пароль'
				{...register('password')}
			/>
			<input
				type='password'
				placeholder='Повторите пароль'
				{...register('repeatPassword')}
			/>
			<Button>Зарегестрироваться</Button>
		</form>
	)
}

export default RegisterForm
