import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import HeaderInput from './ui/input/HeaderInput.tsx'
import Button from '../button/Button.tsx'
import { useRequestFetch } from '../../../hooks/request-fetch.hook.ts'
import { useQuery } from 'react-query'
import { useActiveTab } from '../../../hooks/update-active-tab.hook.ts'
import { toast } from 'react-toastify'
import { urlReg } from '../../../utils/url.reg.ts'
import type { FormEvent } from 'react'

const Header = () => {
	const { tab, updateTab } = useActiveTab()
	const fetch = useRequestFetch()

	const query = useQuery({
		queryKey: ['mainFetch', tab?.url, tab?.method],
		queryFn: () => fetch(),
		enabled: false,
		onSuccess: data => updateTab('response', data),
		onError: error => updateTab('response', error)
	})

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!tab) return
		if (tab.url === '') return toast.error('Заполните поле URL!')
		if (!urlReg.test(tab.url)) return toast.error('Невалидное поле URL!')

		await query.refetch()
	}

	return (
		<header className={styles.header}>
			<Link to='/'>
				<span>API</span>FY
			</Link>
			<form onSubmit={handleSubmit} className={styles.header__send}>
				<HeaderInput />
				<Button disabled={query.isFetching} type='submit'>
					Отправить
				</Button>
			</form>
			<span>Авторизоваться</span>
		</header>
	)
}

export default Header
