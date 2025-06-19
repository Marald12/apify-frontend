import styles from './Params.module.scss'
import { FaRegTrashAlt } from 'react-icons/fa'
import { IoToggleSharp } from 'react-icons/io5'
import { MdDragIndicator } from 'react-icons/md'
import { useEffect, useState } from 'react'
import cn from 'classnames'
import Draggable from '../../../draggable/Draggable.tsx'
import { initialParams } from './params.init.ts'
import { sortCards } from '../../../../utils/sort-draggable.ts'
import { useActiveTab } from '../../../../hooks/update-active-tab.hook.ts'

const Params = () => {
	type IItem = typeof initialParams

	const { updateTab } = useActiveTab()

	const [paramsList, setParamsList] = useState([initialParams])
	const [currentItem, setCurrentItem] = useState<IItem | null>(null)

	useEffect(() => {
		updateTab(
			'params',
			paramsList
				.filter(j => !j.isDisabled)
				.map(j => ({ title: j.title, value: j.value }))
		)
	}, [paramsList])

	const updateItem = <T,>(id: number, key: string, data: T) => {
		setParamsList(prev => {
			const tempItem = prev.find(i => i.id === id)
			if (!tempItem) return prev

			return prev.map(i =>
				i.id === tempItem.id
					? {
							...tempItem,
							[key]: data
						}
					: i
			)
		})
	}

	const addItemToList = () =>
		setParamsList(prev => [
			...prev,
			{
				...initialParams,
				id: prev[prev.length - 1].id + 1,
				order: prev[prev.length - 1].order + 1
			}
		])

	return (
		<div className={styles.params}>
			<div className={styles.params__header}>
				<span>Query параметры</span>
			</div>
			<div className={styles.params__add}>
				<span onClick={() => addItemToList()}>+ Добавить</span>
				<span onClick={() => setParamsList(() => [initialParams])}>
					<FaRegTrashAlt /> Удалить все
				</span>
				<span>
					<IoToggleSharp /> Описание
				</span>
			</div>
			<div className={styles.params__items}>
				{[...paramsList].sort(sortCards<IItem>).map(item => (
					<Draggable
						className={cn(
							styles.params__items_item,
							item.isDisabled && styles.disabled
						)}
						key={item.id}
						item={item}
						setList={setParamsList}
						currentItem={currentItem}
						setCurrentItem={setCurrentItem}
						color='#eee'
						groupId='params'
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
									updateItem<string>(item.id, 'title', e.target.value)
								}
							/>
							<input
								type='text'
								placeholder='Значение'
								value={item.value}
								disabled={item.isDisabled}
								onChange={e =>
									updateItem<string>(item.id, 'value', e.target.value)
								}
							/>
						</div>
						<div className={styles.params__items_item_buttons}>
							<input
								type='checkbox'
								onChange={e =>
									updateItem<boolean>(item.id, 'isDisabled', e.target.checked)
								}
							/>
							<span
								className={styles.params__items_item_trash}
								onClick={() =>
									setParamsList(prev => {
										if (prev.length > 1)
											return prev.filter(i => i.id !== item.id)

										return [{ ...initialParams }]
									})
								}
							>
								<FaRegTrashAlt />
							</span>
						</div>
					</Draggable>
				))}
			</div>
		</div>
	)
}

export default Params
