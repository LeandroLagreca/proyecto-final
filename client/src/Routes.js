import { Routes as Rutas, Route } from 'react-router-dom';
import useStatusChecker from './firebase/statusCheck'
import { Detail, MainHome, Landing, AdminPanel, NotFound, Cart, Discounts, Account } from './pages';



import { Footer } from './components';
import Wishes from './components/Wishes/AddtoWishes';
import Purchases from './components/Purchases/Purchases';
import Sidebar from './components/Sidebar/Sidebar';
import Collection from './components/Collection/Collection';
import LandingPage from './components/Landing/LandingPage';




<<<<<<< HEAD
const Routes = () => {
	//solve conflictos
	const dispatch = useDispatch()
=======
const Routes = ({setMode, mode}) => {
>>>>>>> 5835e6eea57744f7f3243e5ec89c07ded222dc11
	useStatusChecker()

	return (
		<>
				<Sidebar/>
			<Rutas>
				<Route exact path="/" element={<Landing />} />
				<Route exact path="/home" element={<MainHome  />} />
				<Route path="/detail/:id" element={<Detail />} />
				<Route path='/wishes' element={<Wishes/>} />
				<Route path='/admin/*' element={<AdminPanel/>} />
				<Route path = '/cart' element = {<Cart/>}/>
				<Route path = '/purchases' element = {<Purchases/>}/>
				<Route path = '/discounts' element = {<Discounts/>}/>
				<Route path = '*' element = {<NotFound/>}/>
				<Route path = '/colection' element = {<Collection/>}/>
<<<<<<< HEAD
				<Route path = "/landing123" element = {<LandingPage/>} />
=======
				<Route path = '/account/:id' element = {<Account/>}/>
>>>>>>> 5835e6eea57744f7f3243e5ec89c07ded222dc11
			</Rutas>
			<Footer />
		</>
	);
};

export default Routes;
