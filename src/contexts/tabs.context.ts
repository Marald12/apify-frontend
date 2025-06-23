import { createContext, type Dispatch, type SetStateAction } from 'react'
import type { UseQueryResult } from 'react-query'
import { initialParams } from '../components/double-input/double-input.init'

export type IItem = {
	id: number
	title: string
	method: string
	url: string
	params: {
		title: string
		value: string
	}[]
	response?: UseQueryResult<any, any> & { duration: number }
	order: number
	body: any
	authorization?: {
		token: string
	}
	headers: (typeof initialParams)[]
}

type TabsContextInitialState = {
	tabs: IItem[]
	setTabs: Dispatch<SetStateAction<IItem[]>>
}

export const TabsContext = createContext<TabsContextInitialState>({
	tabs: [],
	setTabs: () => {}
})
