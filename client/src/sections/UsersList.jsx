import { useEffect } from "react";
import axios from 'axios'
import { Divider, List, ListItem } from '@mui/material'


import { UserItem } from "../components";

const styles = {
	item: {
		display: 'flex',
		alignItems: 'flex-start',
		gap: 4,
		width: 100
	}
}

export default function UsersList() {
	// const [ users, setUsers ] = useState([])
	const users = [
		{
			id: 1,
			username: 'Userjuju',
			email: 'ola2@gmail.com',
			admin: 'true'
		},
		{
			id: 2,
			username: 'asldkjasd',
			email: 'ola@gmail.com',
			admin: 'false'
		}
	]

  

	async function getUsers() {
		const users = await axios.get('http://localhost:3001/user')
		// setUsers(users)
	}

	useEffect(() => {
		getUsers()
	}, [])

  return <List>
		{
			users.map(user => (
				<>
					<ListItem sx={styles.item} >
						<UserItem username={user.username} email={user.email} admin={user.admin} id={user.id} />
					</ListItem>
					<Divider />
				</>
			))
		}
	</List>;
}
