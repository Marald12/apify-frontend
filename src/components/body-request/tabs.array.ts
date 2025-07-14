import Params from './ui/params/Params.tsx'
import type { JSX } from 'react'
import Body from './ui/body/Body.tsx'
import Authorization from './ui/authorization/Authorization.tsx'
import Headers from './ui/headers/Headers.tsx'
import InDevelopment from '../ui/in-development/InDevelopment.tsx'

type ITab = {
	title: string
	component: () => JSX.Element
}

export const tabsList: ITab[] = [
	{ title: 'Параметры', component: Params },
	{ title: 'Тело', component: Body },
	{ title: 'Авторизация', component: Authorization },
	{ title: 'Заголовки', component: Headers },
	{ title: 'Скрипты', component: InDevelopment },
	{ title: 'Документация', component: InDevelopment }
]
