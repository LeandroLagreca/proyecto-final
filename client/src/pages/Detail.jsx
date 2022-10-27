import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddToWishes, Loader, AddToCartButton } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/reducers/videoGame';
import { getDetails } from '../redux/actions/videoGame';
import { getUserComments } from '../redux/actions/user';
import Carousel from 'react-material-ui-carousel';
import LinkIcon from '@mui/icons-material/Link';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import DisableElevation from '../components/ErrorNotFound/DisableElevation';
import { postComments } from '../redux/actions/comment';
import Item from '../components/Items/Item';
import { getComments } from '../redux/actions/comment';
import './Detail.css';
import {
	Button,
	Typography,
	Container,
	Box,
	TextField,
	Paper,
	IconButton,
	Avatar,
	Rating,
} from '@mui/material';
import Comments from '../sections/Comments';
import { auth } from '../firebase/credenciales';
import { ColorModeContext } from '../components/Theme/Theme';

const imgLink = 'Url de imagen de usuario';

export default function Detail() {
	const { loading } = useSelector((state) => state.videogames);
	const gameDetail = useSelector((state) => state.videogames.details);
	const gameComment = useSelector((state) => state.videogames.comments);

	// const userComment = useSelector((state) => state.user.comments);
	const dispatch = useDispatch();
	let { id } = useParams();

	var userId = '';
	var userName = '';
	if (auth.currentUser !== null) {
		userId = auth.lastNotifiedUid;
		userName = auth.currentUser.email;
	}
	const parse = require('html-react-parser'); //Parser de etiquetas a texto

	var imgCarousel = [];
	if (gameDetail.images) {
		var images = gameDetail.images;
		imgCarousel = images.split(',');
	}

	// console.log(userComment)

	//Estado locad de Form de Reseñas
	const [value, setValue] = React.useState({
		userID: userId,
		gameID: id,
		comment: {
			text: '',
			userComment: '',
			rating_like: 3,
		},
	}); //Estado local para enviar Comment con negritas y demas
	const [already, setAlready] = React.useState({
		bold: false,
		italic: false,
		underline: false,
		link: false,
		quote: false,
	});

	//estado local para estrellas comment
	const [estrella, setEstrella] = React.useState(3);

	const handleChange = (e) => {
		//Handle para Form
		value.comment.text = e.target.value;
		value.comment.userComment = userName;
		setValue({
			...value,
			userID: auth.lastNotifiedUid,
		});
	};

	const handleStar = (e) => {
		//Handle para Rating del form
		value.comment.rating_like = e.target.value;
		setValue({
			...value,
		});
	};

	async function handleSubmit(e) {
		e.preventDefault();
		dispatch(postComments(value));
		setValue({
			userID: userId,
			gameID: id,
			comment: {
				text: '',
				userComment: '',
				rating_like: 3,
			},
		});
		alert('comment create succesfully');
	}

	//Icons
	const handleBold = (e) => {
		//Handle para BOLD
		if (already.bold === true) {
			console.log('entre');
		} else {
			setValue({ ...value, comment: { text: `<b>${value.comment.text}</b>` } });
			setAlready({ ...already, bold: true });
		}
	};
	const handleItalic = (event) => {
		//Handle para ITALIC
		if (already.italic === true) {
			console.log('entre');
		} else {
			setValue({ ...value, comment: { text: `<i>${value.comment.text}</i>` } });
			setAlready({ ...already, italic: true });
		}
	};
	const handleUnderline = (event) => {
		//Handle para UNDERLINE
		if (already.underline === true) {
			console.log('entre');
		} else {
			setValue({ ...value, comment: { text: `<u>${value.comment.text}</u>` } });
			setAlready({ ...already, underline: true });
		}
	};
	const handleLink = (event) => {
		//Handle para LINK
		if (already.link === true) {
			console.log('entre');
		} else {
			setValue({
				...value,
				comment: { text: `<a href="#">${value.comment.text}` },
			});
			setAlready({ ...already, link: true });
		}
	};
	const handleQuote = (event) => {
		//Handle para QUOTE
		if (already.quote === true) {
			console.log('entre');
		} else {
			setValue({
				...value,
				comment: { text: `<blockquote>${value.comment.text}</blockquote>` },
			});
			setAlready({ ...already, quote: true });
			console.log(value);
		}
	};

	useEffect(() => {
		//UseEffect para traer los datos con la action x id
		dispatch(setLoading());
		dispatch(getDetails(id));
		dispatch(getComments(id));
	}, [id, dispatch]);

	useEffect(() => {
		dispatch(getComments(id));
	}, [gameComment]);

	if (loading) return <Loader />;

	return (
		<Container>
			<DisableElevation />
			<Paper elevation={8} sx={{ padding: 2 }}>
				<Box display="flex" alignItems="flex-start" className="boxDivisor">
					<Box
						className="containerNombreImagenDescription"
						backgroundColor="secondary.light"
						width={650}
						borderRadius={3}
						sx={{ border: 'grey' }}
					>
						<Box
							display="flex"
							backgroundColor="primary.main"
							borderRadius={1}
							sx={{
								borderColor: '#42a5f5',
								alignItems: 'center',
								justifyContent: 'space-evenly',
							}}
						>
							<Box
								display="contents"
								className="nombrePrecio"
								sx={{ border: '1px dashed grey' }}
							>
								{/* NOMBRE */}
								<Typography
									padding={1}
									variant="h5"
									color={'white'}
									component="div"
								>
									{gameDetail.name}
								</Typography>
								{/* PRECIO */}
								<Typography variant="h6" color={'white'}>
									${gameDetail.price}
								</Typography>
							</Box>
							<Box display="flex" sx={{ border: '' }}>
								<AddToCartButton
									id={id}
									name={gameDetail.name}
									picture={gameDetail.background_image}
									price={gameDetail.price}
									variant="contained"
								/>
							</Box>
							{/* ADDWISHES_ICON */}
							<Box>
								<AddToWishes
									id={id}
									name={gameDetail.name}
									image={gameDetail.background_image}
									price={gameDetail.price}
									variant="contained"
								/>
							</Box>
						</Box>
						<Box
							width={650}
							height={300}
							alignItems="center"
							className="imagen"
							display="inline-block"
							sx={{ borderRadius: '4px' }}
						>
							{/* CARRUSEL */}
							<Carousel className="carusel">
								{imgCarousel.map((item) => (
									<Item key={item.id} item={item} />
								))}
							</Carousel>
						</Box>
						<Box className="description" borderRadius={0.5} sx={{ padding: 1 }}
						backgroundColor= {window.localStorage.getItem('themeMode') === "dark" ? "primary.main" : "white"} 
						boxShadow={5}
						
						>
							{/* DESCRIPCION */}

							<Typography
								variant="body2"
								textAlign="justify"
								color={window.localStorage.getItem('themeMode') === "dark" ? "white" : "primary.main"}
								
							>
								{gameDetail.description ? parse(gameDetail.description) : null}
							</Typography>
						</Box>
					</Box>
					<Box
						className="requeriments"
						margin={1.5}
						sx={{ borderRadius: 1, padding: 1 }}
					>
						{/* REQUERIMIENTOS */}
						<Typography
							borderRadius={0.5}
							backgroundColor= "primary.light"
							variant="body1"
							height={35}
							color="white"
							

						>
							Requeriments
						</Typography>
						<Typography
							sx={{ borderRadius: 2 }}
							backgroundColor= {window.localStorage.getItem('themeMode') === "dark" ? "primary.main" : "white"}
							variant="body2"
							color={window.localStorage.getItem('themeMode') === "dark" ? "white" : "primary.main"}
							boxShadow={5}
						>
							{gameDetail.requirements ? parse(gameDetail.requirements) : null}
						</Typography>
					</Box>
				</Box>
			</Paper>
			{/* SECCION RESEÑAS */}
			<section>
				<Box className="newComment">
					<Box className="formComment">
						<Avatar alt={'H'} src={imgLink} />
					</Box>
					<form onSubmit={handleSubmit} className="formComment">
						<Box
							width={580}
							sx={{
								bgcolor: 'secondary.text',
								borderColor: 'primary.main',
								border: 1,
								borderRadius: 1,
								display: 'inline-block',
							}}
						>
							<TextField
								onChange={handleChange}
								type="form"
								id="standard-multiline-static"
								fullWidth
								label="Reviews"
								name="text"
								value={value.comment.text}
								multiline
								rows={4}
								placeholder="Post a review..."
								variant="standard"
							/>
							<Box
								className="postActions"
								sx={{
									bgcolor: '#c0c0c0',
									borderColor: 'secondary.main',
								}}
							>
								<Box className="iconsComment">
									<IconButton onClick={handleBold}>
										<FormatBoldIcon className="iconitos" />
									</IconButton>
									<IconButton onClick={handleItalic}>
										<FormatItalicIcon className="iconitos" />
									</IconButton>
									<IconButton onClick={handleUnderline}>
										<FormatUnderlinedIcon className="iconitos" />
									</IconButton>
									<IconButton onClick={handleLink}>
										<LinkIcon className="iconitos" />
									</IconButton>
									<IconButton onClick={handleQuote}>
										<FormatQuoteIcon className="iconitos" />
									</IconButton>
								</Box>
							</Box>
						</Box>
						<Box
							sx={{
								paddingTop: 1,
							}}
						>
							<Button type="submit" variant="outlined">
								Submit
							</Button>
						</Box>
					</form>
					<Box>
						<Typography component="legend">Rating</Typography>
						<Rating
							name="rating_like"
							value={estrella}
							onClick={handleStar}
							onChange={(event, newValue) => {
								setEstrella(newValue);
							}}
						/>
					</Box>
				</Box>
				<Comments />
			</section>
		</Container>
	);
}
