import Container from '../../components/Container.tsx'
import { useContext } from 'react'
import ObjectViewer from '../../components/object-viewer/ObjectViewer.tsx'
import Tabs from '../../components/tabs/Tabs.tsx'
import styles from './Home.module.scss'
import cn from 'classnames'
import BodyRequest from '../../components/body-request/BodyRequest.tsx'
import { TabsContext } from '../../contexts/tabs.context.ts'
import { ActiveTabContext } from '../../contexts/active-tab.context.ts'

const Home = () => {
	const { tabs } = useContext(TabsContext)
	const { activeTab } = useContext(ActiveTabContext)

	const tab = tabs.find(i => i.id === activeTab)

	return (
		<Container>
			<section className={cn('container', styles.page)}>
				<Tabs />
				<BodyRequest />
				<div className={styles.result}>
					{tab?.result.data && <ObjectViewer data={tab.result.data} />}
					{!tab?.result.data && (
						<span>Нажмите кнопку отправить чтобы выполнить запрос</span>
					)}
				</div>
			</section>
		</Container>
	)
}

export default Home
