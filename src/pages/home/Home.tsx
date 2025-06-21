import Container from '../../components/Container.tsx'
import Tabs from '../../components/tabs/Tabs.tsx'
import styles from './Home.module.scss'
import cn from 'classnames'
import BodyRequest from '../../components/body-request/BodyRequest.tsx'
import Result from './ui/result/Result.tsx'

const Home = () => {
	return (
		<Container>
			<section className={cn('container', styles.page)}>
				<Tabs />
				<BodyRequest />
				<Result />
			</section>
		</Container>
	)
}

export default Home
