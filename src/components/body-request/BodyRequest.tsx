import styles from './BodyRequest.module.scss'
import { tabsList } from './tabs.array.ts'
import { useState } from 'react'
import cn from 'classnames'
import { useThemeSwitch } from '../../hooks/theme-switch.hook.tsx'

const BodyRequest = () => {
	const [activeTab, setActiveTab] = useState(tabsList[0].title)
	const { isDarkTheme } = useThemeSwitch()

	const ActiveComponent = tabsList.find(
		tab => tab.title === activeTab
	)?.component

	return (
		<div className={styles.body}>
			<div className={cn(styles.body__header, isDarkTheme && styles.dark)}>
				{tabsList.map(tab => (
					<div
						key={tab.title}
						className={cn(activeTab === tab.title && styles.active)}
						onClick={() => setActiveTab(tab.title)}
					>
						{tab.title}
					</div>
				))}
			</div>
			<div>{ActiveComponent && <ActiveComponent />}</div>
		</div>
	)
}

export default BodyRequest
