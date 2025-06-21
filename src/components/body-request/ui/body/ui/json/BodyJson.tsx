import styles from './BodyJson.module.scss'
import ReactJson from 'react-json-view'
import { useEffect } from 'react'
import { useActiveTab } from '../../../../../../hooks/update-active-tab.hook.ts'

const BodyJson = () => {
	const { updateTab, tab } = useActiveTab()

	const handleChange = (e: any) => {
		if (e.updated_src) {
			updateTab('body', e.updated_src)
		}
	}

	useEffect(() => {
		updateTab('body', {})
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
