'use client'

import LoginIcon from '@mui/icons-material/Login'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from '../../../node_modules/next/link'
import BurgerMenu from './BurgerMenu/BurgerMenu'
import DarkModeToggle from './DarkModeToggle/DarkModeToggle'
import UserMenu from './UserMenu/UserMenu'

export default function Header() {
	const pages = [
		{
			name: '最新消息',
			url: 'news',
		},
		{
			name: '股市預測',
			url: 'analysis',
		},
		{
			name: '關於我們',
			url: 'about',
		},
		{
			name: '意見回饋',
			url: 'feedback',
		},
		{
			name: '版本資訊',
			url: 'version',
		},
	]

	const session = useSession()

	return (
		<div className='flex items-center justify-between mx-auto md:py-4'>
			<Link href='/' className='flex items-center'>
				<Image src='/favicon.ico' width={32} height={32} alt='股市光明燈' />
				<h4 className='ml-1 font-medium'>股市光明燈</h4>
			</Link>
			<nav className='hidden ml-8 mr-auto space-x-4 leading-5 lg:pt-1 md:flex lg:space-x-8'>
				{pages.map((page) => (
					<Link href={page.url} key={page.url}>
						<p>{page.name}</p>
						<span className='hidden text-sm capitalize lg:block'>{page.url}</span>
					</Link>
				))}
			</nav>
			<div className='flex items-center md:space-x-2 lg:space-x-3 xl:space-x-4'>
				<Link href={'/light'}>
					<button
						type='button'
						className='block mr-2.5 md:mr-0 px-4 py-1 transition-all duration-300 ease-out rounded-full dark:text-zinc-800 bg-primary_yellow focus:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-primary_yellow dark:hover:ring-offset-zinc-900'
					>
						我要點燈
					</button>
				</Link>
				{session.status === 'authenticated' ? (
					<UserMenu />
				) : (
					<Link href={'/dashboard/login'} className='hidden space-x-1 md:block'>
						<span>登入／註冊</span>
						<LoginIcon fontSize='small' />
					</Link>
				)}
				<BurgerMenu pages={pages} session={session} />
				<DarkModeToggle />
			</div>
		</div>
	)
}
