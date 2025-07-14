// hooks/theme-switch.hook.ts
import {
	createContext,
	type FC,
	type PropsWithChildren,
	useContext,
	useEffect,
	useState
} from 'react'

interface ThemeContextType {
	isDarkTheme: boolean
	setIsDarkTheme: (value: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isDarkTheme, setIsDarkTheme] = useState(() => {
		return localStorage.getItem('isDarkTheme') === 'true'
	})

	useEffect(() => {
		localStorage.setItem('isDarkTheme', String(isDarkTheme))
		document.body.classList.toggle('dark', isDarkTheme)
		document.body.classList.toggle('light', !isDarkTheme)
	}, [isDarkTheme])

	return (
		<ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useThemeSwitch = () => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useThemeSwitch must be used within a ThemeProvider')
	}
	return context
}
