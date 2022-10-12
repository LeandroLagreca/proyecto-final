import { BrowserRouter, Route } from 'react-router-dom';
import Routes from './Routes';
import './App.css';
//editar home
import Home from './home';
import Detail from "./pages/Detail";
import Login from './screens/Login';
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
		{user ? <Home /> : <Login />}
			<Routes />
		</BrowserRouter>
	);
}

export default App;
