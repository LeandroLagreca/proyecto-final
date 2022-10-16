import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { Container } from "@mui/system";
import firebaseApp from "../../firebase/credenciales";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link } from 'react-router-dom';

const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: 400
  },
  button: {
    marginTop: 2
  }
}

export default function LandingForm({ register }) {

  async function registarUsuario(email, password) {
    const infoUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });
    const docuRef = doc(firestore, `usuarios/${infoUser.user.uid}`);
    setDoc(docuRef, { correo: email});
  }

  function submitHandler(e) {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    console.log("submit", email, password)
    if (register) {
      registarUsuario(email, password);
    } else {
      signInWithEmailAndPassword(auth, email, password);
    }
  }

  return (
    <Container sx={styles.container}>
      <FormControl onSubmit={submitHandler}>
        <InputLabel htmlFor="email">E-mail</InputLabel>
        <Input id="email" name="email" type="email" />
      </FormControl>
      <FormControl onSubmit={submitHandler}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input id="password" name="password" type="password" />
      <Button sx={styles.button} onClick={submitHandler} variant="outlined">
        {
          register 
            ? "registrate" 
            : "iniciar sesion"
          }
      </Button>
      <Link to ='/Home'>
          <Button>invitado</Button>
          </Link>
          </FormControl>
    </Container>
  );
}
