export const sortCards = <T>(
	a: T & { order: number },
	b: T & { order: number }
) => a.order - b.order
