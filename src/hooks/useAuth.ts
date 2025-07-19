import { useQuery } from 'react-query'
import { userService } from '../api/user/user.service.ts'

export const useAuth = () => {
	const { data } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile()
	})

	return {
		user: data,
		isAuth: !!data
	}
}
