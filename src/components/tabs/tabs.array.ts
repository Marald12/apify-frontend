import Params from '../body-request/params/Params.tsx'
import type { JSX } from 'react'

type ITab = {
	title: string
	component: () => JSX.Element
}

export const tabsList: ITab[] = [
	{ title: 'Параметры', component: Params },
	{ title: 'Тело', component: Params },
	{ title: 'Авторизация', component: Params },
	{ title: 'Заголовки', component: Params },
	{ title: 'Скрипты', component: Params },
	{ title: 'Документация', component: Params }
]
