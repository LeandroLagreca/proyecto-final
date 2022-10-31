import React, { useEffect } from 'react';

import { AccountNavBar, Footer, Loader } from '../components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AdminContainer } from '../containers';
import { MyProfile, MyPurchases, MyNotifications } from '../components';
import Sidebar from '../components/Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { putUserData } from '../redux/actions/user';

const paths = {
	profile: '/profile',
	purchases: '/purchases',
	notifications: '/notifications',
};

const Account = () => {

	return (
		<AdminContainer>
			<Sidebar></Sidebar>
			<AccountNavBar />
			<Routes>
				<Route path={paths.profile} element={<MyProfile />} />
				<Route path={paths.purchases} element={<MyPurchases />} />
				<Route path={paths.notifications} element={<MyNotifications />} />
			</Routes>
			<Footer></Footer>
		</AdminContainer>
	);
};

export default Account;
