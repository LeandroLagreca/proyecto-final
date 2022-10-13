// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";


// Añade aquí tus credenciales
const firebaseConfig = {
    apiKey: "AIzaSyAXW2QXwhBokxzxtz33ukECys0dea6Iy_Y",
    authDomain: "steam-7cf48.firebaseapp.com",
    projectId: "steam-7cf48",
    storageBucket: "steam-7cf48.appspot.com",
    messagingSenderId: "246844741287",
    appId: "1:246844741287:web:6f8f0b14e5c05e3931ed82"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;