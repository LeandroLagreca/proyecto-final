import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import firebaseApp from "../../firebase/credenciales";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setRole } from "../../redux/reducers/user";
import Swal from "sweetalert2";
import { setSigned } from "../../redux/reducers/user";

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
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const newUserData = {
      id: user.uid,
      email,
      password,
      admin: false,
    };
    // await axios.post("http://localhost:3000/register", newUserData);
    setRegister(false);

    const docuRef = doc(firestore, `usuarios/${user.uid}`);
    setDoc(docuRef, { correo: email });
  }

  async function submitHandler(e) {
    e.preventDefault();
    const email = userInfo.email;
    const password = userInfo.password;

    if (register) {
      try {
        await registarUsuario(email, password);
      } catch (error) {
        Swal.fire({
          text:"Could not register correctly", 
          icon:"error"
        });
      }
    } else {
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (user) {
          console.log(user);
          // aca disparo una accion que pida la info del usuario con la uid correspondiente
          // y setee la info necesaria en redux
          dispatch(setSigned());
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
        <InputLabel variant="outlined" htmlFor="email">
          E-mail
        </InputLabel>
        <OutlinedInput
          label="E-mail"
          onChange={handleChange}
          id="email"
          name="email"
          value={userInfo.email}
          type="email"
        />
      </FormControl>
      <FormControl>
        <InputLabel variant="outlined" htmlFor="password">
          Password
        </InputLabel>
        <OutlinedInput
          onChange={handleChange}
          id="password"
          name="password"
          value={userInfo.password}
          type="password"
          label="Password"
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
