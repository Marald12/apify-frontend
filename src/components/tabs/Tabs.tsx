import styles from './Tabs.module.scss'
import { type IItem, TabsContext } from '../../contexts/tabs.context.ts'
import { useContext, useState } from 'react'
import { tabInit } from './tab.init.ts'
import TabItem from './ui/item/TabItem.tsx'
import { sortCards } from '../../utils/sort-draggable.ts'
import { PinTabsContext } from '../../contexts/pin-tabs.context.ts'
import useDebounce from '../../hooks/debounce.hook.ts'

const Tabs = () => {
	const { tabs, setTabs } = useContext(TabsContext)
	const { pinTabs } = useContext(PinTabsContext)

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
				/>
				<button
					onClick={() =>
						// @ts-ignore
						setTabs(prev => [
							...prev,
							{
								...tabInit,
								id: tabs[tabs.length - 1].id + 1,
								order: tabs[tabs.length - 1].order + 1
							}
						])
					}
				>
					+
				</button>
			</div>

			<div className={styles.tabs__items}>
				{pinTabs.map(tab => (
					<TabItem
						key={tab}
						item={tabs.find(item => item.id === tab)!}
						currentItem={currentItem}
						setCurrentItem={setCurrentItem}
						draggable={false}
						pin={true}
					/>
				))}
				{pinTabs.length > 0 && <div className={styles.tabs__items_line} />}
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
