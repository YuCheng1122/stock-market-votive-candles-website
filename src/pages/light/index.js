import Link from 'next/link'
import Lantern from '../../components/Light/Lantern'

/*還在測試*/
export default function Light() {
	const lanternCount = 5

	return (
		<div id='stars-background-container'>
			<div className='container flex py-20 mx-auto space-x-6'>
				{Array.from({ length: lanternCount }).map((_, index) => (
					<Lantern key={index} />
				))}
				<span className='lantern'></span>
				<Link href='/light/checkout'>
					<button>祈福</button>
				</Link>
			</div>
			<div className='stars'></div>
			<div className='twinkling'></div>
			<div className='clouds'></div>
		</div>
	)
}
