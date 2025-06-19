import axios from 'axios'
import { useActiveTab } from './update-active-tab.hook.ts'

export const useRequestFetch = () => {
	const { tab, updateTab } = useActiveTab()

	return async () => {
		try {
			if (!tab) return
			const response = await axios(tab.url, {
				method: tab.method,
				headers: {
					'Content-Type': 'application/json'
				},
				params: tab.params.reduce((acc: Record<string, string>, i) => {
					acc[i.title] = i.value
					return acc
				}, {})
			})

			updateTab('result', response)
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				updateTab('result', error.response)
			} else {
				console.error('Ошибка запроса:', error)
				updateTab('result', {
					status: 0,
					statusText: 'Network Error',
					headers: {},
					// @ts-ignore
					data: error.message,
					config: {}
				} as any)
			}
		}
	}
}
