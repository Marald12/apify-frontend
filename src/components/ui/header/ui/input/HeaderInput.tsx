import styles from './HeaderInput.module.scss'
import Select from 'react-select'
import { methodsList } from '../../../../../utils/methods-list.ts'
import { useActiveTab } from '../../../../../hooks/update-active-tab.hook.ts'
import { headerSelectStyles } from './header-select.styles.ts'
import { useThemeSwitch } from '../../../../../hooks/theme-switch.hook.tsx'
import cn from 'classnames'

const HeaderInput = () => {
	const { tab, updateTab } = useActiveTab()

	const { isDarkTheme } = useThemeSwitch()

	return (
		<div className={cn(styles.input, isDarkTheme && styles.dark)}>
			{tab && (
				<Select
					options={methodsList}
					value={methodsList.find(i => i.value === tab.method)}
					styles={headerSelectStyles(tab?.method, isDarkTheme)}
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
