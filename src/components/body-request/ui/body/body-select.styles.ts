import type { StylesConfig } from 'react-select'

type MethodOption = {
	value: string
	label: string
}

export const bodySelectStyles: (
	isDarkTheme: boolean
) => StylesConfig<MethodOption, false> = isDarkTheme => ({
	control: provided => ({
		...provided,
		boxShadow: 'none',
		fontFamily: '"Roboto", sans-serif',
		minWidth: '120px',
		backgroundColor: isDarkTheme ? '#262626' : '#ffffff',
		color: isDarkTheme ? '#ffffff' : '#000000',
		borderColor: isDarkTheme ? '#444' : '#ccc'
	}),
	option: (provided, state) => ({
		...provided,
		fontFamily: '"Roboto", sans-serif',
		backgroundColor: state.isFocused
			? isDarkTheme
				? '#333333'
				: '#f0f0f0'
			: isDarkTheme
				? '#262626'
				: '#ffffff',
		color: isDarkTheme ? '#ffffff' : '#000000'
	}),
	indicatorSeparator: () => ({
		display: 'none',
		backgroundColor: isDarkTheme ? '#555555' : '#cccccc'
	}),
	menu: provided => ({
		...provided,
		backgroundColor: isDarkTheme ? '#262626' : '#ffffff'
	}),
	singleValue: provided => ({
		...provided,
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
	dropdownIndicator: provided => ({
		...provided,
		color: isDarkTheme ? '#cccccc' : '#333333'
	})
})
