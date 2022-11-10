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
	QuestionMark,
	ConfirmationNumber,
} from '@mui/icons-material';

import { images } from '../../assets';

import { useSelector, useDispatch } from 'react-redux';
import { putUserData } from '../../redux/actions/user';

const AccountNavBar = () => {
	const userData = useSelector((state) => state.user.userData);
	const dispatch = useDispatch();

	const [profile, setProfile] = React.useState({
		file: '',
		base64URL: '',
	});

	React.useEffect(() => {
	}, [profile]);

	const convertBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				resolve(fileReader.result);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		setProfile({ ...profile, file: file });

		convertBase64(file)
			.then((result) => {
				setProfile({ ...profile, base64URL: result });
				dispatch(putUserData(userData.id, { image: result }));
			})
			.catch((error) => {
			});

	};

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
								<input
									hidden
									accept="image/*"
									type="file"
									onChange={handleFileInputChange}
								/>
								<PhotoCamera sx={{ width: 50, height: 50 }} />
							</IconButton>
						}
					>
						{userData.image === '' ? (
							<Avatar
								sx={{ width: 200, height: 200 }}
								alt="Travis Howard"
								src={images.avatar}
							/>
						) : (
							<Avatar
								sx={{ width: 200, height: 200 }}
								alt="Travis Howard"
								src={userData.image}
							/>
						)}
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
				<ListItem>
					<MuiLink component={Link} to="/account/questions" underline="none">
						<ListItemButton>
							<ListItemIcon>
								<QuestionMark />
							</ListItemIcon>
							<ListItemText primary={'My Questions'} />
						</ListItemButton>
					</MuiLink>
				</ListItem>
				<Divider />
				<ListItem>
					<MuiLink component={Link} to="/account/orders" underline="none">
						<ListItemButton>
							<ListItemIcon>
								<ConfirmationNumber />
							</ListItemIcon>
							<ListItemText primary={'My Orders'} />
						</ListItemButton>
					</MuiLink>
				</ListItem>
				<Divider />
			</List>
		</Drawer>
	);
};

export default AccountNavBar;
