import Lantern from '../../components/Light/Lantern'
import StarryBackground from '../../components/StarryBackground/StarryBackground'
import { getServerAuthSession } from '../api/auth/[...nextauth]'

export async function getServerSideProps(ctx) {
	const session = await getServerAuthSession(ctx)
	if (session) return { props: { user: session.user } }
	else {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	}
}

export default function Light({ user }) {
	return (
		<StarryBackground>
			<div className='min-h-screen'>
				<Lantern user={user} />
			</div>
		</StarryBackground>
	)
}
