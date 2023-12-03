'use client'

import { getCurrentDate } from '@/utils/getCurrentDate'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { DataGrid } from '@mui/x-data-grid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import { multiLineOption } from '@/components/Chart/options/multiLineOption'
import PrayerCard from '@/components/Light/PrayerCard'
import StarryBackground from '@/components/common/StarryBackground'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SubmitBtn from '@/components/ui/SubmitBtn'

const columns = [
	{ field: 'stock_id', headerName: '代號', flex: 1 },
	{ field: 'stock_name', headerName: '股票', flex: 1 },
	{
		field: 'price',
		headerName: '股價',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
		valueFormatter: (params) => `${params.value.toFixed(2)}`,
		cellClassName: (params) => {
			const changeValue = params.row.quote_change || 0
			return changeValue > 0 ? 'text-stock_red' : changeValue < 0 ? 'text-stock_green' : ''
		},
	},
	{
		field: 'quote_change_percent',
		headerName: '漲跌幅 (%)',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
		renderCell: (params) => {
			const value = params.value || 0
			if (value > 0) {
				return (
					<p className='flex items-center space-x-0.5 text-stock_red'>
						<ArrowDropUpIcon color='error' />
						<span>{`${value.toFixed(2)}%`}</span>
					</p>
				)
			} else if (value < 0) {
				return (
					<p className='flex items-center space-x-0.5 text-stock_green'>
						<ArrowDropDownIcon color='success' />
						<span>{`${Math.abs(value.toFixed(2))}%`}</span>
					</p>
				)
			} else return `${value.toFixed(2)}%`
		},
	},
	{
		field: 'week_quote_change_percent',
		headerName: '週漲跌幅(％)',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
		renderCell: (params) => {
			const value = params.value || 0
			if (value > 0) {
				return (
					<p className='flex items-center space-x-0.5 text-stock_red'>
						<ArrowDropUpIcon color='error' />
						<span>{`${value.toFixed(2)}%`}</span>
					</p>
				)
			} else if (value < 0) {
				return (
					<p className='flex items-center space-x-0.5 text-stock_green'>
						<ArrowDropDownIcon color='success' />
						<span>{`${Math.abs(value.toFixed(2))}%`}</span>
					</p>
				)
			} else return `${value.toFixed(2)}%`
		},
	},
	{
		field: 'volume',
		headerName: '交易量',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
		valueFormatter: (params) => {
			const volume = params.value || 0
			return volume.toLocaleString()
		},
	},
	{
		field: 'correlation',
		headerName: '相關係數',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
		valueFormatter: (params) => `${params.value.toFixed(2)}`,
	},
	{
		field: 'predict_change_percent',
		headerName: '預測漲跌率(％)',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
		renderCell: (params) => {
			const value = params.value || 0
			if (value > 0) {
				return (
					<p className='flex items-center space-x-0.5 text-stock_red'>
						<ArrowDropUpIcon color='error' />
						<span>{`${value.toFixed(2)}%`}</span>
					</p>
				)
			} else if (value < 0) {
				return (
					<p className='flex items-center space-x-0.5 text-stock_green'>
						<ArrowDropDownIcon color='success' />
						<span>{`${Math.abs(value.toFixed(2))}%`}</span>
					</p>
				)
			} else return `${value.toFixed(2)}%`
		},
	},
]

