import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Button, FormControl, Input, OutlinedInput, FilledInput, InputLabel, InputAdornment } from "@mui/material";
import firebaseApp from "../../firebase/credenciales";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setRole } from "../../redux/reducers/user";
import Swal from "sweetalert2";

const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: 400,
  },
  button: {
    marginTop: 2,
  },
};

export default function LandingForm({ register, setRegister }) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function registarUsuario(email, password) {
    const infoUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });
    const docuRef = doc(firestore, `usuarios/${infoUser.user.uid}`);
    setDoc(docuRef, { correo: email });
  }

  async function submitHandler(e) {
    e.preventDefault();
    const email = userInfo.email;
    const password = userInfo.password;

    if (register) {
      try {
        await registarUsuario(email, password);
        setRegister(false);
      } catch (error) {
        Swal.fire({
          text:"Could not register correctly", 
          icon:"error"
        });
      }
    } else {
      try {
        const status = await signInWithEmailAndPassword(auth, email, password);
        if (status) {
          console.log(status.user);
          dispatch(setRole("client"));
          navigate("/home");
        }
      } catch (error) {
        Swal.fire({
          text:"You need to register", 
          icon:"error"
        });
      }
    }
  }

  return (
    <Box component={"form"} onSubmit={submitHandler} sx={styles.container}>
      <FormControl>
        <InputLabel variant="outlined" htmlFor="email">E-mail</InputLabel>
        <OutlinedInput
          label='E-mail'
          onChange={handleChange}
          id="email"
          name="email"
          value={userInfo.email}
          type="email"
        />
      </FormControl>
      <FormControl>
        <InputLabel variant="outlined" htmlFor="password">Password</InputLabel>
        <OutlinedInput
          onChange={handleChange}
          id="password"
          name="password"
          value={userInfo.password}
          type="password"
          label='Password'
        >
          <InputAdornment position="right">Show</InputAdornment>
        </OutlinedInput>
        <Button type="submit" sx={styles.button} variant="outlined">
          {register ? "registrate" : "iniciar sesion"}
        </Button>
        <Link to="/home">
          <Button>invitado</Button>
        </Link>
      </FormControl>
    </Box>
  );
}
