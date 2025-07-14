import styles from './DoubleInput.module.scss'
import { MdDragIndicator } from 'react-icons/md'
import { FaRegTrashAlt } from 'react-icons/fa'
import type { FC } from 'react'
import type { IDoubleInputInterfaceProps } from './double-input.interface.ts'
import cn from 'classnames'

const DoubleInput: FC<IDoubleInputInterfaceProps> = ({
	item,
	onCheckboxClick,
	onNameChange,
	onValueChange,
	onDeleteClick,
	checked,
	className,
	isDraggable = false,
	...props
}) => {
	return (
		<div
			className={cn(className, styles.item, item.isDisabled && styles.disabled)}
			{...props}
		>
			<div className={styles.item_inputs}>
				{isDraggable && (
					<span className={styles.item_inputs_drag}>
						<MdDragIndicator />
					</span>
				)}
				<input
					type='text'
					placeholder='Название'
					disabled={item.isDisabled}
					value={item.title}
					onChange={onNameChange}
				/>
				<input
					type='text'
					placeholder='Значение'
					value={item.value}
					disabled={item.isDisabled}
					onChange={onValueChange}
				/>
			</div>
			<div className={styles.item_buttons}>
				<input type='checkbox' checked={checked} onChange={onCheckboxClick} />
				<span className={styles.items_item_trash} onClick={onDeleteClick}>
					<FaRegTrashAlt />
				</span>
			</div>
		</div>
	)
}

export default DoubleInput
