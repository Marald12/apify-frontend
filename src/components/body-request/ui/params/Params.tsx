import styles from './Params.module.scss'
import { FaRegTrashAlt } from 'react-icons/fa'
import { IoToggleSharp } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import Draggable from '../../../draggable/Draggable.tsx'
import { initialParams } from '../../../double-input/double-input.init.ts'
import { sortCards } from '../../../../utils/sort-draggable.ts'
import { useActiveTab } from '../../../../hooks/update-active-tab.hook.ts'
import DoubleInput from '../../../double-input/DoubleInput.tsx'

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
						key={item.id}
						item={item}
						setList={setParamsList}
						currentItem={currentItem}
						setCurrentItem={setCurrentItem}
						color='#eee'
						groupId='params'
					>
						<DoubleInput
							item={item}
							onNameChange={e =>
								updateItem<string>(item.id, 'title', e.target.value)
							}
							onValueChange={e =>
								updateItem<string>(item.id, 'value', e.target.value)
							}
							onCheckboxClick={e =>
								updateItem<boolean>(item.id, 'isDisabled', e.target.checked)
							}
							onDeleteClick={() => {
								setParamsList(prev => {
									if (prev.length > 1) return prev.filter(i => i.id !== item.id)

									return [{ ...initialParams }]
								})
							}}
							isDraggable={true}
						/>
					</Draggable>
				))}
			</div>
		</div>
	)
}

export default Params
