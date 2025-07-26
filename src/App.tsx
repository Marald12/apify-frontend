import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home.tsx'
import TabsProvider from './contexts/tabs.context.tsx'
import './assets/styles/base.scss'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from './hooks/theme-switch.hook.tsx'

function App() {
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<TabsProvider>
				<ThemeProvider>
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<Home />} />
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</TabsProvider>
		</QueryClientProvider>
	)
}

export default App
