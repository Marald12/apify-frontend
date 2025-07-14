import type { FC } from 'react'
import styles from './HeaderAddComponent.module.scss'
import type { IHeaderAddComponentProps } from './header-add-component.interface.ts'
import { IoToggleSharp } from 'react-icons/io5'
import { FaRegTrashAlt } from 'react-icons/fa'

const HeaderAddComponent: FC<IHeaderAddComponentProps> = ({
	onAddItem,
	onDeleteAll,
	onDescriptionChange,
	isActiveDescription = false
}) => {
	return (
		<div className={styles.wrapper}>
			<span onClick={onAddItem}>+ Добавить</span>
			<span onClick={onDeleteAll}>
				<FaRegTrashAlt /> Удалить все
			</span>
			{isActiveDescription && onDescriptionChange && (
				<span onClick={onDescriptionChange}>
					<IoToggleSharp /> Описание
				</span>
			)}
		</div>
	)
}

export default HeaderAddComponent
