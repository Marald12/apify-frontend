import type { IItem } from '../../../../../contexts/tabs.context.tsx'
import type {
	DetailedHTMLProps,
	Dispatch,
	HTMLAttributes,
	SetStateAction
} from 'react'

export interface ITabItemDropdownMenuProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	item: IItem
	setOpen: Dispatch<SetStateAction<boolean>>
	open: boolean
	focusFunction: () => void
}
