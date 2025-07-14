import styles from './Tabs.module.scss'
import {
	type IItem,
	PinTabsContext,
	TabsContext
} from '../../contexts/tabs.context.tsx'
import { useContext, useState } from 'react'
import { tabInit } from './tab.init.ts'
import TabItem from './ui/item/TabItem.tsx'
import { sortCards } from '../../utils/sort-draggable.ts'
import useDebounce from '../../hooks/debounce.hook.ts'
import { useThemeSwitch } from '../../hooks/theme-switch.hook.tsx'
import cn from 'classnames'

const Tabs = () => {
	const { tabs, setTabs } = useContext(TabsContext)
	const { pins } = useContext(PinTabsContext)

	const { isDarkTheme } = useThemeSwitch()

	const [currentItem, setCurrentItem] = useState<IItem | null>(null)

	const [searchValue, setSearchValue] = useState<string>('')

	const debounce = useDebounce(searchValue, 200)

	const searchTab =
		debounce === ''
			? tabs
			: tabs.filter(i => i.title.toLowerCase().includes(debounce.toLowerCase()))

	return (
		<div className={styles.tabs}>
			<div className={styles.tabs__header}>
				<input
					type='text'
					placeholder='Поиск...'
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
					className={isDarkTheme ? styles.dark : ''}
				/>
				<button
					onClick={() =>
						// @ts-ignore
						setTabs(prev => [
							...prev,
							{
								...tabInit,
								id: tabs[tabs.length - 1].id + 1 || 1,
								order: tabs[tabs.length - 1].order + 1 || 1
							}
						])
					}
				>
					+
				</button>
			</div>

			<div className={styles.tabs__items}>
				{pins.map(tab => {
					const pinnedTab = tabs.find(item => item.id === tab)
					if (!pinnedTab) return null

					return (
						<TabItem
							key={tab}
							item={pinnedTab}
							currentItem={currentItem}
							setCurrentItem={setCurrentItem}
							draggable={false}
							pin={true}
						/>
					)
				})}
				{pins.length > 0 && (
					<div
						className={cn(styles.tabs__items_line, isDarkTheme && styles.dark)}
					/>
				)}
				{searchTab.sort(sortCards<IItem>).map(tab => (
					<TabItem
						key={tab.id}
						item={tab}
						currentItem={currentItem}
						setCurrentItem={setCurrentItem}
					/>
				))}
				{searchTab.length === 0 && (
					<span className={styles.not_found}>Ни одной вкладки не найдено!</span>
				)}
			</div>
		</div>
	)
}

export default Tabs
