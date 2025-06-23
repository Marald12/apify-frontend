import styles from './Body.module.scss'
import Select from 'react-select'
import { bodySelectOptions } from './body-select.options.ts'
import { bodySelectStyles } from './body-select.styles.ts'
import { type JSX, useState } from 'react'

const Body = () => {
	const [activeBodyType, setActiveBodyType] = useState('')

	const currentBodyType = bodySelectOptions.find(
		option => option.value === activeBodyType
	)
	const CurrentBodyComponent =
		currentBodyType?.component !== null ? currentBodyType?.component : null

	return (
		<div className={styles.body}>
			<div className={styles.body__header}>
				<span>Тело запроса</span>
				<Select
					options={bodySelectOptions}
					styles={bodySelectStyles}
					defaultValue={bodySelectOptions[0]}
					placeholder='Выберите тип'
					onChange={e => setActiveBodyType(e?.value || '')}
				/>
			</div>
			{CurrentBodyComponent && <CurrentBodyComponent />}
		</div>
	)
}

export default Body
