import React, { useEffect } from 'react';

import { AccountNavBar, Footer, Loader } from '../components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AdminContainer } from '../containers';
import { MyProfile, MyPurchases, MyNotifications, MyOrders } from '../components';
import { MyQuestions } from '../pages'
import Sidebar from '../components/Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { putUserData } from '../redux/actions/user';

const paths = {
	profile: '/profile',
	purchases: '/purchases',
	notifications: '/notifications',
	questions: '/questions',
	orders: '/orders'
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
				<Route path={paths.questions} element={<MyQuestions />} />
				<Route path={paths.orders} element={<MyOrders />} />
			</Routes>
			<Footer></Footer>
		</AdminContainer>
	);
};

export default Account;
