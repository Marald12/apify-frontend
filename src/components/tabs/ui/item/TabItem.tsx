import styles from './TabItem.module.scss'
import { type FC, useContext, useEffect, useRef, useState } from 'react'
import type { ITabItemProps } from './tab-item.interface.ts'
import cn from 'classnames'
import { methodsList } from '../../../../utils/methods-list.ts'
import Draggable from '../../../draggable/Draggable.tsx'
import { ActiveTabContext } from '../../../../contexts/active-tab.context.ts'
import { TabsContext } from '../../../../contexts/tabs.context.tsx'
import { useActiveTab } from '../../../../hooks/update-active-tab.hook.ts'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useOutside } from '../../../../hooks/outside.hook.ts'
import { LuPin } from 'react-icons/lu'
import TabItemDropDownMenu from './dropdown-menu/TabItemDropDownMenu.tsx'
import { useThemeSwitch } from '../../../../hooks/theme-switch.hook.tsx'

const TabItem: FC<ITabItemProps> = ({
	item,
	currentItem,
	setCurrentItem,
	draggable,
	pin
}) => {
	const { activeTab, setActiveTab } = useContext(ActiveTabContext)
	const { setTabs } = useContext(TabsContext)

	const { isDarkTheme } = useThemeSwitch()

	const { updateTab } = useActiveTab()
	const [isOpenDropdownMenu, setIsOpenDropdownMenu] = useState(false)

	const ref = useOutside<any>(() => setIsOpenDropdownMenu(false))
	const [focus, setFocus] = useState(false)

	const [activeRenameTab, setActiveRenameTab] = useState<number>(0)
	const inputRef = useRef<HTMLInputElement>(null)

	const currentBackgroundColor = methodsList.find(
		i => i.value === item.method
	)?.color

	const focusInputHandler = () => {
		setActiveRenameTab(item.id)
		setTimeout(() => inputRef.current?.focus(), 0)
	}

	useEffect(() => {
		if (item.title === '' && activeRenameTab === 0)
			updateTab('title', 'Без названия')

		const pressKeyHandler = (event: KeyboardEvent) => {
			if (event.code === 'Enter') {
				setActiveRenameTab(0)
			}
		}

		window.addEventListener('keyup', pressKeyHandler)

		return () => {
			window.removeEventListener('keyup', pressKeyHandler)
		}
	}, [activeRenameTab, item.title])

	useEffect(() => {
		const pressKeyHandler = (event: KeyboardEvent) => {
			if (event.code === 'F2') {
				setActiveRenameTab(activeTab)
				setTimeout(() => inputRef.current?.focus(), 0)
			}
		}

		window.addEventListener('keyup', pressKeyHandler)

		return () => {
			window.removeEventListener('keyup', pressKeyHandler)
		}
	}, [activeTab])

	return (
		<Draggable
			className={cn(
				styles.item,
				activeTab === item.id && !pin && styles.active,
				isDarkTheme && styles.dark
			)}
			onClick={() => setActiveTab(item.id)}
			groupId='tabs'
			setList={setTabs}
			currentItem={currentItem}
			setCurrentItem={setCurrentItem}
			item={item}
			draggable={!draggable ? !focus : draggable}
			color='#fff'
			focusColor='#eee'
		>
			<div className={styles.item__left}>
				<div style={{ backgroundColor: currentBackgroundColor }}>
					{item.method}
				</div>
				<span onDoubleClick={focusInputHandler}>
					{activeRenameTab === item.id ? (
						<input
							type='text'
							ref={inputRef}
							value={item.title}
							onChange={e => updateTab('title', e.target.value)}
							onBlur={() => {
								setActiveRenameTab(0)
								setFocus(false)
							}}
							onFocus={() => setFocus(true)}
						/>
					) : item.title.length > 19 ? (
						<>{item.title.slice(0, 20)}...</>
					) : (
						item.title
					)}
				</span>
			</div>
			{!pin && (
				<button
					className={styles.item__right}
					onClick={() => setIsOpenDropdownMenu(true)}
				>
					<IoMdArrowDropdown size={21} color={isDarkTheme ? '#fff' : '#000'} />
					<TabItemDropDownMenu
						ref={ref}
						item={item}
						open={isOpenDropdownMenu}
						setOpen={setIsOpenDropdownMenu}
						focusFunction={focusInputHandler}
					/>
				</button>
			)}
			{pin && (
				<span>
					<LuPin />
				</span>
			)}
		</Draggable>
	)
}

export default TabItem
