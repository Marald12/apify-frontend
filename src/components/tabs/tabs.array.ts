import Params from '../body-request/ui/params/Params.tsx'
import type { JSX } from 'react'
import Body from '../body-request/ui/body/Body.tsx'
import Authorization from '../body-request/ui/authorization/Authorization.tsx'
import Headers from '../body-request/ui/headers/Headers.tsx'

type ITab = {
	title: string
	component: () => JSX.Element
}

export const tabsList: ITab[] = [
	{ title: 'Параметры', component: Params },
	{ title: 'Тело', component: Body },
	{ title: 'Авторизация', component: Authorization },
	{ title: 'Заголовки', component: Headers },
	{ title: 'Скрипты', component: Params },
	{ title: 'Документация', component: Params }
]
