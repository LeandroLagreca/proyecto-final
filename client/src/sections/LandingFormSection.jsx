import { useState } from 'react';
import { Container } from '@mui/system';
import { LandingForm } from '../components';
import { Button, Typography } from '@mui/material';

const styles = {
	container: {
		width: 'max-content',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 2,
		padding: 4,
	},
	button: {
		width: 'max-content',
	},
};

export default function LandingFormSection() {
	const [register, setRegister] = useState(false);
	return (
		<Container sx={styles.container}>
			{/* <Typography variant="h3">
				{register ? 'Registrate' : 'Iniciar Sesion'}{' '}
			</Typography> */}
			<LandingForm register={register} setRegister={setRegister} />
			{/* <Button sx={styles.button} onClick={() => setRegister(!register)}>
				{register ? 'ya tengo una cuenta' : 'quiero registrarme'}
			</Button> */}
		</Container>
	);
}
