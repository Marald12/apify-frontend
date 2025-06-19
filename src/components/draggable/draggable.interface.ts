import type {
	DetailedHTMLProps,
	Dispatch,
	HTMLAttributes,
	ReactNode,
	SetStateAction
} from 'react'

export interface IDraggableProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children?: ReactNode | undefined
	item: any
	setList: Dispatch<SetStateAction<any>>
	currentItem: any
	setCurrentItem: Dispatch<SetStateAction<any>>
	color?: string
	focusColor?: string
	groupId: string
	draggable?: boolean
}
