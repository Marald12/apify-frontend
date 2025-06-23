import { useActiveTab } from '../../../../hooks/update-active-tab.hook'
import { initialParams } from '../../../double-input/double-input.init'
import DoubleInput from '../../../double-input/DoubleInput'
import HeaderAddComponent from '../../../header-add-component/HeaderAddComponent'
import styles from './Headers.module.scss'

const Headers = () => {
	const { tab, updateTab } = useActiveTab()

	return (
		<div className={styles.wrapper}>
			<div className={styles.wrapper__header}>
				<span>Заголовки запроса</span>
			</div>
			{tab?.headers && (
				<div className={styles.wrapper__items}>
					<HeaderAddComponent
						onAddItem={() =>
							updateTab('headers', [
								...tab.headers,
								{
									...initialParams,
									id: tab.headers[tab.headers.length - 1].id + 1
								}
							])
						}
						onDeleteAll={() =>
							updateTab('headers', [
								{
									...initialParams,
									id: tab.headers[tab.headers.length - 1].id + 1
								}
							])
						}
					/>
					{tab?.headers.map(header => (
						<DoubleInput
							item={header}
							key={header.id}
							onNameChange={e =>
								updateTab(
									'headers',
									tab.headers.map(i =>
										i.id === header.id ? { ...i, title: e.target.value } : i
									)
								)
							}
							onValueChange={e =>
								updateTab(
									'headers',
									tab.headers.map(i =>
										i.id === header.id ? { ...i, value: e.target.value } : i
									)
								)
							}
							onDeleteClick={() =>
								updateTab(
									'headers',
									tab.headers.length > 1
										? tab.headers.filter(i => header.id !== i.id)
										: [initialParams]
								)
							}
							onCheckboxClick={e =>
								updateTab(
									'headers',
									tab.headers.map(i =>
										i.id === header.id
											? { ...i, isDisabled: e.target.checked }
											: i
									)
								)
							}
							checked={header.isDisabled}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default Headers
