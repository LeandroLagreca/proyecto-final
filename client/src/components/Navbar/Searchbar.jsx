import React from 'react';
import { InputBase, alpha } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { filterBySearch } from '../../redux/reducers/videoGame';
// import { setFilterBySearch } from '../../redux/actions/videoGame';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '60ch',
		},
	},
}));

const Searchbar = ({ setInput, input }) => {
	const dispatch = useDispatch();
	const {name} = useSelector(state => state.videogames.filters)

	const handleInputChange = (e) => {
		setInput(e.target.value);
		dispatch(filterBySearch(e.target.value));
	};

	return (
		<>
			<Search>
				<SearchIconWrapper>
					<SearchIcon />
				</SearchIconWrapper>
				<StyledInputBase
					value={name}
					onChange={handleInputChange}
					placeholder="Search…"
					inputProps={{ 'aria-label': 'search' }}
				/>
			</Search>
		</>
	);
};

export default Searchbar;
