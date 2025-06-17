import styles from './Params.module.scss'

const Params = () => {
	return (
		<div className={styles.params}>
			<div className={styles.params__header}>
				<span>Query параметры</span>
			</div>
			<div className={styles.params__add}>
				<span>+ Добавить</span>
				<span>+ Удалить все</span>
				<span>+ Описание</span>
			</div>
		</div>
	)
}

export default Params
