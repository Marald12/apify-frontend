import styles from './BodyRequest.module.scss'
import { tabsList } from './tabs.array.ts'
import { useState } from 'react'
import cn from 'classnames'

const BodyRequest = () => {
	const [activeTab, setActiveTab] = useState(tabsList[0].title)

	const ActiveComponent = tabsList.find(
		tab => tab.title === activeTab
	)?.component

	return (
		<div className={styles.body}>
			<div className={styles.body__header}>
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
