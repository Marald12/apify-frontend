import type { IItem } from '../../contexts/tabs.context.tsx'
import { initialParams } from '../ui/double-input/double-input.init.ts'

export const tabInit: IItem = {
	id: 1,
	title: 'Новый запрос',
	method: 'GET',
	url: '',
	params: [],
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
