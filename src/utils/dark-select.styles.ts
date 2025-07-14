import type { StylesConfig } from 'react-select'
import type { ReactElement } from 'react'

type MethodOption = {
	value: string
	label: ReactElement
}

export const darkSelectStyles: (
	isDarkTheme: boolean
) => StylesConfig<MethodOption, false> = isDarkTheme => ({
	control: provided => ({
		...provided,
		backgroundColor: isDarkTheme ? '#262626' : '#ffffff',
		color: isDarkTheme ? '#ffffff' : '#000000',
		borderColor: isDarkTheme ? '#444' : '#ccc'
	}),
	menu: provided => ({
		...provided,
		backgroundColor: isDarkTheme ? '#262626' : '#ffffff'
	}),
	singleValue: provided => ({
		...provided,
		color: isDarkTheme ? '#ffffff' : '#000000'
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isFocused
			? isDarkTheme
				? '#333333'
				: '#f0f0f0'
			: isDarkTheme
				? '#262626'
				: '#ffffff',
		color: isDarkTheme ? '#ffffff' : '#000000'
	}),
	input: provided => ({
		...provided,
		color: isDarkTheme ? '#ffffff' : '#000000'
	}),
	placeholder: provided => ({
		...provided,
		color: isDarkTheme ? '#aaaaaa' : '#555555'
	}),
	indicatorSeparator: provided => ({
		...provided,
		backgroundColor: isDarkTheme ? '#555555' : '#cccccc'
	}),
	dropdownIndicator: provided => ({
		...provided,
		color: isDarkTheme ? '#cccccc' : '#333333'
	})
})
