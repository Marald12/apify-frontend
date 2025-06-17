import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import UrlContext from './contexts/url.context.ts'
import { useState } from 'react'
import { ResponseContext } from './contexts/response.context.ts'

function App() {
	const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/users/1')
	const [method, setMethod] = useState('GET')
	const [data, setData] = useState({})

	return (
		<UrlContext.Provider value={{ url, setUrl, method, setMethod }}>
			<ResponseContext.Provider value={{ data, setData }}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Home />} />
					</Routes>
				</BrowserRouter>
			</ResponseContext.Provider>
		</UrlContext.Provider>
	)
}

export default App
