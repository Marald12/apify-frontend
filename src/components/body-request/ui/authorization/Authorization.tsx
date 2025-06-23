import styles from './Authorization.module.scss'
import { useActiveTab } from '../../../../hooks/update-active-tab.hook'

const Authorization = () => {
	const { updateTab, tab } = useActiveTab()

	console.log(tab)

	return (
		<div className={styles.wrapper}>
			<span>JWT авторизация</span>
			<div className={styles.wrapper__header}>
				<input
					type='checkbox'
					id='title-auth'
					onChange={e =>
						updateTab(
							'authorization',
							e.target.checked ? { token: '' } : undefined
						)
					}
				/>
				<label htmlFor='title-auth'>Включить авторизацию</label>
			</div>
			<div className={styles.wrapper__content}>
				{tab?.authorization && (
					<input
						type='text'
						placeholder='Введите JWT токен'
						value={tab.authorization.token}
						onChange={e =>
							updateTab('authorization', { token: e.target.value })
						}
					/>
				)}
			</div>
		</div>
	)
}

export default Authorization
