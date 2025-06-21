import cn from 'classnames'
import styles from '../TabItem.module.scss'
import { LuPin } from 'react-icons/lu'
import { FaPen, FaRegClone, FaRegTrashAlt } from 'react-icons/fa'
import { forwardRef, useContext } from 'react'
import { tabInit } from '../../../tab.init.ts'
import { PinTabsContext } from '../../../../../contexts/pin-tabs.context.ts'
import type { ITabItemDropdownMenuProps } from './props.interface.ts'
import { TabsContext } from '../../../../../contexts/tabs.context.ts'

const TabItemDropDownMenu = forwardRef<
	HTMLDivElement,
	ITabItemDropdownMenuProps
>(({ item, open, setOpen, focusFunction, ...props }, ref) => {
	const { pinTabs, setPinTabs } = useContext(PinTabsContext)
	const { tabs, setTabs } = useContext(TabsContext)

	const removeClickHandler = () => {
		if (pinTabs.find(i => item.id === i))
			setPinTabs(prev => prev.filter(i => i !== item.id))

		setTabs(prev => prev.filter(i => i.id !== item.id))

		setOpen(false)
		if (tabs.length === 1) setTabs(prev => [...prev, tabInit])
	}

	const clickHandler = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		func: () => void
	) => {
		e.stopPropagation()
		setOpen(false)
		func()
	}

	return (
		<div ref={ref} className={cn(styles.popup, open && styles.open)} {...props}>
			<div
				onClick={e =>
					clickHandler(e, () =>
						setPinTabs(prev => {
							if (prev.find(i => i === item.id))
								return prev.filter(i => i !== item.id)

							return [...prev, item.id]
						})
					)
				}
			>
				<LuPin /> {pinTabs.find(i => i === item.id) ? 'Открепить' : 'Закрепить'}
			</div>
			<div onClick={e => clickHandler(e, focusFunction)}>
				<FaPen /> Переиминовать
			</div>
			<div
				onClick={e =>
					clickHandler(e, () =>
						setTabs(prev => [
							...prev,
							{
								...item,
								id: tabs[tabs.length - 1].id + 1
							}
						])
					)
				}
			>
				<FaRegClone /> Дублировать
			</div>
			<div onClick={e => clickHandler(e, removeClickHandler)}>
				<FaRegTrashAlt /> Удалить
			</div>
		</div>
	)
})

export default TabItemDropDownMenu
