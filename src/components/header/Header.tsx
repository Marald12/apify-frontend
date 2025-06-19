import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import HeaderInput from './ui/input/HeaderInput.tsx'
import Button from '../button/Button.tsx'
import { useRequestFetch } from '../../hooks/request-fetch.hook.ts'

const Header = () => {
	const fetch = useRequestFetch()

	const clickHandler = async () => await fetch()

	return (
		<header className={styles.header}>
			<Link to='/'>
				<span>API</span>FY
			</Link>
			<div className={styles.header__send}>
				<HeaderInput />
				<Button onClick={clickHandler}>Отправить</Button>
			</div>
			<span>Авторизоваться</span>
		</header>
	)
}

export default Header
