import { Routes as Rutas, Route } from 'react-router-dom';
import useStatusChecker from './firebase/statusCheck'
import { Detail, MainHome, Landing, AdminPanel, NotFound, Cart, Discounts, Account } from './pages';



import { Footer } from './components';
import Wishes from './components/Wishes/AddtoWishes';
import Purchases from './components/Purchases/Purchases';
import Sidebar from './components/Sidebar/Sidebar';
import Collection from './components/Collection/Collection';
import LandingPage from './components/Landing/LandingPage';




const Routes = ({setMode, mode}) => {
	useStatusChecker()

	return (
		<>
				{/* <Sidebar/> */}
			<Rutas>
				<Route exact path="/" element={<LandingPage/>} />
				<Route exact path="/home" element={<MainHome  />} />
				<Route path="/detail/:id" element={<Detail />} />
				<Route path='/wishes' element={<Wishes/>} />
				<Route path='/admin/*' element={<AdminPanel/>} />
				<Route path = '/cart' element = {<Cart/>}/>
				<Route path = '/purchases' element = {<Purchases/>}/>
				<Route path = '/discounts' element = {<Discounts/>}/>
				<Route path = '*' element = {<NotFound/>}/>
				<Route path = '/colection' element = {<Collection/>}/>
				<Route path = '/account/:id' element = {<Account/>}/>
			</Rutas>
			{/* <Footer /> */}
		</>
	);
};

export default Routes;
