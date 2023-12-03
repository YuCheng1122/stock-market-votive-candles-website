import { FormControl, MenuItem, Select } from '@mui/material'

export default function SelectMenu({ data, value, onChange, minWidth = 80 }) {
	return (
		<FormControl sx={{ minWidth: minWidth }} size='small'>
			<Select
				value={value || data[0]}
				onChange={onChange}
				className='text-sm font-medium'
				sx={{
					'.MuiOutlinedInput-notchedOutline': {
						borderStyle: 'none',
					},
					'&:hover .MuiOutlinedInput-notchedOutline': {
						borderStyle: 'none',
					},
				}}
				inputProps={{
					classes: {
						icon: 'dark:text-zinc-100',
					},
				}}
				displayEmpty
			>
				{data.map((value) => (
					<MenuItem value={value} key={value}>
						{value}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}
