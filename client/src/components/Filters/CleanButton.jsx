import * as React from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { cleanToFilter } from '../../redux/actions/videoGame';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { IconButton, Typography } from '@mui/material';

export default function DisableElevation() {
    const dispatch = useDispatch();
	const handleClick= (e) =>{
		e.preventDefault();
		dispatch(cleanToFilter())
	}
  return (
      <Button onClick={e=>{handleClick(e)}} variant="contained" disableElevation color={"secondary"}>
        <IconButton >
          <Typography color={"primary"} >Reset filters</Typography>
          <RotateLeftIcon ></RotateLeftIcon>
        </IconButton>
      </Button>
  );
}