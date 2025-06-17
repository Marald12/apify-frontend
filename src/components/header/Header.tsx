import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import HeaderInput from './input/HeaderInput.tsx'
import Button from '../button/Button.tsx'
import { useContext } from 'react'
import UrlContext from '../../contexts/url.context.ts'
import axios from 'axios'
import { ResponseContext } from '../../contexts/response.context.ts'

const Header = () => {
	const { url, method } = useContext(UrlContext)
	const { setData } = useContext(ResponseContext)

	const clickHandler = async () => {
		try {
			const response = await axios(url, {
				method,
				headers: {
					'Content-Type': 'application/json'
				}
			})

			setData(response)
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				setData(error.response)
			} else {
				console.error('Ошибка запроса:', error)
				setData({
					status: 0,
					statusText: 'Network Error',
					headers: {},
					// @ts-ignore
					data: error.message,
					config: {}
				} as any)
			}
		}
	}

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
