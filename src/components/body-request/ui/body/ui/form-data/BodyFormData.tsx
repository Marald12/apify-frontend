import styles from './BodyFormData.module.scss'
import { useEffect, useState } from 'react'
import DoubleInput from '../../../../../ui/double-input/DoubleInput.tsx'
import { useActiveTab } from '../../../../../../hooks/update-active-tab.hook.ts'
import HeaderAddComponent from '../../../header-add-component/HeaderAddComponent.tsx'

const BodyFormData = () => {
	const { updateTab, tab } = useActiveTab()

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

	useEffect(() => {
		if (!tab?.headers) return

		updateTab(
			'headers',
			tab?.headers.find(i => i.title === 'Content-Type')
				? tab.headers.map(i =>
						i.title === 'Content-Type'
							? { ...i, value: 'multipart/form-data' }
							: i
					)
				: [
						...tab.headers,
						{
							...initInputItem,
							title: 'Content-Type',
							value: 'multipart/form-data'
						}
					]
		)
	}, [])

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
			<HeaderAddComponent
				onAddItem={() =>
					setInputItems(prev => [
						...prev,
						{
							...initInputItem,
							id: inputItems[inputItems.length - 1].id + 1
						}
					])
				}
				onDeleteAll={() => setInputItems(() => [initInputItem])}
			/>
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
						checked={item.isDisabled}
					/>
				))}
			</div>
		</div>
	)
}

export default BodyFormData
