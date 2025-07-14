import styles from './BodyJson.module.scss'
import ReactJson from 'react-json-view'
import { useEffect } from 'react'
import { useActiveTab } from '../../../../../../hooks/update-active-tab.hook.ts'
import { initialParams } from '../../../../../ui/double-input/double-input.init.ts'

const BodyJson = () => {
	const { updateTab, tab } = useActiveTab()

	const handleChange = (e: any) => {
		if (e.updated_src) {
			updateTab('body', e.updated_src)
		}
	}

	useEffect(() => {
		if (!tab?.headers) return

		updateTab('body', {})

		updateTab(
			'headers',
			tab?.headers.find(i => i.title === 'Content-Type')
				? tab.headers.map(i =>
						i.title === 'Content-Type' ? { ...i, value: 'application/json' } : i
					)
				: [
						...tab.headers,
						{
							...initialParams,
							title: 'Content-Type',
							value: 'application/json'
						}
					]
		)
	}, [])

	return (
		<div className={styles.body}>
			<ReactJson
				src={tab?.body}
				onEdit={handleChange}
				onAdd={handleChange}
				onDelete={handleChange}
				displayDataTypes={false}
				enableClipboard={false}
			/>
		</div>
	)
}

export default BodyJson
