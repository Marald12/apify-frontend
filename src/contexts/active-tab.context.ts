import { createContext, type Dispatch, type SetStateAction } from 'react'

type ActiveTabContextInitialState = {
	activeTab: string
	setActiveTab: Dispatch<SetStateAction<string>>
}

export const ActiveTabContext = createContext<ActiveTabContextInitialState>({
	activeTab: '',
	setActiveTab: () => {}
})
