import { type DragEvent, type FC } from 'react'
import type { IDraggableProps } from './draggable.interface.ts'
import { useThemeSwitch } from '../../hooks/theme-switch.hook.tsx'

const Draggable: FC<IDraggableProps> = ({
	children,
	item,
	setList,
	currentItem,
	setCurrentItem,
	groupId,
	draggable = true,
	color = '#fff',
	focusColor = '#d9d7d7',
	...props
}) => {
	type IEvent = DragEvent<HTMLDivElement>
	type IItem = typeof item & { __groupId?: string }

	const { isDarkTheme } = useThemeSwitch()

	const backgroundColor = isDarkTheme ? '#262626' : color
	const focusBackfroundColor = isDarkTheme ? '#363636' : focusColor

	const dragStartHandler = (e: IEvent, draggedItem: IItem) => {
		e.dataTransfer.effectAllowed = 'move'
		setCurrentItem({ ...draggedItem, __groupId: groupId })
	}

	const dragEndHandler = (e: IEvent) => {
		e.currentTarget.style.backgroundColor = backgroundColor
	}

	const dragOverHandler = (e: IEvent) => {
		e.preventDefault()
		e.currentTarget.style.backgroundColor = focusBackfroundColor
	}

	const dropHandler = (e: IEvent, draggedItem: IItem) => {
		if (!currentItem || currentItem.__groupId !== groupId) return

		e.preventDefault()
		setList((prev: any[]) =>
			prev.map(i => {
				if (i.id === draggedItem.id) return { ...i, order: currentItem.order }
				if (i.id === currentItem.id) return { ...i, order: draggedItem.order }

				return i
			})
		)

		e.currentTarget.style.backgroundColor = backgroundColor
	}

	return (
		<div
			onDragStart={e => dragStartHandler(e, item)}
			onDragEnd={e => dragEndHandler(e)}
			onDragLeave={e => dragEndHandler(e)}
			onDragOver={e => dragOverHandler(e)}
			onDrop={e => dropHandler(e, item)}
			draggable={draggable}
			{...props}
		>
			{children}
		</div>
	)
}

export default Draggable
