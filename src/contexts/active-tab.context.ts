import { createContext, type Dispatch, type SetStateAction } from 'react'

type ActiveTabContextInitialState = {
	activeTab: number
	setActiveTab: Dispatch<SetStateAction<number>>
}

export const ActiveTabContext = createContext<ActiveTabContextInitialState>({
	activeTab: 1,
	setActiveTab: () => {}
})
