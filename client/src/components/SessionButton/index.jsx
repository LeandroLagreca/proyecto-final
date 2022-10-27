import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import firebaseApp from "../../firebase/credenciales";
import { getAuth, signOut} from "firebase/auth";
import { setSigned } from "../../redux/reducers/user";

import { Button } from "@mui/material";

const auth = getAuth(firebaseApp);

const styles = {
  link: {
    textDecoration: "none",
  },
};

export default function SessionButton() {
  const sessionStatus = useSelector(state => state.user.status)
  const dispatch = useDispatch()

  return (
    <>
      {sessionStatus !== 'logged' ? (
        <Link style={styles.link} to={"/"}>
          <Button variant="contained" sx={{minWidth: 80}} size="small" color="info">
            Log In
          </Button>
        </Link>
      ) : (
        <Button size="small" variant="text" sx={{minWidth: 80}} onClick={() => {
          signOut(auth)
          dispatch(setSigned('guest'))
        }} color={"secondary"}>
          Log Out
        </Button>
      )}
    </>
  );
}
