import { useContext } from 'react'
import { type IItem, TabsContext } from '../contexts/tabs.context.tsx'
import { ActiveTabContext } from '../contexts/active-tab.context.ts'

export const useActiveTab = () => {
	const { tabs, setTabs } = useContext(TabsContext)
	const { activeTab } = useContext(ActiveTabContext)

	return {
		tab: tabs.find(({ id }) => id === activeTab),
		updateTab: <K extends keyof IItem>(key: K, value: any) =>
			setTabs(prev =>
				prev.map(i =>
					i.id === activeTab
						? {
								...i,
								[key]: value
							}
						: i
				)
			)
	}
}
