import React from 'react'
import { Link } from 'react-router-dom'
import firebaseApp from '../../firebase/credenciales';
import { getAuth, signOut } from 'firebase/auth';

import { Button } from '@mui/material'

const auth = getAuth(firebaseApp);

const styles = {
  link: {
    textDecoration: 'none'
  }
}

export default function SessionButton() {
  const logued = false
  return (
    <>
      {
        !logued
          ? (
            <Link style={styles.link} to={'/landing'}>
              <Button variant='contained' color='info' >Log In</Button>
            </Link>
          )
          : (
            <Button variant='contained' onClick={() => signOut(auth)}>Log Out</Button>
          )
      }
    </>
    
  )
}
