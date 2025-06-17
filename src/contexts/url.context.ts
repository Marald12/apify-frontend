import { createContext, type Dispatch, type SetStateAction } from 'react'

type UrlContextInitialState = {
	url: string
	setUrl: Dispatch<SetStateAction<string>>
	method: string
	setMethod: Dispatch<SetStateAction<string>>
}

const UrlContext = createContext<UrlContextInitialState>({
	url: '',
	setUrl: () => {},
	method: 'GET',
	setMethod: () => {}
})

export default UrlContext
