import * as React from 'react';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getGames, cleanToFilter } from '../../redux/actions/videoGame';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { IconButton, Typography } from '@mui/material';

export default function DisableElevation() {
    const dispatch = useDispatch();
	const games = useSelector((state) => state.videogames.games);
	const handleClick= (e) =>{
		e.preventDefault();
		dispatch(cleanToFilter(games))
		dispatch(getGames());
	}
  return (
      <Button onClick={e=>{handleClick(e)}} variant="contained" disableElevation color={"secondary"}>
        <IconButton >
          <Typography>Reset filters</Typography>
          <RotateLeftIcon ></RotateLeftIcon>
        </IconButton>
      </Button>
  );
}