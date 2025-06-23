import type { IItem } from '../../contexts/tabs.context.ts'
import { initialParams } from '../double-input/double-input.init.ts'

export const tabInit: IItem = {
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
	response: undefined,
	order: 1,
	body: {},
	authorization: undefined,
	headers: [
		{
			...initialParams,
			title: 'Content-Type',
			value: 'application/json'
		}
	]
}
