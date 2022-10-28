import React from 'react';
import { Link } from 'react-router-dom';

import {
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Divider,
	Link as MuiLink,
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
					<MuiLink component={Link} to="/account/profile" underline="none">
						<ListItemButton>
							<ListItemIcon>
								<Person />
							</ListItemIcon>
							<ListItemText primary={'My Profile'} />
						</ListItemButton>
					</MuiLink>
				</ListItem>
				<Divider />
				<ListItem>
					<MuiLink component={Link} to="/account/purchases" underline="none">
						<ListItemButton>
							<ListItemIcon>
								<LocalMall />
							</ListItemIcon>
							<ListItemText primary={'My Purchased Games'} />
						</ListItemButton>
					</MuiLink>
				</ListItem>
				<Divider />
				<ListItem>
					<MuiLink component={Link} to="/account/notifications" underline="none">
						<ListItemButton>
							<ListItemIcon>
								<NotificationsActive />
							</ListItemIcon>
							<ListItemText primary={'My Notification'} />
						</ListItemButton>
					</MuiLink>
				</ListItem>
				<Divider />
			</List>
		</Drawer>
	);
};

export default AccountNavBar;
