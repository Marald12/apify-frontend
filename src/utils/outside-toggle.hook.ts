import {
	type Dispatch,
	type LegacyRef,
	type SetStateAction,
	useEffect,
	useRef,
	useState
} from 'react'

export type TypeOut = {
	ref: LegacyRef<HTMLDivElement> | undefined
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
}

export const useOutsideToggle = (initialIsVisible: boolean): TypeOut => {
	const [isShow, setIsShow] = useState(initialIsVisible)
	const ref = useRef<HTMLDivElement>(null)

	const handleClickOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setIsShow(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', event => handleClickOutside(event), true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	})

	return { ref, isShow, setIsShow }
}
