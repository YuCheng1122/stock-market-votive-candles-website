import Link from 'next/link'

import StarryBackground from '@/components/common/StarryBackground'
import { Lantern, LanternLayout } from '@/components/ui/Lantern'
import { getServerAuthSession } from '@/pages/api/auth/[...nextauth]'

export async function getServerSideProps(ctx) {
	const session = await getServerAuthSession(ctx)
	if (!session) return { redirect: { destination: `/login`, permanent: false } }
	else return { props: { user: session.user } }
}

export default function Light({ user }) {
	return (
		<StarryBackground>
			<LanternLayout>
				<Link href={`/light/checkout?id=${user.id}&category=水泥`}>
					<Lantern position={'top-96'} label={'水泥股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=食品`}>
					<Lantern position={'left-[500px] top-72'} label={'食品股'} />
				</Link>
				<div className='scale-90'>
					<Link href={`/light/checkout?id=${user.id}&category=塑膠`}>
						<Lantern position={'left-[290px] top-64'} label={'塑膠股'} />
					</Link>
				</div>
				<Link href={`/light/checkout?id=${user.id}&category=化學`}>
					<Lantern position={'right-0 top-32'} label={'化學股'} />
				</Link>
				<div className='scale-75'>
					<Link href={`/light/checkout?id=${user.id}&category=生技醫療`}>
						<Lantern position={'right-40 top-4'} label={'生技醫療股'} />
					</Link>
				</div>
				<div className='scale-[85%]'>
					<Link href={`/light/checkout?id=${user.id}&category=鋼鐵`}>
						<Lantern position={'right-80 top-[460px]'} label={'鋼鐵股'} />
					</Link>
				</div>
				<Link href={`/light/checkout?id=${user.id}&category=汽車`}>
					<Lantern position={'right-56 top-[530px]'} label={'汽車股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=電機`}>
					<Lantern position={'left-12 top-40'} label={'電機股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=半導體`}>
					<Lantern position={'right-[420px] top-36'} label={'半導體股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=光電`}>
					<Lantern position={'left-[430px] top-[485px]'} label={'光電股'} />
				</Link>
				<div className='scale-90'>
					<Link href={`/light/checkout?id=${user.id}&category=資訊服務`}>
						<Lantern position={'left-48 top-10'} label={'資訊服務股'} />
					</Link>
				</div>
				<Link href={`/light/checkout?id=${user.id}&category=電子零件`}>
					<Lantern position={'left-48 top-[550px]'} label={'電子零件股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=航運`}>
					<Lantern position={'right-20 top-80'} label={'航運股'} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=金融`}>
					<Lantern position={'-right-12 top-[500px]'} label={'金融股'} />
				</Link>
				<div className='scale-[80%]'>
					<Link href={`/light/checkout?id=${user.id}&category=綠能環保`}>
						<Lantern position={'-left-56 top-20'} label={'綠能環保股'} />
					</Link>
				</div>
			</LanternLayout>
		</StarryBackground>
	)
}
