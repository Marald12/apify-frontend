import axios from 'axios'
import { useActiveTab } from './update-active-tab.hook.ts'

export const useRequestFetch = () => {
	const { tab } = useActiveTab()

	return async () => {
		try {
			if (!tab) return

			const bearerToken = tab.authorization
				? `Bearer ${tab.authorization?.token}`
				: ''

			const start = performance.now()
			const response = await axios(tab.url, {
				method: tab.method,
				headers: {
					...tab.headers
						.filter(i => !i.isDisabled)
						.reduce((acc: Record<string, string>, i) => {
							acc[i.title] = i.value
							return acc
						}, {}),
					Authorization: bearerToken
				},
				data: tab.body,
				params: tab.params.reduce((acc: Record<string, string>, i) => {
					acc[i.title] = i.value
					return acc
				}, {})
			})
			const end = performance.now()

			return {
				data: response.data,
				headers: response.headers,
				status: response.status,
				duration: (end - start).toFixed(2)
			}
		} catch (error) {
			return error
		}
	}
}
