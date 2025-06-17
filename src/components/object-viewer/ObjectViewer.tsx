import React, { useState } from 'react'
import styles from './ObjectViewer.module.scss'

type Props = {
	data: any
	level?: number
}

const ObjectViewer: React.FC<Props> = ({ data, level = 0 }) => {
	const [collapsed, setCollapsed] = useState<Record<string | number, boolean>>(
		{}
	)

	const toggle = (key: string | number) => {
		setCollapsed(prev => ({ ...prev, [key]: !prev[key] }))
	}

	const isObject = (val: any) => typeof val === 'object' && val !== null
	const isArray = Array.isArray(data)
	const entries = isArray
		? data.map((value, index) => [index, value])
		: Object.entries(data)

	if (!isObject(data)) {
		return <span className={styles.ov__value}>"{String(data)}"</span>
	}

	return (
		<div className={styles.ov__block}>
			<div
				className={styles.ov__line}
				style={{ marginLeft: `${level * 16}px` }}
			>
				<span className={styles.ov__bracket}>{isArray ? '[' : '{'}</span>
			</div>

			{entries.map(([key, value]) => {
				const nested = isObject(value)
				const isCollapsed = collapsed[key]

				return (
					<div
						className={styles.ov__item}
						key={String(key)}
						style={{ marginLeft: `${(level + 1) * 16}px` }}
					>
						<div
							className={`${styles.ov__keyline} ${nested ? styles.ov__clickable : ''}`}
							onClick={() => nested && toggle(key)}
						>
							{nested && (
								<span className={styles.ov__arrow}>
									{isCollapsed ? '▶' : '▼'}
								</span>
							)}
							<span className={styles.ov__key}>{String(key)}</span>
							<span className={styles.ov__colon}>: </span>
							{!nested && (
								<span className={styles.ov__value}>
									{typeof value === 'string' ? `"${value}"` : String(value)}
								</span>
							)}
						</div>
						{nested && !isCollapsed && (
							<ObjectViewer data={value} level={level + 1} />
						)}
					</div>
				)
			})}

			<div
				className={styles.ov__line}
				style={{ marginLeft: `${level * 16}px` }}
			>
				<span className={styles.ov__bracket}>{isArray ? ']' : '}'}</span>
			</div>
		</div>
	)
}

export default ObjectViewer
