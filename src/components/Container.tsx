import type { FC, PropsWithChildren } from 'react'
import Header from './header/Header.tsx'

const Container: FC<PropsWithChildren> = ({ children, ...props }) => {
	return (
		<>
			<Header />
			<main {...props}>{children}</main>
		</>
	)
}

export default Container
