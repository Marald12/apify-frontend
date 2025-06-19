import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home.tsx'
import { useState } from 'react'
import { TabsContext } from './contexts/tabs.context.ts'
import { tabInit } from './components/tabs/tab.init.ts'
import { ActiveTabContext } from './contexts/active-tab.context.ts'
import './assets/styles/base.scss'
import { PinTabsContext } from './contexts/pin-tabs.context.ts'

function App() {
	const [tabs, setTabs] = useState([tabInit])
	const [activeTab, setActiveTab] = useState(1)
	const [pinTabs, setPinTabs] = useState<number[]>([])

	return (
		<TabsContext.Provider value={{ tabs, setTabs }}>
			<ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
				<PinTabsContext.Provider value={{ pinTabs, setPinTabs }}>
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<Home />} />
						</Routes>
					</BrowserRouter>
				</PinTabsContext.Provider>
			</ActiveTabContext.Provider>
		</TabsContext.Provider>
	)
}

export default App
