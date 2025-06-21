import styles from './BodyFormData.module.scss'
import { useEffect, useState } from 'react'
import DoubleInput from '../../../../../double-input/DoubleInput.tsx'
import { FaRegTrashAlt } from 'react-icons/fa'
import { useActiveTab } from '../../../../../../hooks/update-active-tab.hook.ts'

const BodyFormData = () => {
	const { updateTab } = useActiveTab()

	const initInputItem = {
		id: 1,
		title: '',
		value: '',
		order: 1,
		isDisabled: false,
		description: null
	}

	const [inputItems, setInputItems] = useState([initInputItem])

	const formData = new FormData()

	useEffect(() => {
		inputItems.forEach(item => {
			if (item.isDisabled) return

			formData.append(item.title, item.value)
		})

		updateTab('body', formData)
	}, [inputItems])

	const updateInputItem = (
		item: typeof initInputItem,
		key: keyof typeof initInputItem,
		value: string | number | boolean
	) => {
		setInputItems(prev =>
			prev.map(i =>
				i.id === item.id
					? {
							...i,
							[key]: value
						}
					: i
			)
		)
	}

	return (
		<div className={styles.body}>
			<div className={styles.body__add}>
				<span
					onClick={() =>
						setInputItems(prev => [
							...prev,
							{
								...initInputItem,
								id: inputItems[inputItems.length - 1].id + 1
							}
						])
					}
				>
					+ Добавить
				</span>
				<span onClick={() => setInputItems(() => [initInputItem])}>
					<FaRegTrashAlt /> Удалить все
				</span>
			</div>
			<div className={styles.body__items}>
				{inputItems.map(item => (
					<DoubleInput
						key={`form-data-${item.id}`}
						item={item}
						onNameChange={e => updateInputItem(item, 'title', e.target.value)}
						onValueChange={e => updateInputItem(item, 'value', e.target.value)}
						onCheckboxClick={e =>
							updateInputItem(item, 'isDisabled', e.target.checked)
						}
						onDeleteClick={() =>
							setInputItems(prev => {
								if (prev.length > 1) return prev.filter(i => i.id !== item.id)

								return [{ ...initInputItem }]
							})
						}
					/>
				))}
			</div>
		</div>
	)
}

export default BodyFormData
