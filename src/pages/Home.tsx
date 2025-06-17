import Container from '../components/Container.tsx'
import { useContext } from 'react'
import { ResponseContext } from '../contexts/response.context.ts'
import ObjectViewer from '../components/object-viewer/ObjectViewer.tsx'
import Tabs from '../components/tabs/Tabs.tsx'
import styles from './Home.module.scss'
import cn from 'classnames'
import BodyRequest from '../components/body-request/BodyRequest.tsx'

const Home = () => {
	const { data } = useContext(ResponseContext)

	return (
		<Container>
			<section className={cn('container', styles.page)}>
				<Tabs />
				<BodyRequest />
				{data.data && <ObjectViewer data={data.data} />}
			</section>
		</Container>
	)
}

export default Home
