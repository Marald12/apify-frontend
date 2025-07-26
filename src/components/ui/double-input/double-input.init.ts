import { v4 as uuidv4 } from 'uuid'

export const initialParams = {
	id: uuidv4(),
	title: '',
	value: '',
	order: 1,
	isDisabled: false,
	description: null
}
