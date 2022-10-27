import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  InputAdornment,
  Link as MuiLink,
} from "@mui/material";
import { Check, PriorityHigh } from "@mui/icons-material";
import { auth } from "../../firebase/credenciales";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import Swal from "sweetalert2";
import validation from "./validations";
import { getUserInfo } from "../../redux/actions/user";
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
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const check = validation(userInfo);
    setErrors(check);
  }, [userInfo]);

  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function registarUsuario(email, password) {
    const localCart = localStorage.getItem("cartList");
    const prevCart = localCart ? JSON.parse(localCart) : [];
    const newUserData = {
      email,
      password,
      prevCart,
    };
    await axios.post("http://localhost:3001/register", newUserData);
    setRegister(false);
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
          text: "Email already in use",
          icon: "error",
        });
      }
    } else {
      dispatch(getUserInfo(email, true))
      .then(async (info) => {
        if (!info) {
          return Swal.fire({
            text: "No estas registrado",
            icon: "error",
          });
        } else {
          try {
            const { user } = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            if (user) {
              navigate("/home");
            }
          } catch (error) {
            Swal.fire({
              text: "Credenciales invalidas",
              icon: "error",
            });
          }
        }
      });
    }
  }
  async function handleReset(email) {
    const actionCodeSettings = {
      url: "http://localhost:3000/",
      handleCodeInApp: true,
    };
    sendPasswordResetEmail(auth, (email = userInfo.email), actionCodeSettings);
  }
  async function handleGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
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
        {register ? (
          <>
            <FormHelperText variant="outlined">
              {errors?.emailRequired ? (
                <PriorityHigh color="warning" />
              ) : (
                <Check color="success" />
              )}
              Es requerido
            </FormHelperText>
            <FormHelperText variant="outlined">
              {errors?.emailFormat ? (
                <PriorityHigh color="warning" />
              ) : (
                <Check color="success" />
              )}
              Debe tener formato de email
            </FormHelperText>
          </>
        ) : (
          <></>
        )}
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
          <InputAdornment position="end">Show</InputAdornment>
        </OutlinedInput>
<<<<<<< HEAD
        {
          register ? (
            <>
              <FormHelperText variant="outlined" >
                {errors?.passRequired ? <PriorityHigh color="warning" /> : <Check color="success" /> }
                Es requerido
              </FormHelperText>
              <FormHelperText variant="outlined" >
                {errors?.passFormat ? <PriorityHigh color="warning" /> : <Check color="success" /> }
                Debe tener entre 6 y 14 caracters, al menos un digito, una minuscula y una mayuscula
              </FormHelperText>
            </>
          ) : (
            <></>
          )
        }
        {
          register && Object.keys(errors).length ? (
            <></>
          ) : (
            <Button type="submit" sx={styles.button} variant="outlined">
              {register ? "registrate" : "iniciar sesion"}
            </Button>
          )
        }
        <Link to="/home">
          <Button color="secondary">invitado</Button>
        </Link>
        <Button color="secondary" onClick={handleReset}>Reset password</Button>
        <Button color="secondary" onClick={handleGoogle}>Inicia con Google</Button>
=======
        {register ? (
          <>
            <FormHelperText variant="outlined">
              {errors?.passRequired ? (
                <PriorityHigh color="warning" />
              ) : (
                <Check color="success" />
              )}
              Es requerido
            </FormHelperText>
            <FormHelperText variant="outlined">
              {errors?.passFormat ? (
                <PriorityHigh color="warning" />
              ) : (
                <Check color="success" />
              )}
              Debe tener entre 6 y 14 caracters, al menos un digito, una
              minuscula y una mayuscula
            </FormHelperText>
          </>
        ) : (
          <></>
        )}
        {register && Object.keys(errors).length ? (
          <></>
        ) : (
          <Button type="submit" sx={styles.button} variant="outlined">
            {register ? "registrate" : "iniciar sesion"}
          </Button>
        )}
        <MuiLink component={Link} to="/home" underline="none">
          <Button>invitado</Button>
        </MuiLink>
        <Button onClick={handleReset}>Reset password</Button>
        <Button onClick={handleGoogle}>Inicia con Google</Button>
>>>>>>> 5835e6eea57744f7f3243e5ec89c07ded222dc11
      </FormControl>
    </Box>
  );
}
