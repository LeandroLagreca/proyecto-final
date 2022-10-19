import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import firebaseApp from "../../firebase/credenciales";
import { useState, useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { setSigned } from "../../redux/reducers/user";

import { Button } from "@mui/material";

const auth = getAuth(firebaseApp);

const styles = {
  link: {
    textDecoration: "none",
  },
};

export default function SessionButton() {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUser(usuarioFirebase);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <>
      {!user ? (
        <Link style={styles.link} to={"/"}>
          <Button variant="contained" color="info">
            Log In
          </Button>
        </Link>
      ) : (
        <Button variant="contained" onClick={() => {
          signOut(auth)
          dispatch(setSigned())
        }} color={"secondary"}>
          Log Out
        </Button>
      )}
    </>
  );
}
