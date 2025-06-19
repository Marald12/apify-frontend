import styles from './HeaderInput.module.scss'
import Select from 'react-select'
import { methodsList } from '../../../../utils/methods-list.ts'
import { useActiveTab } from '../../../../hooks/update-active-tab.hook.ts'
import { headerSelectStyles } from './header-select.styles.ts'

const HeaderInput = () => {
	const { tab, updateTab } = useActiveTab()

	return (
		<div className={styles.input}>
			{tab && (
				<Select
					options={methodsList}
					value={methodsList.find(i => i.value === tab.method)}
					styles={headerSelectStyles(tab?.method)}
					onChange={e => updateTab('method', e?.value)}
				/>
			)}
			<input
				type='text'
				placeholder='Введите URL'
				value={tab?.url}
				onChange={e => updateTab('url', e.target.value)}
			/>
		</div>
	)
}

export default HeaderInput
