import { createContext, type Dispatch, type SetStateAction } from 'react'

type PinsTabsContextInitialState = {
	pinTabs: number[]
	setPinTabs: Dispatch<SetStateAction<number[]>>
}

export const PinTabsContext = createContext<PinsTabsContextInitialState>({
	pinTabs: [],
	setPinTabs: () => {}
})
