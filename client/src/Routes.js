import { Routes as Rutas, Route } from 'react-router-dom';
import useStatusChecker from './firebase/statusCheck'
import { Detail, MainHome, Landing, AdminPanel, NotFound, Cart } from './pages';



import { Footer } from './components';
import Wishes from './components/Wishes/AddtoWishes';
import Purchases from './components/Purchases/Purchases';
import Sidebar from './components/Sidebar/Sidebar';
import Collection from './components/Collection/Collection';




const Routes = ({setMode, mode}) => {
	//solve conflictos
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
				<Route path = '*' element = {<NotFound/>}/>
				<Route path = '/cart' element = {<Cart/>}/>
				<Route path = '/purchases' element = {<Purchases/>}/>
				<Route path = '/colection' element = {<Collection/>}/>
			</Rutas>
			<Footer />
		</>
	);
};

export default Routes;
