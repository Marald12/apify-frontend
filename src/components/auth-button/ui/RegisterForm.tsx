import Button from '../../ui/button/Button.tsx'
import { useForm } from 'react-hook-form'
import type { IRegisterForm } from '../auth.interface.ts'
import { useMutation, useQueryClient } from 'react-query'
import { authService } from '../../../api/auth/auth.service.ts'
import type { FC } from 'react'
import type { IAuthFormProps } from './props.interface.ts'
import { toast } from 'react-toastify'

const RegisterForm: FC<IAuthFormProps> = ({ setIsShow }) => {
	const { handleSubmit, formState, register, watch } = useForm<IRegisterForm>()
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: (formData: IRegisterForm) =>
			authService.register(formData.email, formData.login, formData.password),
		onSuccess: async data => {
			if (data?.token) {
				await queryClient.prefetchQuery('profile')
				setIsShow(false)
				toast.success('Вы успешно вошли в аккаунт.')
			}
		}
	})

	const submitHandler = (formData: IRegisterForm) => {
		mutate(formData)
	}

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<div>
				<input
					type='email'
					placeholder='Введите email'
					{...register('email', {
						pattern: {
							value:
								/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: 'Email не валидный'
						},
						required: 'Поле обьязательно.'
					})}
				/>
				{formState.errors.email && (
					<span>{formState.errors.email.message}</span>
				)}
			</div>
			<div>
				<input
					type='text'
					placeholder='Введите логин'
					{...register('login', {
						required: 'Поле обьязательно.'
					})}
				/>
				{formState.errors.login && (
					<span>{formState.errors.login.message}</span>
				)}
			</div>
			<div>
				<input
					type='password'
					placeholder='Введите пароль'
					{...register('password', {
						minLength: {
							value: 6,
							message: 'Минимальная длинна пароля 6 символов.'
						},
						maxLength: {
							value: 32,
							message: 'Максимальная длинна пароля 32 символа.'
						},
						required: 'Поле обьязательно.'
					})}
				/>
				{formState.errors.password && (
					<span>{formState.errors.password.message}</span>
				)}
			</div>
			<div>
				<input
					type='password'
					placeholder='Повторите пароль'
					{...register('repeatPassword', {
						minLength: {
							value: 6,
							message: 'Минимальная длинна пароля 6 символов.'
						},
						maxLength: {
							value: 32,
							message: 'Максимальная длинна пароля 32 символа.'
						},
						required: 'Поле обьязательно.',
						validate: value => {
							if (value !== watch('password')) return 'Пароли не совпадают.'
						}
					})}
				/>
				{formState.errors.repeatPassword && (
					<span>{formState.errors.repeatPassword.message}</span>
				)}
			</div>
			<Button>Зарегестрироваться</Button>
		</form>
	)
}

export default RegisterForm
