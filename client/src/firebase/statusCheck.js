import { useState } from "react";
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./credenciales";

import { setSigned } from '../redux/reducers/user'

export default function useStatusChecker() {
	const [ user, setUser ] = useState()
	const dispatch = useDispatch()

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUser(usuarioFirebase);
    } else {
      setUser(null);
    }
  });

	if(user) {
		dispatch(setSigned())
	}

  return user
}
