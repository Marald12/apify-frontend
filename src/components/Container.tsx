import type { FC, PropsWithChildren } from 'react'
import Header from './header/Header.tsx'
import { ToastContainer } from 'react-toastify'

const Container: FC<PropsWithChildren> = ({ children, ...props }) => {
	return (
		<>
			<Header />
			<main {...props}>{children}</main>
			<ToastContainer position='bottom-right' />
		</>
	)
}

export default Container
