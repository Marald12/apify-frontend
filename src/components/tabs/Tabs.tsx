import styles from './Tabs.module.scss'
import cn from 'classnames'

const Tabs = () => {
	return (
		<div className={styles.tabs}>
			<div className={styles.tabs__header}>
				<input type='text' placeholder='Поиск...' />
				<button>+</button>
			</div>
			<div className={styles.tabs__items}>
				<div className={cn(styles.tabs__items_item, styles.active)}>
					<div>POST</div>
					<span>Новый запрос</span>
				</div>
				<div className={cn(styles.tabs__items_item)}>
					<div>GET</div>
					<span>Создать пост</span>
				</div>
			</div>
		</div>
	)
}

export default Tabs
