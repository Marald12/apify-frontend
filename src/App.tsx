import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home.tsx'
import { useState } from 'react'
import TabsProvider from './contexts/tabs.context.tsx'
import { ActiveTabContext } from './contexts/active-tab.context.ts'
import './assets/styles/base.scss'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from './hooks/theme-switch.hook.tsx'

function App() {
	const [activeTab, setActiveTab] = useState(1)

	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<TabsProvider>
				<ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
					<ThemeProvider>
						<BrowserRouter>
							<Routes>
								<Route path='/' element={<Home />} />
							</Routes>
						</BrowserRouter>
					</ThemeProvider>
				</ActiveTabContext.Provider>
			</TabsProvider>
		</QueryClientProvider>
	)
}

export default App
