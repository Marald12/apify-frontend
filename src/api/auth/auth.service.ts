import { axiosMain } from '../axios.main.ts'
import type { IAuthLogin } from './auth.interface.ts'
import { toast } from 'react-toastify'

export const authService = {
	async login(emailOrLogin: string, password: string) {
		try {
			const request = await axiosMain.post<IAuthLogin>(
				'auth/login',
				{
					emailOrLogin,
					password
				},
				{ withCredentials: true }
			)

			return request.data
		} catch (e: any) {
			const error = e.response.data.message as string | undefined

			if (error) toast.error(error)
		}
	},
	async register(email: string, login: string, password: string) {
		try {
			const request = await axiosMain.post<IAuthLogin>(
				'auth/register',
				{
					email,
					login,
					password
				},
				{ withCredentials: true }
			)

			return request.data
		} catch (e: any) {
			const error = e.response.data.message as string | undefined

			if (error) toast.error(error)
		}
	},
	async logout() {
		try {
			const request = await axiosMain.post<IAuthLogin>(
				'auth/logout',
				{},
				{ withCredentials: true }
			)

			return request.data
		} catch (e: any) {
			const error = e.response.data.message as string | undefined

			if (error) toast.error(error)
		}
	}
}
