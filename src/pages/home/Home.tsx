import Container from '../../components/Container.tsx'
import Tabs from '../../components/tabs/Tabs.tsx'
import styles from './Home.module.scss'
import cn from 'classnames'
import BodyRequest from '../../components/body-request/BodyRequest.tsx'
import Result from './ui/result/Result.tsx'
import { useThemeSwitch } from '../../hooks/theme-switch.hook.tsx'

const Home = () => {
	const { isDarkTheme } = useThemeSwitch()

	return (
		<Container>
			<section
				className={cn('container', styles.page, isDarkTheme && styles.dark)}
			>
				<Tabs />
				<BodyRequest />
				<Result />
			</section>
		</Container>
	)
}

export default Home
