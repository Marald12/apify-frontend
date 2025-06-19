import type { StylesConfig } from 'react-select'
import { methodsList } from '../../../../utils/methods-list.ts'

type MethodOption = {
	value: string
	label: string
	color: string
}

export const headerSelectStyles = (
	method: string
): StylesConfig<MethodOption, false> => ({
	control: provided => ({
		...provided,
		position: 'absolute',
		left: '2px',
		bottom: '2px',
		top: '2px',
		border: 'none',
		borderRight: '1px solid #eee',
		boxShadow: 'none',
		fontFamily: '"Roboto", sans-serif',
		'&:hover': {
			border: 'none'
		}
	}),
	singleValue: provided => ({
		...provided,
		color: methodsList.find(val => val.value === method)?.color
	}),
	menu: provided => ({
		...provided,
		marginTop: '50px'
	}),
	option: (provided, state) => ({
		...provided,
		fontFamily: '"Roboto", sans-serif',
		color: state.data.color
	}),
	indicatorSeparator: () => ({
		display: 'none'
	})
})
