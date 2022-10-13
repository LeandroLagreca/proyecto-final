import { Pagination } from '@mui/material';
import { React } from 'react';

const Paginated = ({ setGamesPerPage, setPage }) => {
	const Paginated = (e, p) => {
		setGamesPerPage(5);
		setPage(p);
	};

	return (
		<div style={{ textAling: 'center', justifyContent: 'center' }}>
			<Pagination
				style={{
					display: 'flex',
					textAling: 'center',
					justifyContent: 'center',
				}}
				count={5}
				variant="outlined"
				shape="rounded"
				onChange={Paginated}
			/>
		</div>
	);
};

export default Paginated;
