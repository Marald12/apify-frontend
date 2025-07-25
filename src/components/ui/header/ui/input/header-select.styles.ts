import type { StylesConfig } from 'react-select'
import { methodsList } from '../../../../../utils/methods-list.ts'

type MethodOption = {
	value: string
	label: string
	color: string
}

export const headerSelectStyles: (
	method: string,
	isDarkTheme: boolean
) => StylesConfig<MethodOption, false> = (
	method: string,
	isDarkTheme: boolean
) => ({
	control: provided => ({
		...provided,
		position: 'absolute',
		left: '2px',
		bottom: '2px',
		top: '2px',
		border: 'none',
		borderRight: `1px solid ${isDarkTheme ? '#444' : '#eee'}`,
		boxShadow: 'none',
		fontFamily: '"Roboto", sans-serif',
		'&:hover': {
			border: 'none'
		},
		backgroundColor: isDarkTheme ? '#262626' : '#ffffff',
		color: isDarkTheme ? '#ffffff' : '#000000',
		borderColor: isDarkTheme ? '#444' : '#ccc'
	}),
	singleValue: provided => ({
		...provided,
		color: methodsList.find(val => val.value === method)?.color
	}),
	menu: provided => ({
		...provided,
		marginTop: '50px',
		backgroundColor: isDarkTheme ? '#262626' : '#ffffff'
	}),
	option: (provided, state) => ({
		...provided,
		fontFamily: '"Roboto", sans-serif',
		color: state.data.color,
		backgroundColor: state.isFocused
			? isDarkTheme
				? '#333333'
				: '#f0f0f0'
			: isDarkTheme
				? '#262626'
				: '#ffffff'
	}),
	indicatorSeparator: () => ({
		display: 'none',
		backgroundColor: isDarkTheme ? '#555555' : '#cccccc'
	}),
	input: provided => ({
		...provided,
		color: isDarkTheme ? '#ffffff' : '#000000'
	}),
	placeholder: provided => ({
		...provided,
		color: isDarkTheme ? '#aaaaaa' : '#555555'
	}),
	dropdownIndicator: provided => ({
		...provided,
		color: isDarkTheme ? '#cccccc' : '#333333'
	})
})
