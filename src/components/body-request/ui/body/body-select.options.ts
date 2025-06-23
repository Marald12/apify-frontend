import BodyJson from './ui/json/BodyJson.tsx'
import BodyFormData from './ui/form-data/BodyFormData.tsx'

export const bodySelectOptions = [
	{
		label: 'None',
		value: 'none',
		component: null
	},
	{
		label: 'Form data',
		value: 'form-data',
		component: BodyFormData
	},
	{
		label: 'Json',
		value: 'json',
		component: BodyJson
	}
]
