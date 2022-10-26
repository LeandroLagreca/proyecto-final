import "./Detail.css";
import Swal from "sweetalert2";
import React from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { auth } from "../firebase/credenciales";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/videoGame";
import { getDetails } from "../redux/actions/videoGame";
import { AddToWishes, Loader, AddToCartButton } from "../components";
import Carousel from "react-material-ui-carousel";
import Item from "../components/Items/Item";
import Comments from "../sections/Comments";
import LinkIcon from "@mui/icons-material/Link";
import { getComments } from "../redux/actions/comment";
import { postComments } from "../redux/actions/comment";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import DisableElevation from "../components/ErrorNotFound/DisableElevation";
import {Button,Typography,Container,Box,TextField,Paper,IconButton,Avatar,Rating,} from "@mui/material";

const imgLink = "Url de imagen de usuario"; //Imagen cuando se implemente el profile

export default function Detail() {
  const user = useSelector((state) => state.user.status);
  const { loading } = useSelector((state) => state.videogames);
  const gameDetail = useSelector((state) => state.videogames.details);
  const gameComment = useSelector((state) => state.videogames.comments);
  const dispatch = useDispatch();
  let { id } = useParams();
  var userId = "";
  var userName = "";
  if (auth.currentUser !== null) {
    userId = auth.lastNotifiedUid;
    userName = auth.currentUser.email;
  }
  const parse = require("html-react-parser"); //Parser de etiquetas a texto

  var imgCarousel = [];
  if (gameDetail.images) {
    var images = gameDetail.images;
    imgCarousel = images.split(",");
  }

  //Estado locad de Form de Reseñas
  const [value, setValue] = React.useState({
    userID: userId,
    gameID: id,
    comment: {
      text: "",
      userComment: "",
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

  //estado local para estrellas Rating
  const [estrella, setEstrella] = React.useState(3);

  const [isLogued, setIsLogued] = React.useState(false);

  //HandleChange para Form
  const handleChange = (e) => {
    value.comment.text = e.target.value;
    value.comment.userComment = userName;
    setValue({
      ...value,
      userID: auth.lastNotifiedUid,
    });
  };

  //Handle para Rating del form
  const handleStar = (e) => {
    value.comment.rating_like = e.target.value;
    setValue({
      ...value,
    });
  };
//Handle SUBMIT dispacha accion para postear comentario
  async function handleSubmit(e) {
	if(isLogued===false){
		e.preventDefault();
	}
	else{
    e.preventDefault();
    dispatch(postComments(value));
    setValue({
      userID: userId,
      gameID: id,
      comment: {
        text: "",
        userComment: "",
        rating_like: 3,
      },
    });
    }	
  }

  const addPostAlert = () => {
    if(user === "guest"){
		setIsLogued(false)
      Swal.fire({
        toast: true,
        icon: 'error',
        title: 'You cannot add post if you are not registered',
        position: 'bottom-right',
        showConfirmButton: false,
        timer: 3000,
      })
    }else{
		setIsLogued(true)
        Swal.fire({
          toast: true,
          icon: 'success',
          title: 'Your review has been posted',
          position: 'bottom-right',
          showConfirmButton: false,
          timer: 3000,
        })
    }
  };

  //{----------------------Icons de review--------------------}
  //Handle para BOLD
  const handleBold = (e) => {
    if (already.bold === true) {
      console.log("entre");
    } else {
      setValue({ ...value, comment: { text: `<b>${value.comment.text}</b>` } });
      setAlready({ ...already, bold: true });
    }};
  //Handle para ITALIC
  const handleItalic = (event) => {
    if (already.italic === true) {
      console.log("entre");
    } else {
      setValue({ ...value, comment: { text: `<i>${value.comment.text}</i>` } });
      setAlready({ ...already, italic: true });
    }};
  //Handle para UNDERLINE
  const handleUnderline = (event) => {
    if (already.underline === true) {
      console.log("entre");
    } else {
      setValue({ ...value, comment: { text: `<u>${value.comment.text}</u>` } });
      setAlready({ ...already, underline: true });
    }};
  //Handle para LINK
  const handleLink = (event) => {
    if (already.link === true) {
      console.log("entre");
    } else {
      setValue({
        ...value,
        comment: { text: `<a href="#">${value.comment.text}` },
      });
      setAlready({ ...already, link: true });
    }};
  //Handle para QUOTE
  const handleQuote = (event) => {
    if (already.quote === true) {
      console.log("entre");
    } else {
      setValue({
        ...value,
        comment: { text: `<blockquote>${value.comment.text}</blockquote>` },
      });
      setAlready({ ...already, quote: true });
      console.log(value);
    }};
  //{------------------------------------------}

  //UseEffect para traer los datos de detalle y de reviews
  useEffect(() => {
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
      <Paper elevation={8} sx={{ padding: 2 }}>
      <Typography variant="caption" display="flex" mb={1}><Link className="redir" to={"/home"}>Games</Link> <Typography variant="caption" ml={1} color={"darkgray"}>> </Typography>    <Link className="redir" to={"/home"}> Detail </Link>  <Typography variant="caption" ml={1} mr={1} color={"darkgray"}>> </Typography>  <b>{gameDetail.name}</b> </Typography>
        <Box display="flex" alignItems="flex-start" className="boxDivisor">
          <Box
            className="containerNombreImagenDescription"
            backgroundColor="secondary.light"
            width={650}
            borderRadius={3}
            sx={{ border: "grey" }}
          >
            <Box
              display="flex"
              backgroundColor="primary.main"
              borderRadius={1}
              sx={{
                borderColor: "#42a5f5",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Box
                display="contents"
                className="nombrePrecio"
                sx={{ border: "1px dashed grey" }}
              >
                <Typography
                  padding={1}
                  variant="h5"
                  color={"white"}
                  component="div"
                >
                  {gameDetail.name}  {/* NOMBRE */}
                </Typography>
                <Typography variant="h6" color={"white"}>
                  ${gameDetail.price}   {/* PRECIO */}
                </Typography>
              </Box>
              <Box display="flex" sx={{ border: "" }}>
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
              sx={{ borderRadius: "4px" }}
            >
              {/* CARRUSEL */}
              <Carousel className="carusel">
                {imgCarousel.map((item) => (
                  <Item key={item.id} item={item} />
                ))}
              </Carousel>
            </Box>
            <Box className="description" borderRadius={0.5} sx={{ padding: 1 }}>
              <Typography
                variant="body2"
                textAlign="justify"
                color="text.primary"
              >
                {gameDetail.description ? parse(gameDetail.description) : null} {/* DESCRIPCION */}
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
              backgroundColor="primary.main"
              variant="body1"
              height={35}
              color="white"
            >
              Requeriments
            </Typography>
            <Typography
              sx={{ borderRadius: 2 }}
              backgroundColor="secondary.light"
              variant="body2"
              color="text.primary"
            >
              {gameDetail.requirements ? parse(gameDetail.requirements) : null}
            </Typography>
          </Box>
        </Box>
      </Paper>
      {/*---------------- SECCION RESEÑAS ---------------------*/}
      <section>
        <Box className="newComment">
          <Box className="formComment">
            <Avatar alt={userName} src={imgLink} />
          </Box>
          <form onSubmit={handleSubmit} className="formComment">
            <Box
              width={580}
              sx={{
                bgcolor: "secondary.text",
                borderColor: "primary.main",
                border: 1,
                borderRadius: 1,
                display: "inline-block",
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
                  bgcolor: "#c0c0c0",
                  borderColor: "secondary.main",
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
              <Button type="submit" sx={{marginLeft:5}} variant="outlined" onClick={addPostAlert}>
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
