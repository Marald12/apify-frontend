import type { FC } from 'react'
import type { IButton } from './button.interface.ts'
import styles from './Button.module.scss'

const Button: FC<IButton> = ({ children, ...props }) => {
	return (
		<button {...props} className={styles.button}>
			{children}
		</button>
	)
}

export default Button
