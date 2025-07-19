import type { FC, PropsWithChildren } from 'react'
import Header from './ui/header/Header.tsx'
import { ToastContainer } from 'react-toastify'
import { useThemeSwitch } from '../hooks/theme-switch.hook.tsx'

const Container: FC<PropsWithChildren> = ({ children, ...props }) => {
	const { isDarkTheme } = useThemeSwitch()

	return (
		<>
			<Header />
			<main {...props}>{children}</main>
			<ToastContainer
				position='bottom-right'
				theme={isDarkTheme ? 'dark' : 'light'}
			/>
		</>
	)
}

export default Container
