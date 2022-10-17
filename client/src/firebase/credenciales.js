// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Añade aquí tus credenciales
const firebaseConfig = {
    apiKey: "AIzaSyBXQ1-B6JsYM0DdbVk67oq4K2BfyzTKW9c",
    authDomain: "steam-d5a8d.firebaseapp.com",
    projectId: "steam-d5a8d",
    storageBucket: "steam-d5a8d.appspot.com",
    messagingSenderId: "162172861178",
    appId: "1:162172861178:web:768b65eb8b1fa3809c6743"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export const auth = getAuth(firebaseApp);
export default firebaseApp;