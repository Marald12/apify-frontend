import styles from './TabItem.module.scss'
import { type FC, useContext, useEffect, useRef, useState } from 'react'
import type { ITabItemProps } from './tab-item.interface.ts'
import cn from 'classnames'
import { methodsList } from '../../../../utils/methods-list.ts'
import Draggable from '../../../draggable/Draggable.tsx'
import { ActiveTabContext } from '../../../../contexts/active-tab.context.ts'
import { TabsContext } from '../../../../contexts/tabs.context.ts'
import { useActiveTab } from '../../../../hooks/update-active-tab.hook.ts'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useOutside } from '../../../../hooks/outside.hook.ts'
import { FaPen, FaRegClone, FaRegTrashAlt } from 'react-icons/fa'
import { LuPin } from 'react-icons/lu'
import { tabInit } from '../../tab.init.ts'
import { PinTabsContext } from '../../../../contexts/pin-tabs.context.ts'

const TabItem: FC<ITabItemProps> = ({
	item,
	currentItem,
	setCurrentItem,
	draggable,
	pin
}) => {
	const { activeTab, setActiveTab } = useContext(ActiveTabContext)
	const { tabs, setTabs } = useContext(TabsContext)
	const { pinTabs, setPinTabs } = useContext(PinTabsContext)

	const { updateTab } = useActiveTab()

	const [focus, setFocus] = useState(false)
	const [activeRenameTab, setActiveRenameTab] = useState<number>(0)

	const inputRef = useRef<HTMLInputElement>(null)

	const [open, setOpen] = useState(false)
	const ref = useOutside<HTMLDivElement>(() => setOpen(false))

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
	}, [activeRenameTab, item.title])

	const removeClickHandler = () => {
		setOpen(false)
		if (pinTabs.find(i => item.id === i))
			setPinTabs(prev => prev.filter(i => i !== item.id))
		setTabs(prev => prev.filter(i => i.id !== item.id))
		if (tabs.length === 1) setTabs(prev => [...prev, tabInit])
	}

	return (
		<Draggable
			className={cn(
				styles.item,
				activeTab === item.id && !pin && styles.active
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
					onClick={() => {
						if (open) {
							return setOpen(false)
						}

						setOpen(true)
					}}
				>
					<IoMdArrowDropdown size={21} />
					<div ref={ref} className={cn(styles.popup, open && styles.open)}>
						<div
							onClick={() => {
								setOpen(false)
								setPinTabs(prev => [...prev, item.id])
							}}
						>
							<LuPin /> Закрепить
						</div>
						<div
							onClick={() => {
								setOpen(false)
								focusInputHandler()
							}}
						>
							<FaPen /> Переиминовать
						</div>
						<div
							onClick={() => {
								setOpen(false)
								setTabs(prev => [
									...prev,
									{
										...item,
										id: tabs[tabs.length - 1].id + 1
									}
								])
							}}
						>
							<FaRegClone /> Дублировать
						</div>
						<div onClick={removeClickHandler}>
							<FaRegTrashAlt /> Удалить
						</div>
					</div>
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
