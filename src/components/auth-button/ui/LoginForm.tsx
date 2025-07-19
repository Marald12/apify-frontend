import Button from '../../ui/button/Button.tsx'
import { useForm } from 'react-hook-form'
import type { IAuthForm } from '../auth.interface.ts'
import { useMutation, useQueryClient } from 'react-query'
import { authService } from '../../../api/auth/auth.service.ts'
import type { FC } from 'react'
import type { IAuthFormProps } from './props.interface.ts'
import { toast } from 'react-toastify'

const LoginForm: FC<IAuthFormProps> = ({ setIsShow }) => {
	const { handleSubmit, formState, register } = useForm<IAuthForm>()
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: (formData: IAuthForm) =>
			authService.login(formData.email, formData.password),
		onSuccess: async data => {
			if (data?.token) {
				await queryClient.prefetchQuery('profile')
				setIsShow(false)
				toast.success('Вы успешно вошли в аккаунт.')
			}
		}
	})

	const submitHandler = (formData: IAuthForm) => {
		mutate(formData)
	}

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<div>
				<input
					type='text'
					placeholder='Введите email/логин'
					{...register('email', {
						required: 'Поле обьязательно.'
					})}
				/>
				{formState.errors.email && (
					<span>{formState.errors.email.message}</span>
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
			<Button>Войти</Button>
		</form>
	)
}

export default LoginForm
