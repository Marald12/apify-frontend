import styles from './HeaderInput.module.scss'
import Select, { type StylesConfig } from 'react-select'
import { useContext } from 'react'
import UrlContext from '../../../contexts/url.context.ts'

type MethodOption = {
	value: string
	label: string
	color: string
}

const HeaderInput = () => {
	const { setUrl, url, setMethod, method } = useContext(UrlContext)

	const options = [
		{ value: 'GET', label: 'GET', color: '#000' },
		{ value: 'POST', label: 'POST', color: '#7ecf2b' },
		{ value: 'PUT', label: 'PUT', color: '#ff9a1f' },
		{ value: 'PATCH', label: 'PATCH', color: '#dcce36' },
		{ value: 'DELETE', label: 'DELETE', color: '#ff5631' }
	]

	const customStyles: StylesConfig<MethodOption, false> = {
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
			color: options.find(val => val.value === method)?.color
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
	}

	return (
		<div className={styles.input}>
			<Select
				options={options}
				defaultValue={options[0]}
				styles={customStyles}
				onChange={e => setMethod(e!.value)}
			/>
			<input
				type='text'
				placeholder='Введите URL'
				value={url}
				onChange={e => setUrl(e.target.value)}
			/>
		</div>
	)
}

export default HeaderInput
