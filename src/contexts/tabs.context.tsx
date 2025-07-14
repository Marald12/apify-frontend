import {
	createContext,
	type Dispatch,
	type FC,
	type PropsWithChildren,
	type SetStateAction,
	useEffect,
	useState
} from 'react'
import type { UseQueryResult } from 'react-query'
import { initialParams } from '../components/ui/double-input/double-input.init'
import { tabInit } from '../components/tabs/tab.init.ts'

const LOCAL_STORAGE_TABS_KEY = 'tabsData'
const LOCAL_STORAGE_PIN_KEY = 'pinData'

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

type PinsTabsContextInitialState = {
	pins: number[]
	setPins: Dispatch<SetStateAction<number[]>>
}

export const TabsContext = createContext<TabsContextInitialState>({
	tabs: [],
	setTabs: () => {}
})

export const PinTabsContext = createContext<PinsTabsContextInitialState>({
	pins: [],
	setPins: () => {}
})

const TabsProvider: FC<PropsWithChildren> = ({ children }) => {
	const [tabs, setTabs] = useState<IItem[]>(() => {
		const savedTabs = localStorage.getItem(LOCAL_STORAGE_TABS_KEY)
		if (savedTabs) {
			try {
				const parsed = JSON.parse(savedTabs)
				if (Array.isArray(parsed) && parsed.length > 0) {
					return parsed
				}
			} catch {
				// ignore parse error
			}
		}
		return [tabInit]
	})

	const [pins, setPins] = useState<number[]>(() => {
		const savedPins = localStorage.getItem(LOCAL_STORAGE_PIN_KEY)
		if (savedPins) {
			try {
				const parsed = JSON.parse(savedPins)
				if (Array.isArray(parsed)) {
					return parsed
				}
			} catch {
				// ignore parse error
			}
		}
		return []
	})

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_TABS_KEY, JSON.stringify(tabs))
		localStorage.setItem(LOCAL_STORAGE_PIN_KEY, JSON.stringify(pins))
	}, [tabs, pins])

	return (
		<TabsContext.Provider value={{ tabs, setTabs }}>
			<PinTabsContext.Provider value={{ pins, setPins }}>
				{children}
			</PinTabsContext.Provider>
		</TabsContext.Provider>
	)
}

export default TabsProvider
