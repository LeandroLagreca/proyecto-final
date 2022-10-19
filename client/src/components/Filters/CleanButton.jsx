import * as React from 'react';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getGames, cleanToFilter } from '../../redux/actions/videoGame';

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
      Clean
      </Button>
  );
}