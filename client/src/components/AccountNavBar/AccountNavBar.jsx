import React from 'react';

import {
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Divider,
	Box,
	Link,
} from '@mui/material';
import { Person, LocalMall, NotificationsActive } from '@mui/icons-material';

const AccountNavBar = () => {
	return (
		<Drawer
			PaperProps={{
				sx: { paddingTop: (theme) => theme.spacing(5), zIndex: 1 },
			}}
			anchor="left"
			open={true}
			variant="permanent"
		>
			<List sx={{ paddingTop: 3 }}>
				<Divider />
				<ListItem>
					<Link href="/account/:id/profile" underline="none">
						<ListItemButton>
							<ListItemIcon>
								<Person />
							</ListItemIcon>
							<ListItemText primary={'My Profile'} />
						</ListItemButton>
					</Link>
				</ListItem>
				<Divider />
				<ListItem>
					<Link href="/account/:id/purchases" underline="none">
						<ListItemButton>
							<ListItemIcon>
								<LocalMall />
							</ListItemIcon>
							<ListItemText primary={'My Purchased Games'} />
						</ListItemButton>
					</Link>
				</ListItem>
				<Divider />
				<ListItem>
					<Link href="/account/:id/notifications" underline="none">
						<ListItemButton>
							<ListItemIcon>
								<NotificationsActive />
							</ListItemIcon>
							<ListItemText primary={'My Notification'} />
						</ListItemButton>
					</Link>
				</ListItem>
				<Divider />
			</List>
		</Drawer>
	);
};

export default AccountNavBar;
