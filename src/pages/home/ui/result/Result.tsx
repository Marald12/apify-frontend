import { useActiveTab } from '../../../../hooks/update-active-tab.hook.ts'
import { fixRelativePaths, isHtml, isObject } from '../../../../utils/check.ts'
import styles from './Result.module.scss'
import { responseStatusCodeMap } from '../../../../utils/response-status-code-map.ts'
import ObjectViewer from '../../../../components/object-viewer/ObjectViewer.tsx'

const Result = () => {
	const { tab } = useActiveTab()

	const response = tab?.response

	const baseUrl = tab?.url
		? new URL(tab.url, window.location.origin).origin
		: ''

	const safeHtml = typeof response?.data === 'string' ? response.data : ''

	const fixedHtml =
		safeHtml && baseUrl ? fixRelativePaths(safeHtml, baseUrl) : ''

	return (
		<div className={styles.result}>
			{response && (
				<div className={styles.result__header}>
					<div
						style={{
							backgroundColor:
								responseStatusCodeMap[Number(response.status)]?.color
						}}
						className={styles.result__header_status}
					>
						{response?.status}{' '}
						{responseStatusCodeMap[Number(response.status)]?.text}
					</div>
					<div>{response.duration} мс</div>
				</div>
			)}
			<div className={styles.result__content}>
				{isHtml(response?.data) ? (
					<div dangerouslySetInnerHTML={{ __html: fixedHtml }} />
				) : isObject(response?.data) ? (
					<ObjectViewer data={response.data} />
				) : (
					!tab?.response && <span>Нет данных для отображения</span>
				)}
				{tab?.response && !response?.data && <ObjectViewer data={response} />}
			</div>
		</div>
	)
}

export default Result
