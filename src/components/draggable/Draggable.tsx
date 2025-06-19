import { type DragEvent, type FC } from 'react'
import type { IDraggableProps } from './draggable.interface.ts'

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

	const dragStartHandler = (e: IEvent, draggedItem: IItem) => {
		e.dataTransfer.effectAllowed = 'move'
		setCurrentItem({ ...draggedItem, __groupId: groupId })
	}

	const dragEndHandler = (e: IEvent) => {
		e.currentTarget.style.backgroundColor = color
	}

	const dragOverHandler = (e: IEvent) => {
		e.preventDefault()
		e.currentTarget.style.backgroundColor = focusColor
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

		e.currentTarget.style.backgroundColor = color
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
