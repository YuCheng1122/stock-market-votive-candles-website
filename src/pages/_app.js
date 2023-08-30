import { useRouter } from 'next/router'
import '../app/globals.css'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import NextAuthProvider from '../components/NextAuthProvider/NextAuthProvider'
import { DarkModeProvider } from '../context/DarkModeContext'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
	const router = useRouter()
	const isExcludedPage =
		router.pathname.includes('/analysis') ||
		router.pathname.includes('/light') ||
		router.pathname.includes('/user') ||
		router.pathname.includes('/feedback') ||
		router.pathname.includes('/signup') ||
		router.pathname.includes('/login')

	return (
		<DarkModeProvider>
			<NextAuthProvider session={session}>
				<div
					className={`container bg-white dark:bg-zinc-800 ${isExcludedPage ? '' : 'px-4 sm:px-6 md:px-10 lg:px-16'}`}
				>
					<div className={`${isExcludedPage ? 'px-4 sm:px-6 md:px-10 lg:px-16' : ''}`}>
						<Header />
					</div>
					<Component {...pageProps} />{' '}
					<div className={`${isExcludedPage ? 'px-4 sm:px-6 md:px-10 lg:px-16' : ''}`}>
						<Footer />
					</div>
				</div>
			</NextAuthProvider>
		</DarkModeProvider>
	)
}
