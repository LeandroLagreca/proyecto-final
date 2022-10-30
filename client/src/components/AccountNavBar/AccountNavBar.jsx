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
	Stack,
	Badge,
	IconButton,
	Avatar,
	Link as MuiLink,
} from '@mui/material';
import {
	Person,
	LocalMall,
	NotificationsActive,
	PhotoCamera,
} from '@mui/icons-material';

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
				<Stack
					direction="row"
					spacing={1}
					justifyContent="center"
					alignItems="center"
					sx={{ padding: 5 }}
				>
					<Badge
						overlap="circular"
						anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
						badgeContent={
							<IconButton
								color="primary"
								aria-label="upload picture"
								component="label"
							>
								<input hidden accept="image/*" type="file" />
								<PhotoCamera sx={{ width: 50, height: 50 }} />
							</IconButton>
						}
					>
						<Avatar
							sx={{ width: 200, height: 200 }}
							alt="Travis Howard"
							src="https://learn.microsoft.com/en-us/answers/storage/attachments/209536-360-f-364211147-1qglvxv1tcq0ohz3fawufrtonzz8nq3e.jpg"
						/>
					</Badge>
				</Stack>
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
					<MuiLink
						component={Link}
						to="/account/notifications"
						underline="none"
					>
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
