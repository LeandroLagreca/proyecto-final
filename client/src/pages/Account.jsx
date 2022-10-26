import React from 'react';

import { AccountNavBar, Loader } from '../components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AdminContainer } from '../containers';
import { MyProfile, MyPurchases, MyNotifications } from '../components';

const paths = {
	profile: '/profile',
	purchases: '/purchases',
	notifications: '/notifications',
};

const Account = () => {
	return (
		<AdminContainer>
			<AccountNavBar />
			<Routes>
				<Route path={paths.profile} element={<MyProfile />} />
				<Route path={paths.purchases} element={<MyPurchases />} />
				<Route path={paths.notifications} element={<MyNotifications />} />
			</Routes>
		</AdminContainer>
	);
};

export default Account;
