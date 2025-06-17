import styles from './Params.module.scss'
import { FaRegTrashAlt } from 'react-icons/fa'
import { IoToggleSharp } from 'react-icons/io5'
import { MdDragIndicator } from 'react-icons/md'
import type { DragEvent } from 'react'
import { useState } from 'react'
import cn from 'classnames'

const Params = () => {
	type IEvent = DragEvent<HTMLDivElement>
	type IItem = (typeof paramsList)[number]

	const initParam = {
		id: 1,
		title: '',
		value: '',
		order: 1,
		isDisabled: false
	}

	const [paramsList, setParamsList] = useState([{ ...initParam }])
	const [currentParam, setCurrentParams] = useState<IItem | null>(null)

	console.log(paramsList)

	const dragStartHandler = (item: IItem) => {
		setCurrentParams(item)
	}
	const dragEndHandler = (e: IEvent) => {
		e.currentTarget.style.backgroundColor = '#eee'
	}
	const dragOverHandler = (e: IEvent) => {
		e.preventDefault()
		e.currentTarget.style.backgroundColor = '#d9d7d7'
	}
	const dropHandler = (e: IEvent, item: IItem) => {
		e.preventDefault()
		if (!currentParam) return

		setParamsList(prev =>
			prev.map(i => {
				if (i.id === item.id) return { ...i, order: currentParam.order }
				if (i.id === currentParam.id) return { ...i, order: item.order }

				return i
			})
		)
		e.currentTarget.style.backgroundColor = '#eee'
	}

	const sortCards = (a: IItem, b: IItem) => a.order - b.order

	return (
		<div className={styles.params}>
			<div className={styles.params__header}>
				<span>Query параметры</span>
			</div>
			<div className={styles.params__add}>
				<span
					onClick={() =>
						setParamsList(prev => [
							...prev,
							{
								id: prev[prev.length - 1].id + 1,
								title: '',
								value: '',
								order: prev[prev.length - 1].order + 1,
								isDisabled: false
							}
						])
					}
				>
					+ Добавить
				</span>
				<span
					onClick={() =>
						setParamsList(() => [
							{
								id: 1,
								title: '',
								value: '',
								order: 1,
								isDisabled: false
							}
						])
					}
				>
					<FaRegTrashAlt /> Удалить все
				</span>
				<span>
					<IoToggleSharp /> Описание
				</span>
			</div>
			<div className={styles.params__items}>
				{paramsList.sort(sortCards).map(item => (
					<div
						className={cn(
							styles.params__items_item,
							item.isDisabled && styles.disabled
						)}
						key={item.id}
						onDragStart={() => dragStartHandler(item)}
						onDragEnd={e => dragEndHandler(e)}
						onDragLeave={e => dragEndHandler(e)}
						onDragOver={e => dragOverHandler(e)}
						onDrop={e => dropHandler(e, item)}
						draggable={true}
					>
						<div className={styles.params__items_item_inputs}>
							<span className={styles.params__items_item_inputs_drag}>
								<MdDragIndicator />
							</span>
							<input
								type='text'
								placeholder='Название'
								disabled={item.isDisabled}
								value={item.title}
								onChange={e =>
									setParamsList(prev => {
										const tempItem = prev.find(i => i.id === item.id)
										if (!tempItem) return prev

										return prev.map(j =>
											j.id === tempItem.id
												? {
														...tempItem,
														title: e.target.value
													}
												: j
										)
									})
								}
							/>
							<input
								type='text'
								placeholder='Значение'
								value={item.value}
								disabled={item.isDisabled}
								onChange={e =>
									setParamsList(prev => {
										const tempItem = prev.find(i => i.id === item.id)
										if (!tempItem) return prev

										return prev.map(j =>
											j.id === tempItem.id
												? {
														...tempItem,
														value: e.target.value
													}
												: j
										)
									})
								}
							/>
						</div>
						<div className={styles.params__items_item_buttons}>
							<input
								type='checkbox'
								onChange={e =>
									setParamsList(prev =>
										prev.map(i =>
											i.id === item.id
												? {
														...i,
														isDisabled: e.target.checked
													}
												: i
										)
									)
								}
							/>
							<span
								className={styles.params__items_item_trash}
								onClick={() =>
									setParamsList(prev => {
										if (prev.length > 1) prev.filter(i => i.id !== item.id)

										return [{ ...initParam }]
									})
								}
							>
								<FaRegTrashAlt />
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Params
