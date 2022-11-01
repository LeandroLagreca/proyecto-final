import { useState, useEffect } from "react";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import {
	Button,
	Typography,
	Rating,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
  IconButton
} from "@mui/material";
import {StarBorder} from '@mui/icons-material/';
import { postComments } from "../../redux/actions/comment";
import { TextForm } from "..";

export default function ReviewForm({gameId, userId}) {
  const { id } = useSelector(state => state.user)
	const [loading, setLoading] = useState(true);
	const [prevReviews, setPrevReviews] = useState([]);

	const [open, setOpen] = useState(false);
  const [comment, setComment] = useState({
      text: "",
      userComment: "",
      rating_like: 3,
  });

  const dispatch = useDispatch()

  useEffect(() => {
		axios.get(`http://localhost:3001/user/comments?userID=${id}`)
		.then(response => response.data.comments.map( review => review.videogameId ))
		.then(results => setPrevReviews(results))
		.catch(() => setPrevReviews([]))
    .finally(() => setLoading(false))
	}, [id])

	const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStar = (e) => {
		const value = e.target.value
    setComment((prevData) => ({
      ...prevData,
				rating_like: value
    }));
	};

  const handleText = (text) => {
		setComment((prevData) => ({
      ...prevData,
				text
    }));
  };

  const handleSubmit = () => {
    dispatch(postComments({
      userID: userId,
      gameID: gameId,
      comment
    }))
    setComment({
        text: "",
        userComment: "",
        rating_like: 3,
    })
  } 

  if(loading || prevReviews.includes(gameId)) return <></>

  return (
    <>
      <div>
      <IconButton size='large' variant="outlined" onClick={handleClickOpen}>
        <StarBorder fontSize="large" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Valora este Juego</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deja un comentario y una valoracion según tu experiencia personal con este juego
          </DialogContentText>
          <form style={{paddingTop: 40}}>
        		<TextForm cb={handleText} value={comment.text} />
      		</form>
					<Typography sx={{paddingTop: 4}} component="legend">Rating</Typography>
      		<Rating name="rating_like" value={comment.rating_like} onChange={handleStar} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => {
            handleSubmit()
            handleClose()
          }}>
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    	</div>
    </>
  );
}
