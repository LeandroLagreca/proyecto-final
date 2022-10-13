import { useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { Container } from "@mui/system";
import firebaseApp from "../../firebase/credenciales";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

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
    e.prevetDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    if (register) {
      registarUsuario(email, password);
    } else {
      signInWithEmailAndPassword(auth, email, password);
    }
  }

  return (
    <Container sx={styles.container}>
      <FormControl>
        <InputLabel htmlFor="email">E-mail</InputLabel>
        <Input id="email" name="email" type="email" />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input id="password" name="password" type="password" />
      </FormControl>
      <Button sx={styles.button} onClick={submitHandler} variant="outlined">
        {
          register 
            ? "registrate" 
            : "iniciar sesion"
        }
      </Button>
    </Container>
  );
}
