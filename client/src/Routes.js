import { Routes as Rutas, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStatusChecker from './firebase/statusCheck';
import { getDiscounts } from './redux/actions/videoGame';
import {
	Detail,
	MainHome,
	Landing,
	AdminPanel,
	NotFound,
	Cart,
	Discounts,
	Account,
} from './pages';

import { Footer } from './components';
import Wishes from './components/Wishes/AddtoWishes';
import Purchases from './components/Purchases/Purchases';
import Sidebar from './components/Sidebar/Sidebar';
import Collection from './components/Collection/Collection';

const Routes = ({ setMode, mode }) => {
	//solve conflictos
	const dispatch = useDispatch();
	useStatusChecker();
	dispatch(getDiscounts());

	return (
		<>
			<Sidebar />
			<Rutas>
				<Route exact path="/" element={<Landing />} />
				<Route exact path="/home" element={<MainHome />} />
				<Route path="/detail/:id" element={<Detail />} />
				<Route path="/wishes" element={<Wishes />} />
				<Route path="/admin/*" element={<AdminPanel />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/purchases" element={<Purchases />} />
				<Route path="/discounts" element={<Discounts />} />
				<Route path="*" element={<NotFound />} />
				<Route path="/colection" element={<Collection />} />
				<Route path="/account/*" element={<Account />} />
			</Rutas>
			<Footer />
		</>
	);
};

export default Routes;
