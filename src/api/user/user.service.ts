import { axiosMain } from '../axios.main.ts'
import { toast } from 'react-toastify'
import type { IUser } from './user.interface.ts'

export const userService = {
	async getProfile(isSendMessage?: boolean) {
		try {
			const request = await axiosMain.get<IUser>('user/get-profile', {
				withCredentials: true
			})

			return request.data
		} catch (e: any) {
			if (isSendMessage) {
				const error = e.response.data.message as string | undefined

				if (error) toast.error(error)
			}
		}
	}
}
