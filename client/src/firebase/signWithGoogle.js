import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import axios from 'axios'

export default async function signWithGoogle(auth) {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
  getRedirectResult(auth)
  .then((result) => {
    const user = result.user
    const { email, displayName, uid, photoURL, emailVerified  } = user
    console.log(user)
    axios.post('http://localhost:3001/login?google=true', {
        id: uid,
        email,
        name: displayName,
        image: photoURL,
        emailVerified,
        password: Math.random() * 1209847 + 'secretoGameScript'
    })
  });
}
