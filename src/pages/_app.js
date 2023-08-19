import { SessionProvider } from 'next-auth/react'
import '../app/globals.css'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import { DarkModeProvider } from '../context/DarkModeContext'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<DarkModeProvider>
			<SessionProvider session={session}>
				<div className='container space-y-6'>
					<Header />
					<Component {...pageProps}></Component>
					<Footer />
				</div>
			</SessionProvider>
		</DarkModeProvider>
	)
}
