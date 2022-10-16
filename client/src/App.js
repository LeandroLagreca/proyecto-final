import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import './App.css';
//editar home
//editar home
import Home from "./sections/Home";
import LandingFormSection from './sections/LandingFormSection';
import { useState } from 'react';
import firebaseApp from './firebase/credenciales';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
const auth = getAuth(firebaseApp);

function App() {
	const [user, setUser] = useState(null);
	onAuthStateChanged(auth, (usuarioFirebase)=> {
		if(usuarioFirebase){
			setUser(usuarioFirebase)
		}else {
			setUser(null)
		}
	})
	return (
		<BrowserRouter>
		{user ? <Home /> : <LandingFormSection />}
			<Routes />
		</BrowserRouter>
	);
}

export default App;