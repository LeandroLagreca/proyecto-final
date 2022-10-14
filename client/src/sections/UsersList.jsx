import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, ButtonGroup, Divider, IconButton, Input, List, ListItem, Typography } from '@mui/material'
import { Edit } from '@mui/icons-material';

const styles = {
	item: {
		display: 'flex',
		alignItems: 'flex-start',
		gap: 4,
		width: 100
	}
}

export default function UsersList() {
	// const users = useSelector(state => state.admin.user)
	const users = [
		{
			username: 'Userjuju',
			mail: 'ola2@gmail.com',
			admin: 'true'
		},
		{
			username: 'asldkjasd',
			mail: 'ola@gmail.com',
			admin: 'false'
		}
	]
  const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(getUsers())
	// }, [dispatch])

	function UserItem({field, data}) {
		const [ change, setChange ] = useState(false)

		function handleChange() {
			setChange(prev => !prev)
		}

		return (
			<Box width={400}>
				<Typography variant='h5'>
					{field}:
				</Typography>
				<Box display={'flex'} justifyContent={'space-between'}>
					{
						!change
							? (
								<Typography variant='body1'>
									{data}
								</Typography>
							)
							: (
								<Input type="text" placeholder={data} />
							)
					}
					{
						!change
							? (
								<IconButton onClick={handleChange}>
									<Edit />
								</IconButton>
							)
							:
							<ButtonGroup>
								<Button onClick={handleChange}>Cancelar</Button>
								<Button>Guardar</Button>
							</ButtonGroup>
					}
					
				</Box>
			</Box>
		)
	}

  return <List>
		{
			users.map(user => (
				<>
					<ListItem sx={styles.item} >
						<Box>
							<UserItem field={'Username'} data={user.username} />
						</Box>
						<Box>
							<UserItem field={'Email'} data={user.mail} />
						</Box>
						<Box>
							<UserItem field={'Admin'} data={user.admin} />
						</Box>
					</ListItem>
					<Divider />
				</>
			))
		}
	</List>;
}
