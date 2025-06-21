export function fixRelativePaths(html: string, baseUrl?: string) {
	return (
		html
			// Абсолютные href в тегах link, a, и т.п.
			.replace(/href="\/([^"]*)"/g, `href="${baseUrl}/$1"`)
			// Абсолютные src в тегах img, script и т.п.
			.replace(/src="\/([^"]*)"/g, `src="${baseUrl}/$1"`)
			// Абсолютные srcset (например, для img srcset)
			.replace(/srcset="\/([^"]*)"/g, `srcset="${baseUrl}/$1"`)
	)
}

export function isHtml(str?: any) {
	return typeof str === 'string' && /<\/?[a-z][\s\S]*>/i.test(str)
}

export const isObject = (value: any): value is object =>
	value !== null && typeof value === 'object'
