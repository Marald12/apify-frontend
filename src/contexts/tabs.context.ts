import { createContext, type Dispatch, type SetStateAction } from 'react'
import type { AxiosResponse } from 'axios'

export type IItem = {
	id: number
	title: string
	method: string
	url: string
	params: {
		title: string
		value: string
	}[]
	result: AxiosResponse<any, any>
	order: number
}

type TabsContextInitialState = {
	tabs: IItem[]
	setTabs: Dispatch<SetStateAction<IItem[]>>
}

export const TabsContext = createContext<TabsContextInitialState>({
	tabs: [],
	setTabs: () => {}
})
