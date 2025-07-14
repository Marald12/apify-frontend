import type { IItem } from '../../../../contexts/tabs.context.tsx'
import type { Dispatch, SetStateAction } from 'react'

export interface ITabItemProps {
	item: IItem
	currentItem: any
	setCurrentItem: Dispatch<SetStateAction<any>>
	draggable?: boolean
	pin?: boolean
}
