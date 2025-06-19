import { useEffect, useRef } from 'react'

export const useOutside = <T extends HTMLElement>(
	onClickOutside: () => void
) => {
	const ref = useRef<T | null>(null)

	useEffect(() => {
		const handleClick = (event: MouseEvent | TouchEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClickOutside()
			}
		}

		document.addEventListener('mousedown', handleClick)
		document.addEventListener('touchstart', handleClick)

		return () => {
			document.removeEventListener('mousedown', handleClick)
			document.removeEventListener('touchstart', handleClick)
		}
	}, [onClickOutside])

	return ref
}
