import styles from './Header.module.scss'
import { Link } from 'react-router-dom'
import HeaderInput from './ui/input/HeaderInput.tsx'
import Button from '../button/Button.tsx'
import { useRequestFetch } from '../../../hooks/request-fetch.hook.ts'
import { useQuery } from 'react-query'
import { useActiveTab } from '../../../hooks/update-active-tab.hook.ts'
import { toast } from 'react-toastify'
import { urlReg } from '../../../utils/url.reg.ts'
import type { FormEvent, ReactElement } from 'react'
import Select from 'react-select'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { useThemeSwitch } from '../../../hooks/theme-switch.hook.tsx'
import cn from 'classnames'
import { darkSelectStyles } from '../../../utils/dark-select.styles.ts'
import AuthButton from '../../auth-button/AuthButton.tsx'

type ThemeOption = {
	value: string
	label: ReactElement
}

const options = [
	{
		value: 'dark',
		label: (
			<span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
				<MdOutlineDarkMode size={19} /> Темная тема
			</span>
		)
	},
	{
		value: 'light',
		label: (
			<span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
				<MdOutlineLightMode size={19} /> Светлая тема
			</span>
		)
	}
]

const Header = () => {
	const { tab, updateTab } = useActiveTab()
	const fetch = useRequestFetch()
	const { isDarkTheme, setIsDarkTheme } = useThemeSwitch()

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
		<header className={cn(styles.header, isDarkTheme && styles.dark)}>
			<Link to='/'>
				<span>API</span>FY
			</Link>
			<form onSubmit={handleSubmit} className={styles.header__send}>
				<HeaderInput />
				<Button disabled={query.isFetching} type='submit'>
					Отправить
				</Button>
			</form>
			<div className={styles.header__theme}>
				<Select<ThemeOption, false>
					options={options}
					placeholder='Выберите тему'
					value={isDarkTheme ? options[0] : options[1]}
					onChange={selected =>
						selected?.value === 'dark'
							? setIsDarkTheme(true)
							: setIsDarkTheme(false)
					}
					styles={darkSelectStyles(isDarkTheme)}
				/>
				<AuthButton />
			</div>
		</header>
	)
}

export default Header
