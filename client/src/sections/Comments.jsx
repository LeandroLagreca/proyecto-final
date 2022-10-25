import React from 'react';
import { Avatar, Grid, Paper, Rating, Typography } from '@mui/material';
import { getComments } from '../redux/actions/comment';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Comments.css';
const parse = require('html-react-parser');
const imgLink = 'Url de imagen de usuario';

export default function Comments() {
	const gameComment = useSelector((state) => state.videogames.comments);
	const dispatch = useDispatch();
	let { id } = useParams();

	useEffect(() => {
	}, [gameComment.comments]);

	return (
		<div style={{ padding: 0 }} className="Comments">
			<h1>Reviews</h1>
			{Array.isArray(gameComment.comments)
				? gameComment.comments.map((c) => {
						return (
							<Paper
								elevation={4}
								style={{ padding: '40px 20px', margin: '20px' }}
								key={c.id}
							>
								<Grid container wrap="nowrap" spacing={2}>
									<Grid item>
										{/* Traer Imagen del usuario  // poner en alt nombreUsuario */}
										<Avatar alt={c.userComment} src={imgLink} />
									</Grid>
									<Grid justifyContent="left" item xs zeroMinWidth>
										{/* Traer Nombre del usuario */}
										<h4 style={{ margin: 0, textAlign: 'left' }}>
											{c.userComment}
										</h4>
										<Typography
											style={{ textAlign: 'right' }}
											component="legend"
										>
											Rating
										</Typography>
										<Rating
											style={{ float: 'right' }}
											name="read-only"
											value={c.rating_like}
											readOnly
										/>
										{/* Traer Texto o comment del usuario */}
										<p style={{ textAlign: 'left' }}>{parse(c.text)}</p>
										{/* Traer cuando se hizo el comment */}
										<p style={{ textAlign: 'left', color: 'gray' }}>
											posted {c.createdAt}
										</p>
									</Grid>
								</Grid>
							</Paper>
						);
				  })
				: null}
		</div>
	);
}
