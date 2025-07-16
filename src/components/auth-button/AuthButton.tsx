import styles from './AuthButton.module.scss'
import Button from '../ui/button/Button.tsx'
import cn from 'classnames'
import { useThemeSwitch } from '../../hooks/theme-switch.hook.tsx'
import { useOutsideToggle } from '../../utils/outside-toggle.hook.ts'
import { IoClose } from 'react-icons/io5'
import { useState } from 'react'
import LoginForm from './ui/LoginForm.tsx'
import RegisterForm from './ui/RegisterForm.tsx'

const AuthButton = () => {
	const { ref, isShow, setIsShow } = useOutsideToggle(false)
	const { isDarkTheme } = useThemeSwitch()

	const [authType, setAuthType] = useState<'login' | 'register'>('login')
	const [isHiding, setIsHiding] = useState(false)

	const closePopup = () => {
		setIsHiding(true)
		setTimeout(() => {
			setIsShow(false)
			setIsHiding(false)
		}, 300)
	}

	return (
		<>
			<Button className={styles.button} onClick={() => setIsShow(true)}>
				Авторизоваться
			</Button>
			{(isShow || isHiding) && (
				<div
					className={cn(
						styles.popup,
						isShow && styles.showed,
						isHiding && styles.hiding
					)}
				>
					<div className={styles.popup__overlay}>
						<div
							className={cn(styles.popup__window, isDarkTheme && styles.dark)}
							ref={ref}
						>
							<span className={styles.popup__window_close} onClick={closePopup}>
								<IoClose size={19} />
							</span>
							<div className={styles.popup__window_header}>
								<span
									onClick={() => setAuthType('login')}
									className={(authType === 'login' && styles.active) || ''}
								>
									Авторизация
								</span>
								<span>|</span>
								<span
									onClick={() => setAuthType('register')}
									className={(authType === 'register' && styles.active) || ''}
								>
									Регистрация
								</span>
							</div>
							{authType === 'login' && <LoginForm />}
							{authType === 'register' && <RegisterForm />}
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default AuthButton
