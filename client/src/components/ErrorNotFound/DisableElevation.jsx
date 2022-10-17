import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import "./DisableElevation.css"

export default function DisableElevation() {
  return (
    <Link to = "/home" className='decorationButton'>
      <Button variant="contained" disableElevation>
      Regresar
      </Button>
    </Link>
  );
}