export default function Result() {
	const { data: session } = useSession()
	const token = session?.token

	const router = useRouter()
	const { industry } = router.query

	const [isLoading, setIsLoading] = useState(true)
	const [laternDialogOpen, setLaternDialogOpen] = useState(false)
	const [resultSavedAlertOpen, setResultSavedAlertOpen] = useState(false)
	const [rowIds, setRowIds] = useState([])

	const handleLaternDialog = () => setLaternDialogOpen(!laternDialogOpen)
	const handleResultSave = () => setResultSavedAlertOpen(true) // 🚩 後端：需要把點燈紀錄存給使用者
	const handleSavedAlertClose = () => setResultSavedAlertOpen(false)

	// 需要針對該產業別的所有個股進行分析，並挑選出來五檔。
	const getStocksByIndustry = async () => {
		setIsLoading(true)

		try {
			const response = await fetch(`${process.env.DB_URL}/api/user/all/industry/stock`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
			})
			const data = await response.json()
			const stocks = data.data.filter((stock) => stock.industry === industry)[0].data // 該產業底下所有個股
			console.log(industry, stocks)

			if (data.success) setIsLoading(false)
		} catch (error) {
			console.error('error', error)
		}
	}

	useEffect(() => {
		getStocksByIndustry()
	}, [industry])

	useEffect(() => {
		if (!session) router.push('/login')
	}, [session])

	return (
		<StarryBackground className={'pt-8 pb-12 md:pt-12 md:pb-20'}>
			<Breadcrumbs prevPage='我要點燈' prevPageLink='/light' curPage='分析結果' />
			<PrayerCard handleNextDialog={handleLaternDialog} />
			<Dialog open={laternDialogOpen} maxWidth='lg' fullWidth>
				<DialogTitle className='mt-4 mb-8 text-2xl text-center'>本日光明燈 － {industry}股</DialogTitle>
				<DialogContent className='flex-col overflow-x-scroll text-center flex-center-between h-88 dark:text-zinc-100'>
					<div className='text-black flex-center'>
						{['台泥', '聯發科', '台積電', '長榮', '華南金'].map((stock, index) => (
							<div>
								<div className='mb-5 lantern lanterntag_container animate-none' key={index}>
									<div className='laternlight'></div>
									<div className='rounded-t-lg left rounded-b-md'></div>
									<div className='rounded-t-lg right rounded-b-md' style={{ writingMode: 'vertical-lr' }}></div>
									<div className='lantern-flame'></div>
									<div className='absolute inset-x-0 top-10 right-6'></div>
								</div>
								<h3 className='font-semibold tracking-widest'>{stock}</h3>
							</div>
						))}
					</div>
					<SubmitBtn
						text='查看分析結果'
						handleSubmit={() => setLaternDialogOpen(!laternDialogOpen)}
						style='my-4 py-2.5'
					/>
				</DialogContent>
			</Dialog>
			<div className='px-4 pt-6 pb-12 bg-white rounded sm:px-8 lg:px-10 dark:bg-zinc-900/50'>
				<div className='inline-flex items-start justify-between w-full'>
					<h3 className='inline-flex items-end mb-6 tracking-wider'>
						天氣型態<span className='ml-2 text-sm opacity-60'>{getCurrentDate()}</span>
					</h3>
				</div>
				{/* 傳入分析出的五檔股票 */}
				<Chart option={multiLineOption()} customHeight={'h-72 sm:h-80 md:h-88 lg:h-96 xl:h-[520px]'} />
				<DataGrid
					sx={{
						my: 4,
						mb: 2,
						pl: 2,
						pr: 3,
						pt: 0.5,
						pb: 1,
						'& .css-1iyq7zh-MuiDataGrid-columnHeaders, & .MuiDataGrid-withBorderColor': {
							borderBottomWidth: '0.75px',
							borderColor: '#71717a',
						},
						'& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
							outline: 'none',
						},
						'& .css-i4bv87-MuiSvgIcon-root': {
							color: '#a1a1aa',
						},
						'& .css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root': {
							color: '#40B4FF',
						},
					}}
					rows={[
						{
							id: 1,
							stock_id: '1101',
							stock_name: '台泥',
							price: 34,
							quote_change_percent: 2.26,
							week_quote_change_percent: 0.38,
							volume: 32099068,
							correlation: -0.019,
							predict_change_percent: 0.38,
						},
						{
							id: 2,
							stock_id: '2330',
							stock_name: '台積電',
							price: 532,
							quote_change_percent: 4.26,
							week_quote_change_percent: 1.124,
							volume: 32099068,
							correlation: -0.02,
							predict_change_percent: 2.543,
						},
						{
							id: 3,
							stock_id: '2603',
							stock_name: '長榮',
							price: 150.5,
							quote_change_percent: -0.33,
							week_quote_change_percent: 0.823,
							volume: 15244624,
							correlation: -0.02,
							predict_change_percent: 1.0021,
						},
						{
							id: 4,
							stock_id: '2454',
							stock_name: '聯發科',
							price: 698,
							quote_change_percent: 1.31,
							week_quote_change_percent: 3.172,
							volume: 4968629,
							correlation: 0.00125,
							predict_change_percent: -0.1211,
						},
						{
							id: 5,
							stock_id: '2880',
							stock_name: '華南金',
							price: 22.75,
							quote_change_percent: 0.952,
							week_quote_change_percent: 0.89,
							volume: 15869113,
							correlation: 0.0167,
							predict_change_percent: 1.1379,
						},
					]}
					columns={columns}
					onRowSelectionModelChange={(ids) => setRowIds(ids)}
					className='bg-white border-none dark:bg-zinc-800 dark:text-zinc-200'
					checkboxSelection
					hideFooter
					disableRowSelectionOnClick
					disableColumnMenu
				/>
				<p className='text-xs opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
				<SubmitBtn text='保存分析結果' handleSubmit={handleResultSave} style='mt-16 py-3' />
				<Snackbar open={resultSavedAlertOpen} autoHideDuration={3000} onClose={handleSavedAlertClose}>
					<Alert onClose={handleSavedAlertClose} severity='success' sx={{ width: '100%' }}>
						保存成功！
					</Alert>
				</Snackbar>
			</div>
		</StarryBackground>
	)
}
