import Params from '../body-request/ui/params/Params.tsx'
import type { JSX } from 'react'
import Body from '../body-request/ui/body/Body.tsx'

type ITab = {
	title: string
	component: () => JSX.Element
}

export const tabsList: ITab[] = [
	{ title: 'Параметры', component: Params },
	{ title: 'Тело', component: Body },
	{ title: 'Авторизация', component: Params },
	{ title: 'Заголовки', component: Params },
	{ title: 'Скрипты', component: Params },
	{ title: 'Документация', component: Params }
]
