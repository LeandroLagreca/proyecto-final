import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AddToWishes, Loader } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/videoGame";
import { getDetails } from "../redux/actions/videoGame";
import Carousel from "react-material-ui-carousel";
import LinkIcon from "@mui/icons-material/Link";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import DisableElevation from "../components/ErrorNotFound/DisableElevation";
import Item from "../components/Items/Item";
import "./Detail.css";
import {
  Button,
  Typography,
  Container,
  Box,
  TextField,
  Paper,
  IconButton,
} from "@mui/material";
import Comments from "../sections/Comments";

export default function Detail() {
  const { loading } = useSelector((state) => state.videogames);
  const gameDetail = useSelector((state) => state.videogames.details);
  const dispatch = useDispatch();
  let { id } = useParams();

  const parse = require("html-react-parser"); //Parser de etiquetas a texto

  var imgCarousel = [];
  if (gameDetail.images) {
    var images = gameDetail.images;
    imgCarousel = images.split(",");
  }

  //Estado locad de Form de Reseñas
  const [value, setValue] = React.useState({
    userID: "gM907azFcoOtt7qoWDMU0tQkDXm2",
    gameID: id,
    comment: {
      text: "Comentario de Prueba",
      rating_like: 5,
    },
  }); //Estado local para enviar Comment
  const [already, setAlready] = React.useState({
    bold: false,
    italic: false,
    underline: false,
    link: false,
    quote: false,
  });

  const handleChange = (e) => {
    //Handle para Form
    setValue({
      ...value,
      comment: {
        text: e.target.value,
    },
  });
    console.log(value);
  };

  async function handleSubmit(e) {
    e.preventDefault()
    await axios.post("http://localhost:3001/comments", value);
    setValue({
      userID: "",
    gameID: id,
    comment: {
      text: "",
      rating_like: 0,
    }});
    alert("comment create succesfully");
  }

  //Icons
  const handleBold = (e) => {
    //Handle para BOLD
    if (already.bold === true) {
      console.log("entre");
    } else {
      setValue({...value, comment: { text: `<b>${value.comment.text}</b>`}});
      setAlready({ ...already, bold: true });
    }
  };
  const handleItalic = (event) => {
    //Handle para ITALIC
    if (already.italic === true) {
      console.log("entre");
    } else {
      setValue({...value, comment: { text: `<i>${value.comment.text}</i>`}});
      setAlready({ ...already, italic: true });
    }
  };
  const handleUnderline = (event) => {
    //Handle para UNDERLINE
    if (already.underline === true) {
      console.log("entre");
    } else {
      setValue({...value, comment: { text: `<u>${value.comment.text}</u>`}});
      setAlready({ ...already, underline: true });
    }
  };
  const handleLink = (event) => {
    //Handle para LINK
    if (already.link === true) {
      console.log("entre");
    } else {
      setValue({...value, comment: { text: `<a href="#">${value.comment.text}`}});
      setAlready({ ...already, link: true });
    }
  };
  const handleQuote = (event) => {
    //Handle para QUOTE
    if (already.quote === true) {
      console.log("entre");
    } else {
      setValue({...value, comment: { text: `<blockquote>${value.comment.text}</blockquote>`}});
      setAlready({ ...already, quote: true });
      console.log(value);
    }
  };

  useEffect(() => {
    //UseEffect para traer los datos con la action x id
    dispatch(setLoading());
    dispatch(getDetails(id));
  }, [dispatch, id]);

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
                {/* NOMBRE */}
                <Typography
                  padding={1}
                  variant="h5"
                  color={"white"}
                  component="div"
                >
                  {gameDetail.name}
                </Typography>
                {/* PRECIO */}
                <Typography variant="h6" color={"white"}>
                  ${gameDetail.price}
                </Typography>
              </Box>
              <Box display="flex" sx={{ border: "" }}>
                <Button variant="contained">
                  <AddShoppingCartIcon />{" "}
                </Button>
              </Box>
              {/* ADDWISHES_ICON */}
              <Box>
                <AddToWishes
                  id={id}
                  name={gameDetail.name}
                  image={gameDetail.background_image}
                  price={gameDetail.price}
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
              {/* DESCRIPCION */}

              <Typography
                variant="body2"
                textAlign="justify"
                color="text.primary"
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
      {/* SECCION RESEÑAS */}
      <section>
        <Box className="newComment">
          <Box>
            <AccountBoxIcon sx={{ fontSize: 50 }} />
          </Box>
          <form onSubmit={handleSubmit}>
          <Box
            width={340}
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
              label="Reseñas"
              name="comment"
              value={value.comment.text}
              multiline
              rows={4}
              placeholder="Agrega un comentario..."
              variant="standard"
            />
            <Box
              className="postActions"
              sx={{
                bgcolor: "#90caf9",
                borderColor: "secondary.main",
                border: 1,
              }}
            >
              <Box className="iconsComment">
                <IconButton onClick={handleBold}>
                  <FormatBoldIcon />
                </IconButton>
                <IconButton onClick={handleItalic}>
                  <FormatItalicIcon />
                </IconButton>
                <IconButton onClick={handleUnderline}>
                  <FormatUnderlinedIcon />
                </IconButton>
                <IconButton onClick={handleLink}>
                  <LinkIcon />
                </IconButton>
                <IconButton onClick={handleQuote}>
                  <FormatQuoteIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box>
            <Button type='submit'>Submit</Button>
          </Box>
          </form>
        </Box>
        <Comments />
      </section>
    </Container>
  );
}
