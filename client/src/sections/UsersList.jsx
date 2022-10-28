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

export default function UsersList({users}) {

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
