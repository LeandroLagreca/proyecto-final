import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";


var id_token = googleUser.getAuthResponse().id_token


// Cree la credencial de Firebase con el token de ID de Google.
const credential = GoogleAuthProvider.credential(id_token);


// Inicia sesión con credenciales de la usuaria de Google.
const auth = getAuth();
signInWithCredential(auth, credential).catch((error) => {
  // Manejar errores aquí.
    const errorCode = error.code;
    const errorMessage = error.message;
    // El correo electrónico de la cuenta de usuario utilizada.
    const email = error.customData.email;
    // El tipo AuthCredential que se utilizó.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
});