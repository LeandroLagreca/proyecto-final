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
    Link
} from '@mui/material';

import { Person, LocalMall, NotificationsActive } from '@mui/icons-material';

const Account = () => {
	return (
		<Box sx={{ display: 'flex' }}>
			<Drawer
				variant="permanent"
				open={true}
				anchor="left"
				PaperProps={{ sx: { marginTop: '103px' } }}
				sx={{
					width: 240,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: 240,
						boxSizing: 'border-box',
					},
				}}
			>
				<Box sx={{ overflow: 'auto' }}>
					<List sx={{ paddingTop: 3 }}>
						<Divider />
						<ListItem>
							<Link href="/" underline='none'>
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
							<Link href="/" underline='none'>
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
							<Link href="/" underline='none'>
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
				</Box>
			</Drawer>
			<Box>Box</Box>
		</Box>
	);
};

export default Account;
