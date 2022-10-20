import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import router from "../routes";
const {Router} = require('express');
const router = Router()

var id_token = googleUser.getAuthResponse().id_token
router.get('/google' , async(req, res) =>{
try{
// Cree la credencial de Firebase con el token de ID de Google.
const credential = GoogleAuthProvider.credential(id_token);
// Inicia sesión con credenciales de la usuaria de Google.
const auth = getAuth();
signInWithCredential(auth, credential)
res.status(200).send("Create Succesfully")
} catch(error){
  res.status(400).send("Not Create")
}
});


/*

.catch((error) => {
  // Manejar errores aquí.
    const errorCode = error.code;
    const errorMessage = error.message;
    // El correo electrónico de la cuenta de usuario utilizada.
    const email = error.customData.email;
    // El tipo AuthCredential que se utilizó.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
})
*/