type StatusCodeMap = {
	[key: number]: {
		color: string
		text: string
	}
}

const green = '#7ecf2b'
const orange = '#ff9a1f'
const red = '#ff5631'
const darkRed = '#af3b21'

export const responseStatusCodeMap: StatusCodeMap = {
	200: { color: green, text: 'OK' },
	201: { color: green, text: 'Created' },
	204: { color: green, text: 'No Content' },
	400: { color: orange, text: 'Bad Request' },
	401: { color: orange, text: 'Unauthorized' },
	403: { color: orange, text: 'Forbidden' },
	404: { color: red, text: 'Not Found' },
	500: { color: darkRed, text: 'Internal Server Error' },
	502: { color: darkRed, text: 'Bad Gateway' },
	503: { color: darkRed, text: 'Service Unavailable' }
}
