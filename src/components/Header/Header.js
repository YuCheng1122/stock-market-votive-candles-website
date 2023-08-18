'use client'

import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Image from 'next/image'
import { useState } from 'react'
import Link from '../../../node_modules/next/link'
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle'

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

	return (
		<header className='bg-white dark:bg-zinc-900'>
			<div className='flex items-center justify-between px-4 py-2 mx-auto md:justify-start md:px-0 md:py-4'>
				<Link href='/' className='flex items-center'>
					<Image src='/favicon.ico' width={32} height={32} alt='股市光明燈' />
					<h4 className='ml-1 font-medium'>股市光明燈</h4>
				</Link>
				<nav className='hidden ml-8 mr-auto space-x-4 leading-4 sm:flex lg:space-x-7'>
					{pages.map((page) => (
						<Link href={page.url} key={page.url}>
							<p className='text-sm'>{page.name}</p>
							<span className='hidden text-xs capitalize xl:block'>{page.url}</span>
						</Link>
					))}
				</nav>
				<div className='flex items-center'>
					<Link href={'/light'}>
						<button
							type='button'
							className='hidden px-5 py-1.5 mr-1.5 text-sm transition-all duration-300 ease-out border-0 rounded-full text-zinc-900 bg-primary_yellow sm:block focus:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-primary_yellow hover:ring-offset-gray-900	'
						>
							我要點燈
						</button>
					</Link>
					<BurgerMenu pages={pages} />
					<DarkModeToggle />
				</div>
			</div>
		</header>
	)
}

function BurgerMenu({ pages }) {
	const [open, setState] = useState(false)
	const toggleDrawer = (open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return
		}
		setState(open)
	}

	return (
		<Toolbar className='block md:hidden'>
			<Box
				component='div'
				sx={{
					display: {
						xs: 'none',
						sm: 'block',
					},
				}}
			></Box>
			<IconButton
				className='dark:text-white'
				aria-label='open drawer'
				onClick={toggleDrawer(true)}
				sx={{
					display: {
						xs: 'block',
						sm: 'none',
					},
				}}
			>
				<MenuIcon />
			</IconButton>
			<Drawer anchor='right' open={open} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
				<Box sx={{ width: 200 }}>
					<IconButton sx={{ my: 1 }}>
						<CloseIcon onClick={toggleDrawer(false)} />
					</IconButton>
					<Divider sx={{ mb: 2 }} />
					<Box>
						{pages.map((page) => (
							<ListItemButton key={page.url}>
								<Link href={page.url} key={page.url}>
									<ListItemText primary={page.name} />
								</Link>
							</ListItemButton>
						))}
					</Box>
				</Box>
			</Drawer>
		</Toolbar>
	)
}
