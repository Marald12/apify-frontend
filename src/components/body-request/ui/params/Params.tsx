import styles from './Params.module.scss'
import { useEffect, useState } from 'react'
import Draggable from '../../../draggable/Draggable.tsx'
import { initialParams } from '../../../ui/double-input/double-input.init.ts'
import { sortCards } from '../../../../utils/sort-draggable.ts'
import { useActiveTab } from '../../../../hooks/update-active-tab.hook.ts'
import DoubleInput from '../../../ui/double-input/DoubleInput.tsx'
import HeaderAddComponent from '../header-add-component/HeaderAddComponent.tsx'
import type { IItem } from '../../../../contexts/tabs.context.tsx'

const Params = () => {
	type ILocalItem = Pick<IItem, 'params'> & {}

	const { updateTab, tab } = useActiveTab()

	const [paramsList, setParamsList] = useState(
		tab?.params ? tab.params : [initialParams]
	)
	const [currentItem, setCurrentItem] = useState<ILocalItem | null>(null)

	console.log(tab?.params)

	useEffect(() => {
		if (tab?.params) {
			setParamsList(tab.params)
		}
	}, [tab?.id])

	useEffect(() => {
		updateTab(
			'params',
			paramsList.filter(j => !j.isDisabled)
		)
	}, [paramsList])

	const updateItem = <T,>(id: string, key: string, data: T) => {
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
				order: prev.length === 0 ? 1 : prev[prev.length - 1].order + 1
			}
		])

	return (
		<div className={styles.params}>
			<div className={styles.params__header}>
				<span>Query параметры</span>
			</div>
			<HeaderAddComponent
				onAddItem={() => addItemToList()}
				onDeleteAll={() => setParamsList(() => [initialParams])}
				onDescriptionChange={() => {}}
				isActiveDescription={true}
			/>
			<div className={styles.params__items}>
				{[...paramsList].sort(sortCards).map(item => (
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
							checked={item.isDisabled}
						/>
					</Draggable>
				))}
			</div>
		</div>
	)
}

export default Params
