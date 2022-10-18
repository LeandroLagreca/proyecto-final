import { Routes as Rutas, Route } from 'react-router-dom';
import useStatusChecker from './firebase/statusCheck'
import { Detail, MainHome, Landing, AdminPanel, NotFound } from './pages';



import { Footer } from './components';
import Wishes from './components/Wishes/AddtoWishes';




const Routes = () => {
	//solve conflictos
	useStatusChecker()

	return (
		<>
			<Rutas>
				<Route exact path="/" element={<Landing />} />
				<Route exact path="/home" element={<MainHome />} />
				<Route path="/detail/:id" element={<Detail />} />
				<Route path='/wishes' element={<Wishes/>} />
				<Route path='/admin/*' element={<AdminPanel/>} />
				<Route path = '*' element = {<NotFound/>}/>
			</Rutas>
			<Footer />
		</>
	);
};

export default Routes;
