import type { InternalAxiosRequestConfig } from 'axios'

export const tabInit = {
	id: 1,
	title: 'Новый запрос',
	method: 'GET',
	url: '',
	params: [
		{
			title: 'postId',
			value: '5'
		}
	],
	result: {
		data: '',
		config: {
			headers: {}
		} as InternalAxiosRequestConfig,
		headers: {},
		status: 402,
		statusText: ''
	},
	order: 1
}
