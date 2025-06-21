import type {
	ChangeEvent,
	ChangeEventHandler,
	DetailedHTMLProps,
	HTMLAttributes,
	MouseEventHandler
} from 'react'
import { initialParams } from './double-input.init.ts'

export interface IDoubleInputInterfaceProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	onNameChange?: ChangeEventHandler<HTMLInputElement>
	onValueChange?: ChangeEventHandler<HTMLInputElement>
	onCheckboxClick?: (event: ChangeEvent<HTMLInputElement>) => void
	onDeleteClick?: MouseEventHandler<HTMLSpanElement>
	item: typeof initialParams
	isDraggable?: boolean
}
