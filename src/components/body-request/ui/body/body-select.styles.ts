import type { StylesConfig } from 'react-select'

type MethodOption = {
	value: string
	label: string
}

export const bodySelectStyles: StylesConfig<MethodOption, false> = {
	control: provided => ({
		...provided,
		boxShadow: 'none',
		fontFamily: '"Roboto", sans-serif',
		minWidth: '120px'
	}),
	option: provided => ({
		...provided,
		fontFamily: '"Roboto", sans-serif'
	}),
	indicatorSeparator: () => ({
		display: 'none'
	})
}
