import { createContext, type Dispatch, type SetStateAction } from 'react'
import type { AxiosResponse } from 'axios'

type ResponseContextInitialState = {
	data: AxiosResponse<any, any>
	setData: Dispatch<SetStateAction<AxiosResponse<any, any>>>
}

export const ResponseContext = createContext<ResponseContextInitialState>({
	data: {
		data: '',
		// @ts-ignore
		config: {},
		headers: {},
		status: 402,
		request: '',
		statusText: ''
	},
	setData: () => {}
})
